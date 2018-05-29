import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../utility';

const initialState = {
    home:{
        bannerPrincipal:[],
        noticiashome:[]
    },
    isReady:false, 
    error:false,
    blackgrouncolor: 'black', 
    locale : 'pt-BR'
}

const setHome = (state, action) => {
    
    console.log("setHome");
    return updateObject( state, {
        home: {
            bannerPrincipal: action.home.bannerPrincipal,
            noticiashome: action.home.noticiashome,
        }, 
        isReady:true, 
        error: false,
        backgroundcolor: action.backgroundcolor, 
        locale : action.locale
        
    } );
};

const reducer = (state = initialState, action) => {
     
    switch(action.type)
    {
        case actionTypes.LOAD_HOME:return setHome(state, action);  
      
        case actionTypes.ERROR:
            return {
                ...state,
                error:true
            };
        default: return state;
    } 

};
 

export default reducer;