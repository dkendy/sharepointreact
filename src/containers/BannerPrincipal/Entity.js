import ExtractToUI from '../../assets/js/ExtractToUI'
import * as SearchAux from '../../assets/js/SearchAux';

class Banner {

 
    get ID() {
        return "Banner";
    }

    GetResults(resultadoMultiplo) {
        return ExtractToUI(this.ID,resultadoMultiplo,this.MontarBanner);
    }

    SearchParameters(registrosporpagina,novaPagina){

        let contexto =  SP.ClientContext.get_current();
        
        var KQL =   "SPContentType:BannerBradescoImagem (   (SiteName:" + 'https://bhs2.sharepoint.com/sites/dkendy'  + ")) (StatusBannerOWSCHCS:Ativo)(ExibirHomeOWSBOOL:1)";
     
        var keywordBanner =   SearchAux.CriarKeyWordQuery(contexto);
        keywordBanner.set_queryText(KQL);
         
        var properties =   keywordBanner.get_selectProperties();
        properties.add('ID');
        properties.add('Title');
        properties.add('SubtituloOWSTEXT');
        properties.add('DocumentLink');
        properties.add('LinkdestinoOWSLINK');
        properties.add('ExibirtituloOWSBOOL');
        properties.add('ImagemMobileOWSIMGE');
        keywordBanner.set_rowLimit(registrosporpagina);
    
        console.log('Banner -> nova função ',keywordBanner); 
        return keywordBanner; 
         
    }

    MontarBanner  (columns) {
        if(columns.length == undefined)
        {  
            var titulo = columns.Title;
            var subtitulo = columns.SubtituloOWSTEXT;
            var imagemBanner = columns.DocumentLink.split('\n')[0];
            var imagemBannerMobile = columns.DocumentLink
            var urlImg = '';
            
            var urlBanner = columns.DocumentLink;
            var exibirTitulo = false
            var imagemBannerURL = "";
            var urlImageAlt = "";

            if (imagemBanner !== "") {
                imagemBannerURL = imagemBanner ;
                urlImageAlt = titulo;
            }

            var url = "";
            var target = "";
            var altImage = "";

            if (urlBanner !== "")
            {
                url = columns.DocumentLink
                target = "self";
                altImage = titulo;

            }

             
            return{
                titulo:titulo,
                subtitulo : subtitulo,
                urlImage : imagemBannerURL,
                url: url,
                target : target,
                exibirTitulo: exibirTitulo,
                descricaoImagem: altImage
            }  

        }
        else
        {
            var titulo = columns[2].Value;
            var subtitulo = columns[3].Value;
            var imagemBanner = columns[4].Value.split('\n')[0];
            var imagemBannerMobile = columns[7].Value
            var urlImg = '';
            
            var urlBanner = columns[5].Value;
            var exibirTitulo = columns[6].Value == "1" ? true : false
            var imagemBannerURL = "";
            var urlImageAlt = "";

            if (imagemBanner !== "") {
                imagemBannerURL = imagemBanner ;
                urlImageAlt = titulo;
            }

            var url = "";
            var target = "";
            var altImage = "";

            if (urlBanner !== "")
            {
                url = jQuery(urlBanner).attr('href');
                target = jQuery(urlBanner).attr('target');
                altImage = titulo;

            }

            return{
                titulo:titulo,
                subtitulo : subtitulo,
                urlImage : imagemBannerURL,
                url: url,
                target : target,
                exibirTitulo: exibirTitulo,
                descricaoImagem: altImage
            }  
        } 
    }

     

}

export default Banner;