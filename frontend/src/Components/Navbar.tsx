import React, { Dispatch } from 'react';
import { Box, Flex, Image, Avatar, Menu, MenuButton, MenuList, MenuItem, Button, useToast } from '@chakra-ui/react';
import logo from '../assets/logo.png';
import { AiOutlineUser } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { logout } from '../Redux/authReducer/action';

const Navbar = () => {
  const toast = useToast();
  const dispatch:Dispatch<any> = useDispatch();
  const value: string | null = localStorage.getItem('token');
  const token: { [key: string]: any } | null = value ? JSON.parse(value) : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logout());

    window.location.reload();
    
    toast({
      title : 'Success',
      description : 'User logged out successfully',
      isClosable : true,
      duration : 4000,
      status : 'success',
      position : 'top'
    })
  }

  return (
    <Box p={'10px'} bg={'gray.300'}>
      <Flex justifyContent={'space-between'}>
        <Image w={'50px'} borderRadius={'50%'} src={logo} alt='logo' />
        {token?.token && <Menu>
          {({ isOpen }) => (
            <>
              <MenuButton w={'50px'} h={'50px'} borderRadius={'50%'} isActive={isOpen} as={Button} >
                <AiOutlineUser size={'20px'} />
              </MenuButton>
              <MenuList>
                <MenuItem>{token?.userName}</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MenuList>
            </>
          )}
        </Menu>}
      </Flex>
    </Box>
  )
}

export default Navbar;