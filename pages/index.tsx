import { Inter } from 'next/font/google'

import {

} from '@chakra-ui/react'
import { Customheader } from '@/components/header'
import { useContext, useEffect, useState } from 'react'
import { SupbaseContext } from '@/providers/SupabaseContext'
import { componentsRepository } from '@/repositories/functions'
import { FetchComponentsCategory } from '@/components/category';


const inter = Inter({ subsets: ['latin'] })


export default function Home({data}:any) {
  const { supabaseClient, _setSupabaseClient }:any = useContext(SupbaseContext);

  const [categories, setCategories] = useState<any>([]);



  useEffect( () => {

    const fetchComponentsInfos = async () => {

      const {error, data} = await componentsRepository.getComponentsCategories(supabaseClient);

      setCategories(data);
    }


    fetchComponentsInfos();

  }, [])

  return (
    <>
      <main>

        <Customheader/>

        <FetchComponentsCategory categories={categories} supabaseClient={supabaseClient}></FetchComponentsCategory>
              
      </main>
    </>
  )
}
