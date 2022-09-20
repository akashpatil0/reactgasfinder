import Task from './Task'

const Tasks = ({tasks, onDelete, onToggle}) => {
    
  return (
    <>
        {tasks.map((task)=>( 
            <Task key={task.uuid} task={task} 
            onDelete={onDelete}/>
        ))}
    </>
  )
}

export default Tasks

