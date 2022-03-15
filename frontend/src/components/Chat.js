import React, { useState } from 'react'
import {ChatState} from '../context/ChatProvider'
import {Box} from '@chakra-ui/react'
import SideBar from './SideBar';
import ChatBox from './ChatBox';
import MyChats from './MyChats';
const Chat = () => {
    const { user } = ChatState();
    return (
        <div style={{width:"100%"}} >
            {user && <SideBar/>}
            <Box d='flex' justifyContent='space-between' w='100%' h='90vh' p='10px'>
                {user && <MyChats />}
                {user && <ChatBox />}
            </Box>
        </div>
    )
}

export default Chat