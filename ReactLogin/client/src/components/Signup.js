import React, {useEffect, useState} from 'react'
import { VStack, ButtonGroup, FormControl, FormLabel, Button,
    FormErrorMessage, Input, Heading, Alert, AlertIcon } from "@chakra-ui/react"
import {ArrowBackIcon} from "@chakra-ui/icons"
import Axios from 'axios'

export const Signup = ({setCreate}) => {

  const[newDetails, setNewDetails] = useState({email:"", username:"", password:""})
  const[newUser, setNewUser] = useState()
  const[invalidLogin, setInvLogin] = useState()
  const[successLogin, setSucLogin] = useState()

  useEffect(()=>{
    async function fetch(){
      const res = await Axios.post('http://localhost:5001/signup',{
        email: newUser.email,
        username: newUser.username,
        password: newUser.password 
      })
      const{status, reason} = res.data
      if(status){
        setSucLogin(true)
      }else{
        setInvLogin({status: true, reason})
      }
    }
    fetch()
    
  }, [newUser])

  const handleSubmit  = e => {
    e.preventDefault()
    setInvLogin({})
    const {email, username, password} = newDetails
    if(email === "" || username === "" || password === ""){
      setInvLogin({status: true, reason: "please enter all fields"})
    }else
    if(!email.includes('@')){
      setInvLogin({status: true, reason: "please enter a valid email"})
    }else{
      setNewUser(newDetails)
    }
  }

  const createaccount = ()=>{
    setSucLogin()
    setCreate(false)
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
