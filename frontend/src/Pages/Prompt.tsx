import React, { Dispatch, useState, useEffect } from 'react';
import { Box, Input, Select, Button, Heading } from '@chakra-ui/react';
import { IoMdSend } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import TypingResponse from '../Components/TypingResponse';
import { getResponse } from '../Redux/promptReducer/action';
import Loader from '../Components/Loader';
import {PiProhibitBold} from 'react-icons/pi';
import '../styles.css';

interface ReqDataType {
    userInput: string;
    inputCategory: string;
}

const Prompt = () => {
    const [response, setResponse] = useState<string>('');
    const [disable, setDisable] = useState<boolean>(false);
    const [disableInput, setDisableInput] = useState<boolean>(false);
    const { resData, isLoading } = useSelector((store: any) => store.promptReducer);
    const dispatch: Dispatch<any> = useDispatch();
    const [data, setData] = useState<ReqDataType>({
        userInput: '',
        inputCategory: ''
    })

    useEffect(() => {
        if (!data.inputCategory || !data.userInput) {
            setDisable(true);
        }
        else {
            setDisable(false);
        }

        if(!data.inputCategory){
           setDisableInput(true);
        }
        else{
            setDisableInput(false);
        }

    }, [data.inputCategory, data.userInput])

    useEffect(() => {
        setResponse(resData);
    }, [resData])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const promptData = { ...data, userInput: data.userInput.toLocaleLowerCase() }
        dispatch(getResponse(promptData));

        resData && setData({
            userInput: '',
            inputCategory: ''
        })
    }

    return (
        <Box minH={'100vh'} bg={'#CCCCCC'}>
            <Box w={{ base: '95%', sm: '95%', md: '85%', lg: '65%', xl: '65%', '2xl': '65%' }} m={'auto'}>
                <Heading textTransform={'capitalize'} pt={'20px'} color={'gray.700'} size={'lg'}>{data.inputCategory ? `${data.inputCategory} Generator` : 'Joke/Quote/Story/Shayari Generator'}</Heading>
                <form onSubmit={handleSubmit} style={{ display: 'flex', width: '100%', alignItems: 'center', margin: 'auto', gap: '10px', paddingTop: '20px' }}>
                    <Input isDisabled={disableInput === true} name='userInput' value={data.userInput} onChange={(e) => handleChange(e)} color={'gray.500'} focusBorderColor='gray.300' border={'1px solid gray.300'} w={'160%'} p={'30px 20px'} bg={'gray.100'} type='text' placeholder={data.inputCategory && !disableInput ? `What kind of ${data.inputCategory} you want?` : 'Select a category first!'} />
                    <Select name='inputCategory' value={data.inputCategory} onChange={(e) => handleChange(e)} color={'gray.500'} focusBorderColor='gray.300' border={'1px solid gray.300'} h={'60px'} bg={'gray.100'}>
                        <option value="">Select Category</option>
                        <option value="joke">Joke</option>
                        <option value="shayari">Shayari</option>
                        <option value="story">Story</option>
                        <option value="quote">Quote</option>
                    </Select>
                    <Button isDisabled={disable === true} type='submit' colorScheme='purple' fontSize={'60px'} p={'30px 20px'}><IoMdSend /></Button>
                </form>
            </Box>
            {
                isLoading ? <Loader /> : <TypingResponse response={response} />
            }
        </Box>
    )
}

export default Prompt;