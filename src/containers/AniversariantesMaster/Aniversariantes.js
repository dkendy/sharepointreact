import React, { Component } from 'react';
import ReactDOM from 'react-dom';
 
import Spinner from '../../UI/Spinner' 
 
import {connect} from 'react-redux';
import ItemAniversariante from './ItemAniversariante';
import Pagination from "react-js-pagination"; 

class Aniversariantes extends Component 
{
  
    componentDidUpdate(){
        console.log('componentDidUpdate'); 
    }
   
  
    render() 
    {

        let _ok =  <div>
                            <h2 className="ms-webpart-titleText">
                                <nobr>
                                <strong>Aniversários</strong> 
                                </nobr>
                            </h2>
                             
                            <div className="row">
                                <ItemAniversariante aniversariantes={this.props.aniversariantes} />
                            </div> 

                            <div>
                                <Pagination
                                activePage={this.props.pagina}
                                itemsCountPerPage={10}
                                totalItemsCount={this.props.total}
                                pageRangeDisplayed={5}
                                onChange={this.props.onclickpage}
                                />
                            </div>

                            <div>
                                Total: {this.props.total}
                            </div>
                    </div>
       
     
        if(!this.props.isReady)
        {
            _ok = <Spinner />; 
        }
        else if(this.props.aniversariantes.length == 0)
        {
            _ok = <div>Não há aniversariantes</div>; 
        }
        
        return(
            <React.Fragment>
                {_ok} 
            </React.Fragment>
        );
    }
}


export default Aniversariantes;