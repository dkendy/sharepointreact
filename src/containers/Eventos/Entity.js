import getDate from 'date-fns/get_date'
import getMonth from 'date-fns/get_month'
import ExtractToUI from '../../assets/js/ExtractToUI'
import * as SearchAux from '../../assets/js/SearchAux';

class Eventos { 
 
    get ID() {
        return "Eventos";
    }

    GetResults(resultadoMultiplo) {
        return ExtractToUI(this.ID,resultadoMultiplo,this.Montar);
    }

    SearchParameters(registrosporpagina,novaPagina){

        let contexto =  SP.ClientContext.get_current();

        var keywordEventos = SearchAux.CriarKeyWordQuery(contexto);
        keywordEventos.set_queryText("ContentType:ListFieldsContentType"); 
        var propertiesEventos = keywordEventos.get_selectProperties();
        propertiesEventos.add('DocId');
        propertiesEventos.add('Title');
        propertiesEventos.add('PublishingImage');
        propertiesEventos.add('CreatedOWSDATE');
        keywordEventos.set_rowLimit(registrosporpagina);
    
        return keywordEventos;
         
    }

    Montar (columns) {
        if(columns.length == undefined)
        {
            var docId = columns.DocId
            var titulo = columns.Title;
            var imagem = columns.PublishingImage;
            var data =  columns.CreatedOWSDATE; 
     
            try
            {
                console.log(getDate(data));
            }
            catch(e)
            {
                console.log(e);
            }
            return{
                ID : docId,
                titulo : titulo,
                imagem : imagem,
                dia: getDate( data),
                mes: getMonth( data),
            }
        }
        else
        {
            var docId =  columns[2].Value;
            var titulo = columns[2].Value;
            var imagem = columns[4].Value;
            var data =  columns[5].Value;
            try
            {
                console.log(getDate(data));
            }
            catch(e)
            {
                console.log(e);
            }
            return{
                ID : docId,
                titulo : titulo,
                imagem : imagem,
                dia: getDate( data),
                mes: getMonth( data),
            }
        } 
    }

     

}

export default Eventos;
 
 
 