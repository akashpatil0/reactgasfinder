const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
app.use(express.json())
var cors = require('cors')
app.use(cors())
const { sequelize, User, Task } = require('./models')


app.listen({ port: process.env.PORT }, async () => {
    await console.log(`Server up on http://localhost:${process.env.PORT}`)
    await sequelize.authenticate()
    console.log('Database Connected!')
})

app.post("/signup", async (req, res)=>{
    const {email, username, password} = req.body
    if(email == null || username == null || password == null){
        res.json("error: Enter a valid username or password")
    }

    const possibleUsername = await User.findAll({where: {username}})
    const possibleEmail = await User.findAll({where: {email}})
    if(possibleUsername.length === 0 && possibleEmail.length === 0){
        const passhash = await bcrypt.hash(password, 10)
        User.create({email, username, passhash})
        
        return res.json({status: true, reason:"User has been created"})
    }
    else{
            return res.json({status: false, reason:"Email and/or Username has been taken"})
    }
})

app.get("/login", async(req, res)=>{
    const {username, password} = req.query

    if(username == '' || password == '' || username == null || password == null){
        res.json({loggedIn: false,error: "Enter a valid username or password"})
    }else{
        const possibleUser = await User.findOne({where: {username}, include: 'tasks',})
        if(possibleUser == null){
            res.json({loggedIn: false, status: "Enter a Valid Username or Password"})
        }
        else{
            const comparedPass = await bcrypt.compare(password, possibleUser.passhash)
            if(comparedPass){
                res.json({loggedIn: true, user: possibleUser})
            }
            else{
                res.json({loggedIn: false, status: "Enter a Valid Username or Password"})
            }
        }
    }
})

app.get("/gettasks", async(req, res)=>{
    const {username, password} = req.query

    try{
        const possibleUser = await User.findOne({where: {username}, include: 'tasks',})
        const tasks = possibleUser.tasks

        res.json(tasks)
    }
    catch(err){
        res.json(err)
    }
})

app.post('/addtask', async (req, res) => {
    const {username, password, body, datetime} = req.query
    const user = await User.findOne({ where: { username } })
    const comparedPass = await bcrypt.compare(password, user.passhash)

    if(comparedPass){
        try {
            const task = await Task.create({ body, datetime, userId: user.id })
        
            return res.json(task)
          } catch (err) {
            console.log(err)
            return res.status(500).json(err)
          }
    }
    else{
        res.status(500).json(err)
    }

})

app.delete('/deleteTask', async (req, res)=>{
    const {uuid} = req.query
    try{
        const task = await Task.findOne({where: {uuid}})

        await task.destroy()
        return res.json({ deleted: true})
    }
    catch(err){
        res.json({deleted: false})
    }
})

app.put('/updatetasks', async (req, res)=>{
    const {username, tasks} = req.body
    
    try{
        const possibleUser = await User.findOne({where: {username}, include: 'tasks',})
        const dbTasks = possibleUser.tasks
        

        for(let i = 0; i < dbTasks.length; i++){
            let contains = false
            for(let j = 0; j < tasks.length && !contains; j++){
                if(dbTasks[i].dataValues.uuid == tasks[j].uuid){
                    contains = true
                }
            }
            if(!contains){
                dbTasks[i].destroy()
            }
        }

        for(let i = 0; i < tasks.length; i++){
            let contains = false
            for(let j = 0; j < dbTasks.length && !contains; j++){
                if(dbTasks[j].dataValues.uuid == tasks[i].uuid){
                    contains = true
                }
            }
            console.log(tasks[i], contains)
            if(!contains){
                const newtask = await Task.create({ 
                    body: tasks[i].body, 
                    datetime: tasks[i].datetime, 
                    userId: 1,
                    uuid: tasks[i].uuid })
                console.log(newtask)
            }
        }

        res.json({updated: true})
    }
    catch(err){
        res.json({updated: false})
    }
})

