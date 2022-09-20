import Header from './Header'
import Tasks from './Tasks'
import AddTask from './AddTask'
import {useEffect} from 'react'
import Axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

function Homepage({setUser, setTask, user, tasks, setLoggedIn}) {

    useEffect(()=>{
        async function fetch(){
        
            const res = await Axios.put('http://localhost:5001/updatetasks',{
                username: user.Username,
                tasks: tasks 
            })
            
        }
        fetch()
    }, [tasks])

    const deleteTask = (uuid)=>{
        setTask(tasks.filter((task) => task.uuid !== uuid))
    }


    const addTask = (task)=>{
        const uuid = uuidv4()
        const newTask = {uuid,...task}
        setTask([...tasks,newTask])
    }

    return (
        <div className="container">
        <Header title={user.Username} setTask={setTask} setUser={setUser} setLoggedIn={setLoggedIn}/>
        <AddTask onAdd={addTask}/>
        <Tasks tasks={tasks} onDelete={deleteTask}/>
        </div>
    );
}

export default Homepage;
