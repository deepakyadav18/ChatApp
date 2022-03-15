import React, { useEffect } from 'react'
import {Box, Container,Tab,TabList,TabPanel,TabPanels,Tabs,Text} from '@chakra-ui/react'
import Login from './Auth/Login'
import SignUp from './Auth/SignUp'
import { useHistory } from 'react-router-dom'
const Home = () => {

  const history=useHistory();

  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem('userInfo'));

    if(user) history.push('/chats');
  },[history])

  return (
    <Container maxW='xl' centerContent>
      <Box d='flex' justifyContent='center' p={4} bg={'white'} w="100%" m="10px 0 10px 0" borderRadius='lg' borderWidth='1px'>
        <Text fontSize="3xl" fontFamily="Hahmlet" color='black'>Chat App</Text>
      </Box>

      <Box bg="white" w="100%" p={3} borderRadius='lg' color="black" borderWidth='1px'>
        <Tabs variant='soft-rounded' colorScheme='purple'>
          <TabList>
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}

export default Home