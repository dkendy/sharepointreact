const GetConfigByName = (name, results) => {
    debugger;
    return (results.find(o => o.Chave === name)).Valor; 
}

export default GetConfigByName;