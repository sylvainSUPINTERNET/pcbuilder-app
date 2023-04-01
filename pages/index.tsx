import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Box, Flex, Spacer } from '@chakra-ui/react'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <main>

      <Flex>
        <Box p='4' bg='red.400'>
          Box 1
        </Box>
        <Spacer />
        <Box p='4' bg='green.400'>
          Box 2
        </Box>
      </Flex>
      
      <p>Buzz</p>

      <Image
        src="/medias/619b93b0a2cec2241f7ac118_in20008151.webp"
        alt="Vercel Logo"
        className={styles.vercelLogo}
        width={340}
        height={340}
        priority/>
        
      </main>
    </>
  )
}
