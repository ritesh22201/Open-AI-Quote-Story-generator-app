import React, { Dispatch, useState } from 'react';
import { Box, Input, Select, Button } from '@chakra-ui/react';
import { IoMdSend } from 'react-icons/io';
import {useDispatch} from 'react-redux';

interface ReqDataType {
    userInput : string;
    inputCategory : string;
}

const Prompt = () => {
    const [response, setResponse] = useState<string>('');
    const dispatch: Dispatch<any> = useDispatch();
    const [data, setData] = useState<ReqDataType>({
        userInput : '',
        inputCategory : ''
    })

    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setData({...data, [name] : value});
    }

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        
    }

    return (
        <Box minH={'100vh'} bg={'#CCCCCC'}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', width: '65%', margin: 'auto', gap: '10px', paddingTop: '20px' }}>
                <Input name='userInput' value={data.userInput} onChange={(e) => handleChange(e)} color={'gray.500'} focusBorderColor='gray.300' border={'1px solid gray.300'} w={'160%'} p={'30px 20px'} bg={'gray.100'} type='text' placeholder='Enter your prompt...' />
                <Select name='inputCategory' value={data.inputCategory} onChange={(e) => handleChange(e)} color={'gray.500'} focusBorderColor='gray.300' border={'1px solid gray.300'} h={'60px'} bg={'gray.100'}>
                    <option value="">Select Category</option>
                    <option value="joke">Joke</option>
                    <option value="shayari">Shayari</option>
                    <option value="story">Story</option>
                    <option value="quote">Quote</option>
                </Select>
                <Button type='submit' colorScheme='purple' fontSize={'60px'} p={'30px 20px'}><IoMdSend /></Button>
            </form>
        </Box>
    )
}

export default Prompt;