import {put,select} from 'redux-saga/effects'
import * as actionTypes from '../actions/actionsTypes';
import * as actions from '../actions';
import * as SearchAux from '../../assets/js/SearchAux'; 
import SearchingMultiple from '../../assets/js/SerachMultipleEngine'
import Aniversariantes from '../../containers/AniversariantesMaster/Entity';
import Eventos from '../../containers/Eventos/Entity';
import Storage from '../../assets/js/Storage';
import Config from '../../containers/Configuracao/App/Entity';
import MasterPageConfig from '../../containers/Configuracao/MasterPage/Entity';


export function* goPageAniversariantesStartSaga(action)
{
    try
    {
        let contexto = yield SP.ClientContext.get_current();

        const state = yield select();
        let _aniversariantes = new  Aniversariantes();


        let aniversariantesRegistroPorPagina = 3;
        let novaPagina = state.master.aniversariantes.pagina;
        var idsQuery = [_aniversariantes.ID];

        var queriesExecutar = []; 
        queriesExecutar.push(_aniversariantes.SearchParameters(aniversariantesRegistroPorPagina,novaPagina));

        console.log('Montou paramentros goPageAniversariantesStartSaga ...',actions);
        console.log('goPageAniversariantesStartSaga - dentro do try');

        const response = yield SearchingMultiple(idsQuery,queriesExecutar);
        yield put(actions.onSucessMultiMasterPaginacao(response,novaPagina)); 
    }
    catch(error)
    {
        console.log('goPageAniversariantesStartSaga',errorfunctionMaster,error);
        yield put(  actions.errorfunctionMaster(error));
    } 
 
}


export function* initMasterSaga(action)
{   
        try
        {
        
            let pagina = 1;
            let paginaEvento = 1;
            const aniversariantesRegistroPorPagina = 3;

            console.log('Carregando initMasterSaga ...');
            let contexto =  SP.ClientContext.get_current();
            let _aniversariantes = new  Aniversariantes();
            let _eventos = new Eventos();
            let _config = new Config();
            let _confgMaster = new MasterPageConfig();

            
            var executor = SearchAux.CriaSearchExecutor(contexto);
            var idsQuery = [_aniversariantes.ID,_eventos.ID,_config.ID,_confgMaster.ID];

            let response = yield Storage.Session.Get("Master"); 
            
            console.log("********** initMasterSaga", response);
            
            if(!response)
            {
                var queriesExecutar = []; 
                queriesExecutar.push(_aniversariantes.SearchParameters(aniversariantesRegistroPorPagina,1));
                queriesExecutar.push(_eventos.SearchParameters(4,1));
                queriesExecutar.push(_config.SearchParameters(400,1));
                queriesExecutar.push(_confgMaster.SearchParameters(400,1));

                console.log("********** initMasterSaga executando o search");
                response = yield SearchingMultiple(idsQuery,queriesExecutar); 
                yield put(actions.onSucessMultiMaster(response));  
            }
            else
            {
                console.log("********** initMasterSaga pegando do cache", response);
                yield put(actions.onSucessMultiMaster(response.Dado)); 
            } 
        }
        catch(error)
        {
            console.log('initMasterSaga --> Erro: ',error);
            yield put(  actions.errorfunctionMaster(error));
        }

         

 
};