import { Button, FormControl, FormLabel, Input, InputRightElement, useToast, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const Login = () => {
  
    const [show,setShow]=useState(false);
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [loading,setLoading]=useState(false);
    const toast=useToast();
    const history=useHistory();
    const handleShow=()=>{
        setShow(!show);
    }

    const handleSubmit=async()=>{
        setLoading(true);
        if(!email || !password){
            toast({
                title:"Please fill all the fields",
                status:"warning",
                duration:5000,
                isClosable:true,
                position:'bottom'
            })
            setLoading(false);
            return;
        }

        try{
            const config={
                headers:{
                    "Content-type":"application/json",
                }
            };

            const {data}= await axios.post('/api/user/login',{
                email,password
            },config);

            toast({
                title:"Login Successful",
                status:"success",
                duration:5000,
                isClosable:true,
                position:'bottom',
            });

            localStorage.setItem("userInfo",JSON.stringify(data));
            setLoading(false);
            history.push('/chats')
        } catch(err){
            toast({
                title:"Som Error Occured",
                description:err.response.data.message,
                status:"error",
                duration:5000,
                isClosable:true,
                position:'bottom',
            });
            setLoading(false);
        }
    }

  return (
    <VStack spacing="5px" color="black">

        <FormControl id='email' isRequired>
            <FormLabel>Email</FormLabel>
            <Input placeholder='Enter Your Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
        </FormControl>

        <FormControl id='password' isRequired>
            <FormLabel>Password</FormLabel>
            <Input type={show ? 'text':'password'} placeholder='Enter Your Password' value={password} onChange={(e)=>setPassword(e.target.value)} />
            <InputRightElement width="4rem">
                <Button h="1.75rem" size='sm' onClick={handleShow} colorScheme='purple'>
                    {show ? "Hide" : "Show"}
                </Button>
            </InputRightElement>
        </FormControl>

        <Button colorScheme='purple' width='100%' marginTop='15' onClick={handleSubmit} isLoading={loading}>
            Login
        </Button>

        <Button colorScheme='green' width='100%' marginTop='15' onClick={()=>{
            setEmail('guest@guest.com');
            setPassword('guest');
        }} >
            Get Guest Credentials
        </Button>
    </VStack>
  )
}

export default Login