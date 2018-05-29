import * as actionTypes from './actionsTypes';
import * as SearchAux from '../../assets/js/SearchAux'; 
import SearchingMultiple from '../../assets/js/SerachMultipleEngine';
//import thunk from 'redux-thunk';
import Axios from '../../assets/js/axios';
import axios2 from 'axios';
 
import Aniversariantes from '../../containers/AniversariantesMaster/Entity'; 
import Eventos from '../../containers/Eventos/Entity'
import Storage from '../../assets/js/Storage'
import Config from '../../containers/Configuracao/App/Entity';
import MasterPageConfig from '../../containers/Configuracao/MasterPage/Entity'; 
import GetConfigByName from '../../assets/js/GetConfigByName';

let contexto =SP.ClientContext.get_current();
 
let paginaEvento  = 1;
let pagina = 1;

export const errorfunctionMaster = (error) =>
{
     return dispatch => { dispatch({
            type: actionTypes.ERROR_MASTER
     }) };
}
 
export const onSucessMultiMasterPaginacao = (resultadoMultiplo, novaPagina) => {
    
    var aniversariantes = [];
    var eventos = [];
    var totalAniversariantes = 0; 
    console.log(resultadoMultiplo);
    
    var _aniversariantes = new Aniversariantes();

    var _result = _aniversariantes.GetResults(resultadoMultiplo);

    aniversariantes = _result.resultToUI;
    totalAniversariantes = _result.total; 
     
     return  {
        type: actionTypes.GOPAGE_ANIVERSARIANTES_FIM, 
        master: 
        { 
            aniversariantes:
            {   registros:aniversariantes, 
                total: totalAniversariantes,
                pagina: novaPagina
            }, 
            blackgrouncolor: 'black', 
            locale : 'en-US' 
        }   
     };

}

export const onSucessMultiMaster = (resultadoMultiplo) => {
    
    var aniversariantes = [];
    var eventos = [];
    var totalAniversariantes = 0;
    var totalEventos = 0;
    var _aniversariantes = new Aniversariantes();
    var _eventos = new Eventos();
    var _config = new Config();
    var _masterconfig = new MasterPageConfig();


    let response = Storage.Session.Get("Master"); 
    console.log('******** onSucessMultiHome ',resultadoMultiplo)
    
    if(!response)
    {
        console.log('******** onSucessMultiHome - Adicionando no cache')
        Storage.Session.Add("Master", resultadoMultiplo); 
    }
    
    var _aniversariantesresult = _aniversariantes.GetResults(resultadoMultiplo);
    aniversariantes = _aniversariantesresult.resultToUI;
    totalAniversariantes = _aniversariantesresult.total; 

    var _eventosResult = _eventos.GetResults(resultadoMultiplo); 
    eventos = _eventosResult.resultToUI;
    totalEventos = _eventosResult.total;

    var _configResult = _config.GetResults(resultadoMultiplo);
    var _masterConfigResult = _masterconfig.GetResults(resultadoMultiplo);
 
    let idioma =  GetConfigByName('Idioma',_configResult.resultToUI);
    let corDeFundo = GetConfigByName('CorFundo',_configResult.resultToUI);

    console.log('Idioma Master', idioma);
    console.log('CorDeFundo Master', corDeFundo);

     return  {
        type: actionTypes.LOAD_MASTER, 
        master: {   
                    aniversariantes:
                    { 
                        registros: aniversariantes, 
                        total: totalAniversariantes, 
                        pagina:pagina
                    },
                    eventos: 
                    {   registros: eventos, 
                        total: totalEventos, 
                        pagina:paginaEvento
                    },
                    config: _masterConfigResult,
                    backgroundcolor: corDeFundo, 
                    locale : idioma

                }   
     };

}

 
export const initMaster = () =>
{   
    console.log('initMaster');
    return  {
        type: actionTypes.LOAD_MASTER_INIT 
    };
 
}

export const handlePageChange = (pag)  =>
{
    console.log('handlePageChange action',pag);
    return  {
        type: actionTypes.GOPAGE_ANIVERSARIANTES_MASTER,
        pagina: pag
    };
}