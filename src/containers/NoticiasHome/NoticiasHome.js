import React, { Component } from 'react';
import ReactDOM from 'react-dom';
 
import Spinner from '../../UI/Spinner'
import ItemNoticias from './ItemNoticia' 
import {connect} from 'react-redux';
import { FormattedMessage } from 'react-intl';
import {MyContext} from '../../hoc/Context'

class NoticiasHome extends Component 
{ 
    componentDidUpdate(prevProps, prevState){
        console.log('componentDidUpdate Noticias Home - ', this.props); 
        
    }
   
  
    render() 
    {

        let _ok =  <div id="divDropdownUltimasNoticias" className="dropdownUltimasNoticias" name="divDropdownUltimasNoticias">
                        <div className="ms-webpart-titleText textpadding">
                                    <nobr className="pull-left">
                                    <span>
                                        <strong><FormattedMessage id="noticias" /></strong>
                                    </span>
                                    </nobr> 
                        </div>
                         
                        <div className="row"  style={{width:"1000px", height:"900px"}}>
                            <ItemNoticias noticiashome={this.props.noticias} />
                        </div> 
          
                        <div className="bradesco-btn pull-right bradesco-btn-small"> 
                            <a className="bradesco-btn"><FormattedMessage id="vertodos" /></a>
                        </div>
              </div>
        
        if(!this.props.isReady)
        {
            _ok = <Spinner />; 
        }
        else if(this.props.noticias.length == 0)
        {
            _ok = <div>Não há notícias</div>; 
        }
        
        return(
            <React.Fragment>
                {_ok} 
            </React.Fragment>
        );
    }
}

 
const mapStateToProps = state => ({ itemsBanner : state.noticiashome });
export default connect(mapStateToProps)(NoticiasHome);