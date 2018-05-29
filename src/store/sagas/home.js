import {put,call} from 'redux-saga/effects'
import * as actionTypes from '../actions/actionsTypes';
import * as actions from '../actions';
import * as SearchAux from '../../assets/js/SearchAux'; 
import SearchingMultiple from '../../assets/js/SerachMultipleEngine'
import Banner from '../../containers/BannerPrincipal/Entity';
import Noticias from '../../containers/NoticiasHome/Entity';
import Config from '../../containers/Configuracao/App/Entity';

import Storage from '../../assets/js/Storage'


export function getTotalLikes(resultadoMultiplo)
{
    console.log('getTotalLikes',resultadoMultiplo);
    let contexto = SP.ClientContext.get_current();
    let KQL = "SPContentType:Noticias ";
 
    const _noticias =  new Noticias();
    if(resultadoMultiplo.m_value)
    {
    
        if (resultadoMultiplo.m_value[_noticias.ID] != null)
        {
            if (resultadoMultiplo.m_value[_noticias.ID].ResultTables[0] != null) {
                var rows = resultadoMultiplo.m_value[_noticias.ID].ResultTables[0].ResultRows;
                
                for (var i = 0 ; i < rows.length; i++) 
                {
                    var columns = rows[i];
                    KQL = KQL + " (ListItemID:" + columns.ListItemID + " AND ListID:" + columns.ListID + ")  OR"
                        
                        
                }
                
            }
        }

        KQL = KQL +   ' ( 1:1) ';
    }
    else
        KQL = KQL +   ' ( 1:0) ';

        

        console.log(KQL);

    
        //Aniversariantes
        var keywordLikes = SearchAux.CriarKeyWordQuery(contexto);
         
        keywordLikes.set_queryText(KQL);
        //2 - Critérios 
        var properties = keywordLikes.get_selectProperties();
         
        properties.add('ListItemID');
        properties.add('LikesCount');

        var executor = SearchAux.CriaSearchExecutor(contexto);
        var idsQuery = ["1"];

        var queriesExecutar = []; 
        queriesExecutar.push(keywordLikes);

        console.log('Montou paramentros Likes ...');
        
        return SearchingMultiple(idsQuery,queriesExecutar);
    
}

export function* initHomeSaga(action) {
   
    try
    {
        let contexto =  SP.ClientContext.get_current();
    
        var executor =   SearchAux.CriaSearchExecutor(contexto);

        const _banner = new Banner();
        const _noticias =  new Noticias();
        const _config = new Config();


        var idsQuery = [_banner.ID, _noticias.ID, _config.ID];
    
        let response = yield Storage.Session.Get("Home");
        let config = yield Storage.Session.Get("config");
        let _totalLikes = yield Storage.Session.Get("Home2"); 
        
        console.log("********** initHomeSaga", response);
        
        if(!response)
        {
            var queriesExecutar = []; 
            queriesExecutar.push(_banner.SearchParameters(3,1));
            queriesExecutar.push(_noticias.SearchParameters(6,1));
            queriesExecutar.push(_config.SearchParameters(400,1));

            console.log("********** initHomeSaga executando o search");

            response = yield SearchingMultiple(idsQuery,queriesExecutar); 
            _totalLikes = yield call(getTotalLikes, response);
            yield put(actions.onSucessMultiHome(response,_totalLikes));  
        }
        else
        {
            console.log("********** initHomeSaga pegando do cache", response);
            yield put(actions.onSucessMultiHome(response.Dado,_totalLikes.Dado)); 
        }
         
    }
    catch(error)
    {
        console.log('initHomeSaga --> Erro: ',error);
        yield put(  actions.errorfunction(error));
    }
}