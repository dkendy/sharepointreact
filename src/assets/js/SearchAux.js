 

export const CriarKeyWordQuery = (contexto) => { 
        var keywordQuery = new Microsoft.SharePoint.Client.Search.Query.KeywordQuery(contexto);
        //Comum a todos
        keywordQuery.set_trimDuplicates(true);
        keywordQuery.set_enableSorting(true); 
        return keywordQuery;
}

export const CriaSearchExecutor  = (contexto) =>  {  
        return new Microsoft.SharePoint.Client.Search.Query.SearchExecutor(contexto);
}