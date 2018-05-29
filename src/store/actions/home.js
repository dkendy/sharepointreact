import * as actionTypes from './actionsTypes';
import * as SearchAux from '../../assets/js/SearchAux'; 
import SearchingMultiple from '../../assets/js/SerachMultipleEngine'
import Axios from '../../assets/js/axios';
 
import Banner from '../../containers/BannerPrincipal/Entity'; 
import Noticias from '../../containers/NoticiasHome/Entity';
import Config from '../../containers/Configuracao/App/Entity'
import Storage from '../../assets/js/Storage'
import GetConfigByName from '../../assets/js/GetConfigByName';


let contexto =SP.ClientContext.get_current();
 
export const errorfunctionHome = (error) =>
{
    console.log('error home', error);
     return dispatch => { dispatch({
            type: actionTypes.ERROR
     }) };
}

export const onSucessMultiHome = (resultadoMultiplo, totalLikes) => {
    
      
     
     var itemsBanner = [];
     var noticiasHome = [];
     var resultTotalLikes = [];
     var configApp = [];
     const _banner = new Banner();
     const _noticias = new Noticias();
     const _config = new Config();


    let response = Storage.Session.Get("Home");
    let _totalLikes = Storage.Session.Get("Home2"); 
    let responseConfig =  Storage.Session.Get("config"); 

    console.log('******** onSucessMultiHome ',resultadoMultiplo)
    
    if(!response)
    {
        console.log('******** onSucessMultiHome - Adicionando no cache')
        Storage.Session.Add("Home", resultadoMultiplo);
        Storage.Session.Add("Home2", totalLikes);
        Storage.Session.Add("config", responseConfig); 
    }

     if (totalLikes.m_value.ResultTables[0] != null)
     { 
                    var rows = totalLikes.m_value.ResultTables[0].ResultRows;
                    for (var i = 0 ; i < rows.length; i++) 
                    {
                        var columns = rows[i];
                          
                        resultTotalLikes.push({
                                ListItemID: columns.ListItemID,
                                LikesCount: columns.LikesCount 
                        })
                        
                    }
    }
    
    
    

    var _configResult = _config.GetResults(resultadoMultiplo); 
 
    let idioma =  GetConfigByName('Idioma',_configResult.resultToUI);
    let corDeFundo = GetConfigByName('CorFundo',_configResult.resultToUI);

    console.log('Idioma Home', idioma);
    console.log('CorDeFundo Home', corDeFundo);
    

    var _itemsBanner =   _banner.GetResults(resultadoMultiplo)
    itemsBanner = _itemsBanner.resultToUI;
            
    var _noticiasHome =  _noticias.GetResults(resultadoMultiplo)
    noticiasHome = _noticiasHome.resultToUI;    

     noticiasHome.map( itemNoticia => { 
        console.log(itemNoticia);
        resultTotalLikes.map( likesNoticia => { 
            console.log(likesNoticia);
            if(likesNoticia.ListItemID === itemNoticia.ListItemID)
            {
                itemNoticia.Likes = likesNoticia.LikesCount;
            }
    
         })

     });

     return  {
        type: actionTypes.LOAD_HOME, 
        home: { bannerPrincipal:itemsBanner, noticiashome:noticiasHome },
        backgroundcolor: corDeFundo, 
        locale : idioma
     };

}



export const initHome = () =>
{
    return { 
        type: actionTypes.LOAD_HOME_INIT
    }
 
}
  
 