import ExtractToUI from '../../../assets/js/ExtractToUI'
import * as SearchAux from '../../../assets/js/SearchAux';

class ConfiguracaoApp { 
 
    get ID() {
        return "ConfiguracaoApp";
    }

    GetResults(resultadoMultiplo) {
        return ExtractToUI(this.ID,resultadoMultiplo,this.Montar);
    }

    SearchParameters(registrosporpagina,novaPagina){

        let contexto =  SP.ClientContext.get_current();

        var keywordConfig = SearchAux.CriarKeyWordQuery(contexto);
        keywordConfig.set_queryText("SPContentType:BradescoConfiguracao"); 
        var propertiesEventos = keywordConfig.get_selectProperties();
        propertiesEventos.add('ChaveOWSTEXT');
        propertiesEventos.add('ValorOWSTEXT'); 
        keywordConfig.set_rowLimit(registrosporpagina);
    
        return keywordConfig;
         
    }

    Montar (columns) {
        if(columns.length == undefined)
        {
            var Chave = columns.ChaveOWSTEXT;
            var Valor = columns.ValorOWSTEXT; 
     
            
            return{
                Chave : Chave,
                Valor : Valor 
            }
        }
         
    }

     

}

export default ConfiguracaoApp;
 
 
 