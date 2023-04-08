const customFunctionsQueryDb = {
    get_components_by_category: "get_components_by_category",
    get_components_categories: "get_components_categories",
}


const tables = {
    components: "components",
}

export const queryDb = {
    getComponentsByCategory: async ( supabaseClient:any, componentName:string ) => {
        const data = await supabaseClient.rpc(customFunctionsQueryDb.get_components_by_category, { category_arg: componentName });
        return data;
    },
    getComponentsCategories: async (supabaseClient:any, fields: Array<string>) => {
        const fieldForSelect = fields.join(',');
        const data = await supabaseClient
        .from(tables.components)
        .select(fieldForSelect)
        .eq("category", "GPU")
        .order('constructor_brand', { ascending: true })
        .range(0, 25)

        return data;
    },
    // getComponentsCategories: async ( supabaseClient:any ) => {
    //     const data = await supabaseClient
    //     .rpc(customFunctionsQueryDb.get_components_categories);
    //     return data;
    // },
    

}
