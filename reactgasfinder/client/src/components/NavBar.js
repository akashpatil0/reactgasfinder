import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import DataContext from '../context/DataContext'

export const NavBar = () => {
    
    const {setUser, loggedIn, setLoggedIn} = useContext(DataContext)

    const handleClick = ()=>{
        setUser({Username: "", Password:""})
        setLoggedIn(false)
    }   

  return (
    <div className='nav'>
        <Link to="/"className='site-title'>Gas Finder</Link>
        <ul>
            <li>
                <Link to="/Map">Map</Link>
            </li>
            <li>
                { loggedIn ? <Link to='/' onClick={handleClick}>Logout</Link> : <Link to="/Login">Login</Link>}
            </li>
            <li>
                <Link to="/About" id='about'>About</Link>
            </li>
        </ul>
    </div>
  )
}
