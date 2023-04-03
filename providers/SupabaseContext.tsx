import { createContext, useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js'

export const SupbaseContext = createContext({});

export function SupabaseProvider({ children }: {children:any}) {
    const [supabaseClient, setSupabaseClient] = useState(createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_PKEY!));
    return (
        <SupbaseContext.Provider value={{ supabaseClient, setSupabaseClient }}>
            {children}
        </SupbaseContext.Provider>
    );
}