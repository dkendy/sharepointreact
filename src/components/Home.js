import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import BannerPrincipal from '../containers/BannerPrincipal/BannerPrincipal'
import NoticiasHome from '../containers/NoticiasHome/NoticiasHome'
import { connect } from 'react-redux';
import * as actions from '../store/actions/index'; 
import * as actionTypes from '../store/actions/actionsTypes';

import { addLocaleData, IntlProvider } from 'react-intl'
import en from 'react-intl/locale-data/en'
import pt from 'react-intl/locale-data/pt'
import { flattenMessages } from '../UI/FlattenMessages';
import messages from '../assets/resource/messages';
import MyProvider from  '../hoc/Context'
import {MyContext} from '../hoc/Context'
import { FormattedMessage } from 'react-intl';

class Home extends Component {
 

componentDidMount(){ 
    addLocaleData([...en, ...pt]); 
    this.props.onLoad();
}

  render() {

           
          //let params = new URLSearchParams(document.location.search.substring(1))

          return (
            <MyProvider>
                  <MyContext.Consumer>
                      {(context) => (
                      <IntlProvider locale={context.locale} messages={flattenMessages(messages[context.locale])}>
                        <React.Fragment>
                                 
                                  <div style={{backgroundColor: context.backgroundcolor,important: 'true'}}>
                                    <header> 
                                      <h1><FormattedMessage id="titulohome" /></h1>
                                    </header>  
                                    <BannerPrincipal imagens={this.props.bannerPrincipal} error={this.props.error} isReady={this.props.isReady} qtdDep="3" />
                                    <br/>
                                    <NoticiasHome noticias={this.props.noticiashome} error={this.props.error} isReady={this.props.isReady}  />
                                  </div> 
                          </React.Fragment>
                      </IntlProvider>)}
                    </MyContext.Consumer>
                  )}

                  
              </MyProvider>    
            )
          }
         
      
     
  }
 

const mapStateToProps = state => {
   

  return {
    bannerPrincipal: state.home.bannerPrincipal,
    noticiashome: state.home.noticiashome,
    error: state.error,
    isReady: state.isReady,
    locale: state.locale,
    backgroundColor :  state.backgroundcolor,
  };
}

const mapDispatchToProps = dispatch => {
  return {
      onLoad : ()=> dispatch(actions.initHome())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);
