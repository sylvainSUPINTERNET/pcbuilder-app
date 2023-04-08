const customFunctionsQueryDb = {
    get_components_by_category: "get_components_by_category",
    get_components_categories: "get_components_categories",
}


const tables = {
    components: "components",
}


// https://supabase.com/docs/guides/database/functions

export const componentsRepository = {

    /**
     * Return list for one category given
     * @param supabaseClient 
     * @param componentName 
     * @returns 
     */
    getComponentsByCategory: async ( supabaseClient:any, category:string ) => {
        const data = await supabaseClient.rpc(customFunctionsQueryDb.get_components_by_category, { category_arg: category });
        return data;
    },

    /**
     * Return list of components categories
     * @param supabaseClient 
     * @returns 
     */
    getComponentsCategories: async ( supabaseClient:any ) => {
        const data = await supabaseClient.rpc(customFunctionsQueryDb.get_components_categories);
        return data;
    },
    

    // not use yet
    // getComponentsCategories: async (supabaseClient:any, fields: Array<string>) => {
    //     const fieldForSelect = fields.join(',');
    //     const data = await supabaseClient
    //     .from(tables.components)
    //     .select(fieldForSelect)
    //     .eq("category", "GPU")
    //     .order('constructor_brand', { ascending: true })
    //     .range(0, 25)
    //     return data;
    // },


}
