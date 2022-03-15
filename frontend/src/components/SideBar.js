import { Avatar, Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Spinner, Text, toast, Tooltip, useDisclosure, useToast } from '@chakra-ui/react';
import {BellIcon,ChevronDownIcon} from '@chakra-ui/icons'
import React,{useState} from 'react'
import { ChatState } from '../context/ChatProvider';
import ProfileModal from './ProfileModal';
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import ChatLoading from './ChatLoading';
import UserListItem from './UserListItem';
const SideBar = () => {

    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState();
    const {isOpen,onOpen,onClose}=useDisclosure();
    const {user , setSelectedChat, chats,setChats}=ChatState();
    const history=useHistory();
    const handleLogout=()=>{
        localStorage.removeItem("userInfo");
        history.push('/');
    }
    const accessChat=async(userId)=>{
        try{
            setLoadingChat(true);

            const config={
                headers: {
                    "Content-type":"application/json",
                    Authorization:`Bearer ${user.token}`
                },
            };

            const {data}=await axios.post('/api/chat',{userId},config);

            if(!chats.find((c)=>c._id===data._id)) setChats([data,...chats]);

            setSelectedChat(data);
            setLoadingChat(false);
            onClose();
        } catch(err){
            toast({
                title:"Error in fetching the chats",
                description:err.message,
                status:"error",
                duration:5000,
                isClosable:true,
                position:'bottom-left'
            })
            return;
        }
    }
    const toast=useToast();
    const handleSearch=async()=>{
        if(!search){
            toast({
                title:"Please Enter Something To Search",
                status:"warning",
                duration:5000,
                isClosable:true,
                position:'top-left'
            })
            return;
        }

        try{
            setLoading(true);
            const config={
                headers:{
                    Authorization:`Bearer ${user.token}`
                },
            };

            const {data}=await axios.get(`/api/user?search=${search}`,config)
            setLoading(false);
            setSearchResult(data);
        } catch(error){
            toast({
                title:"Some Error Occured",
                description:"Failed to load",
                status:"error",
                duration:5000,
                isClosable:true,
                position:'bottom-left'
            })
            setLoading(false);
            return;
        }
    }
  return (
    <>
    <Box d='flex' justifyContent='space-between' alignItems='center' bg='white' w='100%' p='5px 10px 5px 10px' borderWidth='5px'>
        <Tooltip label="Search Users to Chat" hasArrow placement="bottom-end">
            <Button variant="ghost" onClick={onOpen}>
                <i class="fas fa-search"></i>
                <Text d={{base:"none",md:"flex"}} px='4'>
                    Search User
                </Text>
            </Button>
        </Tooltip>
        
        <Text fontSize='2xl' fontFamily='hahmlet'>Chat App</Text>

        <div>
            <Menu>
                <MenuButton p='1'>
                    <BellIcon fontSize='2xl' m={1}/>
                </MenuButton>
                {/* <MenuList></MenuList> */}
            </Menu>

            <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
                    <Avatar size='sm' cursor='pointer' name={user.name}/>
                </MenuButton>

                <MenuList>
                    <ProfileModal user={user}>
                    <MenuItem>My Profile</MenuItem>
                    </ProfileModal>
                    <MenuDivider/>
                    <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                </MenuList>
            </Menu>
        </div>
    </Box>

    <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
        <DrawerBody>
            <Box d='flex' pb={2}>
                <Input placeholder='Search By Name Or Email' mr={2} value={search} onChange={(e)=>setSearch(e.target.value)}/>
                <Button onClick={handleSearch}>Go</Button>
            </Box>

            {loading ? (
                <ChatLoading/>
            ) : (
                searchResult?.map((user)=>(
                    <UserListItem key={user._id} user={user} handleFunction={()=>accessChat(user._id)}/>
                ))
            )}

            {loadingChat && <Spinner ml='auto' d='flex' />}
        </DrawerBody>
        </DrawerContent>

    </Drawer>
    
    </>
  )
}

export default SideBar