const Header = ({title, setTask, setUser, setLoggedIn}) => {

  const handleClick = ()=>{
      setTask([])
      setUser({Username:"", Password:""})
      setLoggedIn(false)
  }
  
  return (

    <header className='header'>
        <h1>Welcome {title},</h1>
        <button className="btn" onClick={handleClick}>Log Out</button>
    </header>
  )
}

export default Header
