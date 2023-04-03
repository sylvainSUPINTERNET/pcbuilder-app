import { Box, Heading, Text } from "@chakra-ui/react"
import Head from "next/head"
import "@chakra-ui/react";


export const Customheader = () => {
    return ( 
    
    <div>
        <Head>
            <title>EZ PC builder</title>
        </Head>

        <Box p="4" bg="blue.100">
            <Heading>EZ PC</Heading>
        </Box>

    </div>)
}