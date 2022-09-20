import gasStation3 from './gasStation3.jpeg'
import { Button } from "@chakra-ui/react"
import { useNavigate } from 'react-router-dom'
import './styles.css';

function Homepage() {
    const navigate = useNavigate();

    const btnHandler = () => {
        navigate('/login')
    }

    return (
        <div>
            <div className='container'>
                <div className='container-text'>
                    Welcome to Gas Finder 
                    <br/>
                    <div id='subText'>
                    Login to View Gas Stations in the Area
                    </div>
                </div>
                <Button colorScheme="blue" id='loginBtn' onClick={btnHandler}>Log In</Button>
            </div>
            <img src={gasStation3} id='stationImage' alt=""></img>
        </div>
    );
}

export default Homepage;
