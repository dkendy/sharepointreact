import { initHomeSaga } from './home'
import { initMasterSaga ,goPageAniversariantesStartSaga } from './master'
import { takeEvery } from "redux-saga/effects";
import * as actionTypes from '../actions/actionsTypes';

export function* watchInitHome(){
     
  yield takeEvery(actionTypes.LOAD_HOME_INIT,initHomeSaga);
    
}
 
  export function* watchInitMaster() {
    yield takeEvery(actionTypes.LOAD_MASTER_INIT, initMasterSaga);
    yield takeEvery(actionTypes.GOPAGE_ANIVERSARIANTES_MASTER, goPageAniversariantesStartSaga);
  }

   