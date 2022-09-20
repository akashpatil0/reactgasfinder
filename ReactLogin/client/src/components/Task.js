import {FaTimes} from 'react-icons/fa'

const Task = ({task,onDelete}) => {
  return (
    <div className={`task ${task.reminder ? `reminder` : ''}`}>

        <h3>{task.body} <FaTimes styles={{cursor:'pointer'}} 
        onClick={()=>onDelete(task.uuid)}/></h3>

        <p>{task.datetime}</p>
        
    </div>
  )
}

export default Task
