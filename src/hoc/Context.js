import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';

export const MyContext = React.createContext();
import SearchEngine from '../assets/js/SearchEngine'
import GetConfigByName from '../assets/js/GetConfigByName'

// Then create a provider Component
class MyProvider extends Component {
  state = {
    backgroundcolor: 'black', 
    locale : 'pt-BR'
  }

  componentDidMount(){
    console.log(' MyProvider componentDidMount')

    let fields = ['ChaveOWSTEXT', 'ValorOWSTEXT'];
        
      var KQL =  "SPContentType:BradescoConfiguracao";

      //SearchEngine.Get.executeQuery('https://bhs2.sharepoint.com/sites/dkendy',KQL, fields, this.props.qtdDep, this.MontaVisualizador, this.errorHandler, "OrdemBanner:ascending,PublishingStartDate:descending", 0);

      SearchEngine.Get.executeQuery(KQL, fields, 4, this.Montar, this.errorHandler, '', 0);

  }


  Montar = (results,total) =>
  {
    console.log(' MyProvider Montar')
      let resultConfig = [];
      debugger;
      if (results.length > 0) 
      { 
        for (var row = 0; (row < results.length) ; row++) {
              var columns = results[row].Cells;
              console.log(columns);
              debugger;
              
              resultConfig.push({
                Chave:columns[2].Value,
                Valor:columns[3].Value
              });
        }
      }
      debugger;
      let color = GetConfigByName('CorFundo',resultConfig);
      let idioma = GetConfigByName('Idioma',resultConfig);
       

      let aux = {
          backgroundcolor: color,
          locale: idioma
      }

      
      this.setState(aux);


  }

  render() {
    return (
      <MyContext.Provider value={
        this.state 
      }>
        {this.props.children}
      </MyContext.Provider>
    )
  }
} 
export default MyProvider;
 
 
 

 