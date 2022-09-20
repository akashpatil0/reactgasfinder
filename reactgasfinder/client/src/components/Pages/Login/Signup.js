import React, {useEffect, useState} from 'react'
import { VStack, ButtonGroup, FormControl, FormLabel, Button,Input, Heading, Alert, AlertIcon } from "@chakra-ui/react"
import {ArrowBackIcon} from "@chakra-ui/icons"
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const Signup = () => {

  const navigate = useNavigate();
  const[newDetails, setNewDetails] = useState({email:"", username:"", password:""})
  const[newUser, setNewUser] = useState()
  const[invalidLogin, setInvalidLogin] = useState()
  const[successLogin, setSuccessLogin] = useState()

  useEffect(()=>{
    async function fetch(){
      const res = await Axios.post('http://localhost:5001/signup',{
        email: newUser.email,
        username: newUser.username,
        password: newUser.password 
      })
      const{status, reason} = res.data
      if(status){
        setSuccessLogin(true)
      }else{
        setInvalidLogin({status: true, reason})
      }
    }
    fetch()
    
  }, [newUser])

  const handleSubmit  = e => {
    e.preventDefault()
    setInvalidLogin({})
    const {email, username, password} = newDetails
    if(email === "" || username === "" || password === ""){
      setInvalidLogin({status: true, reason: "please enter all fields"})
    }else
    if(!email.includes('@')){
      setInvalidLogin({status: true, reason: "please enter a valid email"})
    }else{
      setNewUser(newDetails)
    }
  }

  const createaccount = ()=>{
    setSuccessLogin()
    navigate('/login')
  } 

  return (
    <VStack as="form" w={{base: "90%", md: "500px"}}
                m="auto" justify='center' h="100vh">

            <Heading>Create Account</Heading>

            <FormControl>
                <FormLabel>Email</FormLabel>
                <Input name="email" placeholder='Enter Email' autoComplete='off' size="lg" 
                onChange={ e => {
                  setNewDetails({...newDetails, email: e.target.value})
                }} value={newDetails.email}/>
            </FormControl>
            
            <FormControl>
                <FormLabel>Username</FormLabel>
                <Input name="username" placeholder='Enter Username' autoComplete='off' size="lg"
                onChange={ e => {
                  setNewDetails({...newDetails, username: e.target.value})
                }} value={newDetails.username}/>
            </FormControl>

            <FormControl pt=".5rem">
            <FormLabel>Password</FormLabel>
                <Input name="password" placeholder='Enter Password' autoComplete='off' type='password' size="lg"
                onChange={ e => {
                  setNewDetails({...newDetails, password: e.target.value})
                }} value={newDetails.password}/>
            </FormControl>

            <ButtonGroup pt="1rem">
                <Button onClick={createaccount}><ArrowBackIcon/>Login</Button>
                <Button colorScheme="blue" type="submit" onClick={handleSubmit}>Sign Up</Button>
            </ButtonGroup>
                {successLogin ? <Alert status='success'>
                <AlertIcon/>
                Success Account Has Been Created!
            </Alert> : <></>} 
                {invalidLogin?.status ? <Alert status='error'>
                <AlertIcon/>
                Error, {invalidLogin?.reason}
            </Alert> : <></>}
        </VStack>
  )
}
