import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Box, Flex, Spacer, Text } from '@chakra-ui/react'
import { Customheader } from '@/components/header'
import { useContext, useEffect, useState } from 'react'
import { SupbaseContext } from '@/providers/SupabaseContext'


const inter = Inter({ subsets: ['latin'] })


export default function Home({data}:any) {
  const { supabaseClient, _setSupabaseClient }:any = useContext(SupbaseContext);

  const [components, setComponents] = useState<any>([]);
  

  useEffect( () => {

    const fetchComponents = async () => {
      // const data = await supabaseClient
      // .from('components')
      // .eq('category', 'GPU')
      // .select('*')
      // .sort('constructor_brand', { ascending: true })
      // .range(0, 25);
      // setComponents(data);
      // console.log(data);

      const data = await supabaseClient
        .from('components')
        .select("category, constructor_brand, label")
        .eq("category", "GPU")
        .order('constructor_brand', { ascending: true })
        .range(0, 25)

      setComponents(data);
      console.log(data);
    }


    fetchComponents();

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

        <Text>{JSON.stringify(components)}</Text>

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