 
import ExtractToUI from '../../assets/js/ExtractToUI'
import * as SearchAux from '../../assets/js/SearchAux';

class Aniversariantes {

 
    get ID() {
        return "Aniversariantes";
    }

    GetResults(resultadoMultiplo) {
        return ExtractToUI(this.ID,resultadoMultiplo,this.Montar);
    }

    SearchParameters(registrosporpagina,novaPagina){

        var KQL =  "WorkEmail:bhs";
        let contexto =  SP.ClientContext.get_current();
    
        var keywordAniversariantes = SearchAux.CriarKeyWordQuery(contexto);
            
        keywordAniversariantes.set_queryText(KQL);
            //2 - Critérios
        keywordAniversariantes.set_sourceId("B09A7990-05EA-4AF9-81EF-EDFAB16C4E31");
        var properties = keywordAniversariantes.get_selectProperties();
             
        properties.add('ID');
        properties.add('PreferredName');
        properties.add('WorkEmail');
        properties.add('JobTitle');
        properties.add('Department');
        properties.add('PictureURL');
        properties.add('UserProfile_GUID');
        properties.add('AccountName');
            
            
        keywordAniversariantes.set_startRow((novaPagina-1)* registrosporpagina);
        keywordAniversariantes.set_rowLimit(registrosporpagina);
    
        return keywordAniversariantes;
         
    }

    Montar  (columns){
        if(columns.length == undefined)
        {
            var nome = columns.PreferredName;
            var email = columns.DisplayAuthor;
            var imagem = 'https://bhs2.sharepoint.com/_layouts/15/userphoto.aspx?size=L&accountname=' + columns.AccountName.split('|')[2].replace('@','%40');
            
            return {
                nome : nome,
                email : email,
                imagem : imagem 
            }
        }
        else
        {
            console.log('Aniversariantes xxxx ->',columns);
            var nome = columns[2].Value;
            var email = columns[3].Value;
            var imagem = columns[4].Value;
            var accountname = columns[5].Value;
            var imagem = 'https://bhs2.sharepoint.com/_layouts/15/userphoto.aspx?size=L&accountname=' +  columns[5].Value.split('|')[2].replace('@','%40');
            
            return {
                nome : nome,
                email : email,
                imagem : imagem 
            }
        }
    }

     

}

export default Aniversariantes;
 
 