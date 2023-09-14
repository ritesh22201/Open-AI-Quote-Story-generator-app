import React from 'react'
import '../styles.css';
import { Box } from '@chakra-ui/react';

const Loader = () => {
  return (
    <Box display={'grid'} placeItems={'center'} minH={'60vh'}>
        <Box className='custom-loader'></Box>
    </Box>
  )
}

export default Loader;