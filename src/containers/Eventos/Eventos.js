import React, { Component } from 'react';
import ReactDOM from 'react-dom';
 
import Spinner from '../../UI/Spinner'
import ItemEventos from './ItemEvento'
 
import {connect} from 'react-redux';

class Eventos extends Component 
{ 
    componentDidUpdate(){
        console.log('componentDidUpdate'); 
    }
   
  
    render() 
    {

        let _ok =  <div id="divDropdownUltimasNoticias" className="dropdownUltimasNoticias" name="divDropdownUltimasNoticias">
                        <div className="ms-webpart-titleText textpadding">
                                    <nobr className="pull-left">
                                    <span>
                                        <strong>Eventos</strong>
                                    </span>
                                    </nobr> 
                        </div>
       
                        <div className="row">
                        <ItemEventos Eventos={this.props.eventos} />
                        </div> 
          
                        <div className="bradesco-btn pull-right bradesco-btn-small"> 
                            <a className="bradesco-btn">Ver todos</a>
                        </div>
              </div>
         
        if(!this.props.isReady)
        {
            _ok = <Spinner />; 
        }
        else if(this.props.eventos.length == 0)
        {
            _ok = <div>Não há eventos</div>; 
        }
        
        return(
            <React.Fragment>
                {_ok} 
            </React.Fragment>
        );
    }
}

 

export default Eventos;