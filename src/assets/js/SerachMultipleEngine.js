 
const SearchingMultiple = (idsQuery,queriesExecutar) =>
{
    let contexto =SP.ClientContext.get_current();
      
    if (contexto === undefined || contexto === null)
        contexto = SP.ClientContext.get_current();
         
     

    return new Promise(function (resolve, rejected) {
 
        let resultadoMultiplo = null;
        var executor = new Microsoft.SharePoint.Client.Search.Query.SearchExecutor(contexto);
 
        if(idsQuery.length > 1)
            resultadoMultiplo = executor.executeQueries(idsQuery, queriesExecutar, true);
        else
        {
            resultadoMultiplo = executor.executeQuery(queriesExecutar[0]);
        }

        contexto.executeQueryAsync( 
            (e, dados) => {
                return resolve(resultadoMultiplo);
            } 
            ,(sender, args) => {
                return resolve(sender, args);
            } 
        )
     })
}

  

export default SearchingMultiple;