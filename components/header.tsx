import { Box, Heading, Text } from "@chakra-ui/react"
import Head from "next/head"
import "@chakra-ui/react";


export const Customheader = () => {
    return ( 
    
    <Box>
        <Box display="flex" justifyContent={"center"} mt={10}>
            <Box background="black" p={4} rounded="lg">
                <Text as="b" fontSize={"4xl"} color="white">EZ PC builder</Text>
            </Box>
        </Box>

    </Box>)
}