import ReactDOM from 'react-dom';
import React, { Component } from 'react';
 
import { connect } from 'react-redux';
import * as actions from '../store/actions/index';
 
import * as actionTypes from '../store/actions/actionsTypes';
 

import Aniversariantes from '../containers/AniversariantesMaster/Aniversariantes'
import Eventos from '../containers/Eventos/Eventos'

import { addLocaleData, IntlProvider } from 'react-intl'
import en from 'react-intl/locale-data/en'
import pt from 'react-intl/locale-data/pt'
import { flattenMessages } from '../UI/FlattenMessages';
import messages from '../assets/resource/messages';
import MyProvider from  '../hoc/Context'
import {MyContext} from '../hoc/Context'
import { FormattedMessage } from 'react-intl';

 
class Master extends Component {
 
componentDidMount(){
    console.log('componentDidMount Master');
    addLocaleData([...en, ...pt]);
    this.props.onLoadMaster();
}

  render() { 
    return ( 
                <MyProvider> 
                    <MyContext.Consumer>
                        {(context) => (
                          <IntlProvider locale={context.locale} messages={flattenMessages(messages[context.locale])}>
                            <React.Fragment> 
                                <div style={{backgroundColor: context.backgroundcolor,important: 'true'}}>
                                  <header> 
                                    <h1><FormattedMessage id="titulo" /></h1>
                                  </header>
                                  
                                  <Aniversariantes aniversariantes={this.props.aniversariantes} total={this.props.totalaniversariantes} error={this.props.errorAniversario} isReady={this.props.isReadyAniversariantes} onclickpage={this.props.handlePageChange} pagina={this.props.pagina}/>
                                  <br/>
                                  <Eventos eventos={this.props.eventos} error={this.props.errorEvento} isReady={this.props.isReadyEventos}  />
                                  <br/>
                                </div> 
                            </React.Fragment>
                      </IntlProvider>
                  )}

                  </MyContext.Consumer>
              </MyProvider> 
    );
  }
}

const mapStateToProps = state => {
  return {
    aniversariantes: state.master.aniversariantes.registros,
    totalaniversariantes : state.master.aniversariantes.total,
    eventos: state.master.eventos.registros,
    errorAniversario: state.master.aniversariantes.error,
    errorEvento: state.master.eventos.error,
    isReadyAniversariantes: state.master.aniversariantes.isReady,
    isReadyEventos: state.master.eventos.isReady,
    pagina: state.master.aniversariantes.pagina, 
    locale: state.master.locale,
    backgroundColor :  state.master.backgroundcolor,
    config :  state.master.config, 
  };
}

const mapDispatchToProps = dispatch => {
  return {
      onLoadMaster : ()=> dispatch(actions.initMaster()),
      handlePageChange: (pag) => dispatch( actions.handlePageChange(pag) )
  }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(Master);
 