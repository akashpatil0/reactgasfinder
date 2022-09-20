import React, {useState, useEffect} from 'react'
import { Login } from './components/Login'
import Homepage from './components/Homepage'
import { Signup } from './components/Signup'
import axios from 'axios'

function App() {
  const [user, setUser] = useState({Username:"", Password:""})
  const [loggedIn, setLoggedIn] = useState(false)
  const [tasks, setTask] = useState([])
  const [invalidLogin, setInvLogin] = useState(false)
  const [createAccount, setCreate] = useState(false)

  useEffect( ()=>{
    async function fetchData(){
      
      console.log('Login Was Attempted')

      const res = await axios.get('http://localhost:5001/login',{
        params: {
          username: user.Username,
          password: user.Password
        }
      })

      if(res.data.loggedIn){
        setTask(res.data.user.tasks)
        setLoggedIn(true)
      }else{
        setInvLogin(true)
      }
    }
    if(user.Username !== "" && user.Password !== ""){
      fetchData()
    }
  }, [user])

  return (
      <div>
        {(!loggedIn && !createAccount) ? 
        <Login setUser={setUser} invalidLogin={invalidLogin} setCreate={setCreate} setInvLogin={setInvLogin}/> : <></>}

        {(loggedIn) ?
          <Homepage setUser={setUser} tasks={tasks} setTask={setTask} user={user} setLoggedIn={setLoggedIn}/> : <></>
        }
        
        {(!loggedIn && createAccount) ?
          <Signup setCreate={setCreate}/> : <></>}
      </div>
  );
}

export default App;