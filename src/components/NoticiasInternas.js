import React, { Component } from 'react';

import BannerPrincipal from '../containers/BannerPrincipal/BannerPrincipal'

class NoticiasInternas extends Component {
  render() {
    return (
      <div >
        <header> 
          <h1>Noticias Internas - React</h1>
        </header> 
        <BannerPrincipal qtdDep="1" /><BannerPrincipal qtdDep="2" />
      </div>
    );
  }
}

export default NoticiasInternas;