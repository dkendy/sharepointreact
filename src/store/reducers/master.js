import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../utility';

const initialState = {
    master:{
        aniversariantes:{
            registros:[],
            total : 0,
            pagina: 0,
            isReady:false, 
            error:false
        }, 
        eventos:{
            registros:[],
            total : 0,
            pagina: 0,
            isReady:false, 
            error:false
        },
        blackgrouncolor: 'black', 
        locale : 'pt-BR'
    }
}

const setMaster = (state, action) => { 
    console.log('setMaster');
    return updateObject( state, {
        master: {
            aniversariantes:{
                registros:action.master.aniversariantes.registros,
                total : action.master.aniversariantes.total,
                pagina: action.master.aniversariantes.pagina,
                isReady:true, 
                error:false
            },
            eventos:{
                registros:action.master.eventos.registros,
                total : action.master.eventos.total,
                pagina: action.master.eventos.pagina,
                isReady:true, 
                error:false
            },
            backgroundcolor: action.master.backgroundcolor, 
            locale : action.master.locale,
            config: action.master.config
        } 
    } );
};
 

const goPageAniversariantes = (state, action) => { 
    console.log('goPageAniversariantes pagina : ', action.master.aniversariantes.paginago);
    return updateObject( state, {
        master:{
        aniversariantes:{
            registros:action.master.aniversariantes.registros,
            total : action.master.aniversariantes.total,
            pagina: action.master.aniversariantes.pagina,
            isReady:true, 
            error:false
        },
        eventos:{
            registros:state.master.eventos.registros,
            total : state.master.eventos.total,
            pagina: state.master.eventos.pagina,
            isReady:true, 
            error:false
        },
        backgroundcolor: state.master.backgroundcolor, 
        locale : state.master.locale,
        config: state.master.config,
    }
    } );
};

const goPageAniversariantesStart = (state, action) => { 
    console.log('goPageAniversariantesStart : mudar a página para ' + action.pagina);
    
    return updateObject( state, {
        master: {
            aniversariantes:{
                registros:state.master.aniversariantes.registros,
                total : state.master.aniversariantes.total,
                pagina: action.pagina,
                isReady:false, 
                error:false
            },
            eventos:{
                registros:state.master.eventos.registros,
                total : state.master.eventos.total,
                pagina: state.master.eventos.pagina,
                isReady:true, 
                error:false
            },
            blackgrouncolor: state.master.backgroundcolor, 
            locale : state.master.locale,
            config: state.master.config,
        }
    } );
}; 

 

const reducer = (state = initialState, action) => {
     
    switch(action.type)
    {
        case actionTypes.LOAD_MASTER:return setMaster(state, action); 
        case actionTypes.GOPAGE_ANIVERSARIANTES_MASTER:return goPageAniversariantesStart(state, action); 
        case actionTypes.GOPAGE_ANIVERSARIANTES_FIM:return goPageAniversariantes(state, action);
        case actionTypes.ERROR:
            return {
                ...state,
                error:true
            };
        default: return state;
    } 

};
 

export default reducer;