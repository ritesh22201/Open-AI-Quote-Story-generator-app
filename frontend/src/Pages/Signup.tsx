import React, { useState, useRef, useEffect } from 'react';
import { Box, Heading, Input, Button, Text, Flex, useToast } from '@chakra-ui/react';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import '../styles.css';
import { Dispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { PayloadType, signup } from '../Redux/authReducer/action';

const Signup = () => {
    const [inputType, setInputType] = useState<boolean>(false);
    const dispatch: Dispatch<any> = useDispatch();
    const toast = useToast();
    const navigate = useNavigate();
    const {isRegistered, registerErr} = useSelector((store:any) => store.authReducer);
    const [formDetails, setFormDetails] = useState<PayloadType>({
        name: '',
        email: '',
        password: ''
    })

    const [focusedInput, setFocusedInput] = useState<string | null>(null);
    const nameInputRef = useRef<HTMLInputElement | null>(null);
    const emailInputRef = useRef<HTMLInputElement | null>(null);
    const passwordInputRef = useRef<HTMLInputElement | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormDetails({ ...formDetails, [name]: value });
    }

    const handleFocus = (name: string) => {
        setFocusedInput(name);
    };

    const handleBlur = () => {
        setFocusedInput(null);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formDetails.name.trim()) {
            nameInputRef.current?.focus();
            setFocusedInput('name');
            return;
        }

        if (!formDetails.email.trim()) {
            emailInputRef.current?.focus();
            setFocusedInput('email');
            return;
        }

        if (!formDetails.password.trim()) {
            passwordInputRef.current?.focus();
            setFocusedInput('password');
            return;
        }

        const newUser = { ...formDetails };

        dispatch(signup(newUser));

        isRegistered && setFormDetails({
            name: '',
            email: '',
            password: ''
        })
    }

    useEffect(() => {
        if(isRegistered){
            toast({
                title : 'Success',
                description : isRegistered,
                status : 'success',
                isClosable : true,
                duration : 4000,
                position : 'top'
            })

            setTimeout(() => {
                navigate('/login');
                window.location.reload();
            }, 4000)
        }
        else if(registerErr){
            toast({
                title : 'Failed!',
                description : registerErr,
                status : 'error',
                isClosable : true,
                duration : 4000,
                position : 'top'
            })
        }
    }, [isRegistered, registerErr])

    return (
        <Box w={'25%'} m={'auto'} mt={'90px'}>
            <form onSubmit={handleSubmit} id='signup-form'>
                <Heading mb={'10px'} size={'lg'}>Create your account</Heading>
                <Input name='name' value={formDetails.name} onChange={(e) => handleChange(e)} ref={nameInputRef} onFocus={() => handleFocus('name')} onBlur={handleBlur} borderColor={focusedInput === 'name' ? 'red.500' : 'gray.200'} p={'27px 15px'} borderRadius={'5px'} focusBorderColor={focusedInput === 'name' && formDetails.name.length === 0 ? 'red.500' : 'gray.200'} type='text' placeholder={focusedInput === 'name' ? 'This field is required' : 'Name'} />
                <Input name='email' value={formDetails.email} onChange={(e) => handleChange(e)} ref={emailInputRef} onFocus={() => handleFocus('email')} onBlur={handleBlur} borderColor={focusedInput === 'email' ? 'red.500' : 'gray.200'} p={'27px 15px'} borderRadius={'5px'} focusBorderColor={focusedInput === 'email' && formDetails.email.length === 0 ? 'red.500' : 'gray.200'} type='email' placeholder={focusedInput === 'email' ? 'This field is required' : 'Email'} />
                <Box position={'relative'}>
                    <Input name='password' value={formDetails.password} onChange={(e) => handleChange(e)} ref={passwordInputRef} onFocus={() => handleFocus('password')} onBlur={handleBlur} borderColor={focusedInput === 'password' ? 'red.500' : 'gray.200'} p={'27px 15px'} borderRadius={'5px'} focusBorderColor={focusedInput === 'password' && formDetails.password.length === 0 ? 'red.500' : 'gray.200'} type={inputType ? 'text' : 'password'} placeholder={focusedInput === 'password' ? 'This field is required' : 'Password'} />
                    <Box position={'absolute'} top={'19px'} right={'6px'}>
                        {inputType ? <AiOutlineEyeInvisible size={'20px'} onClick={() => setInputType(false)} /> :
                            <AiOutlineEye size={'20px'} onClick={() => setInputType(true)} />}
                    </Box>
                </Box>
                <Button type='submit' colorScheme='purple' p={'27px 15px'} borderRadius={'8px'} _focusVisible={{ focus: 'none' }} w={'100%'}>Signup</Button>
                <Flex justifyContent={'space-around'}>
                    <Text>Already have an account?</Text>
                    <Link style={{ textDecoration: 'underline', color: 'purple' }} to={'/login'}>Login</Link>
                </Flex>
            </form>
        </Box>
    )
}

export default Signup;