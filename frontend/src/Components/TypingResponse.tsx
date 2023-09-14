import { Box, Text } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';

interface ResponseType {
  response: string;
}

const TypingResponse = ({ response }: ResponseType) => {
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (currentIndex < response.length) {
        setTypedText((prevText) => prevText + response[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(typingInterval);
      }
    }, 10);

    return () => clearInterval(typingInterval);
  }, [currentIndex, response]);

  let splittedText = typedText.split('\n');

  return (
    <Box>
      {response && <Box w={{base : '95%', sm : '95%', md : '85%', lg : '50%', xl : '50%', '2xl' : '50%'}} m={'40px auto'} borderRadius={'8px'} p={'20px'} bg={'purple'} color={'gray.200'}>
        {splittedText.map((el, i) => {
          return <Text key={i}>
            {el}
          </Text>
        })}
      </Box>}
    </Box>
  );
};

export default TypingResponse;
