export const ExtractToUI = (index, results, func) =>{

    let resultToUI = [];
    let total = 0;
  
    console.log('ExtractToUI ', results.m_value);

    if (results.m_value != null)
    {  
       let rows = [];

       if(results.m_value.ResultTables === undefined)
       {    
           if (results.m_value[index].ResultTables != null) {
                rows = results.m_value[index].ResultTables[0].ResultRows;
                total = results.m_value[index].ResultTables[0].TotalRowsIncludingDuplicates; 
            }
        }
        else
        {
            
            if (results.m_value.ResultTables != null) {
                rows = results.m_value.ResultTables[0].ResultRows;
                total = results.m_value.ResultTables[0].TotalRowsIncludingDuplicates; 
            }
        }

        for (var i = 0 ; i < rows.length; i++) 
        {
            var columns = rows[i];
            resultToUI.push(func(columns));
        }
    }

    return{
        resultToUI: resultToUI,
        total: total
    }
}

export default ExtractToUI;