import React from 'react';
import {Box, Flex, Image, Avatar} from '@chakra-ui/react';
import logo from '../assets/logo.png';

const Navbar = () => {
  return (
    <Box p={'10px'} bg={'gray.300'}>
        <Flex justifyContent={'space-between'}>
            <Image w={'50px'} borderRadius={'50%'} src={logo} alt='logo'/>
            <Avatar />
        </Flex>
    </Box>
  )
}

export default Navbar;