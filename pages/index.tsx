import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Box, Flex, Spacer } from '@chakra-ui/react'
import { Customheader } from '@/components/header'
import { useContext, useEffect } from 'react'
import { SupbaseContext } from '@/providers/SupabaseContext'


const inter = Inter({ subsets: ['latin'] })



export default function Home() {

  const { supabaseClient, _setSupabaseClient }:any = useContext(SupbaseContext);


  useEffect( () => {
    console.log(supabaseClient);
  }, [])

  return (
    <>
      <main>

        <Customheader/>

        <Flex>
          <Box width="100%" bg='red.400'>
            Box 1
          </Box>
          <Spacer />
        </Flex>
        <Flex>
          <Box width="100%" bg='red.400'>
            Box 1
          </Box>
          <Spacer />
        </Flex>

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
