import getDate from 'date-fns/get_date'
import getMonth from 'date-fns/get_month'

import ExtractToUI from '../../assets/js/ExtractToUI'
import * as SearchAux from '../../assets/js/SearchAux';

class Noticias {

 
    get ID() {
        return "Noticias";
    }

    GetResults(resultadoMultiplo) {
        return ExtractToUI(this.ID,resultadoMultiplo,this.Monta);
    }

    SearchParameters(registrosporpagina,novaPagina){

        let contexto =  SP.ClientContext.get_current();

        var keywordNoticias =   SearchAux.CriarKeyWordQuery(contexto);
        keywordNoticias.set_queryText("SPContentType:Noticias "); 
        var propertiesNoticias =   keywordNoticias.get_selectProperties();
        propertiesNoticias.add('ID');
        propertiesNoticias.add('Title');
        propertiesNoticias.add('SeoBrowserTitleOWSTEXT');
        propertiesNoticias.add('PublishingImage');
        propertiesNoticias.add('CreatedOWSDATE');
        propertiesNoticias.add('ListID');
        propertiesNoticias.add('ListItemID');
    
        keywordNoticias.set_rowLimit(registrosporpagina);
    
        return keywordNoticias;
         
    }

     
    Monta(columns)
    { 
        if(columns.length == undefined)
        {
            var titulo = columns.Title;
            var subtitulo = columns.DisplayAuthor;
            var imagem = columns.PublishingImage;
            var data =  columns.CreatedOWSDATE; 
            var ListItemID = columns.ListItemID
            return {
                titulo: titulo,
                subtitulo: subtitulo,
                imagem: imagem,
                dia: getDate( data),
                mes: getMonth( data),
                Likes: 0,
                ListItemID: ListItemID
            }
             
        }
        else
        {
            var titulo = columns[2].Value;
            var subtitulo = columns[3].Value;
            var imagem = columns[4].Value;
            var data =  columns[5].Value;
             
            return {
                titulo: titulo,
                subtitulo: subtitulo,
                imagem: imagem,
                dia: getDate( data),
                mes: getMonth( data),
                Likes: 0,
                ListItemID: 0
            }
        }
    }
     

}

export default Noticias;

 

 
 
