import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Imagens from './Imagens'
 
import SearchEngine from '../../assets/js/SearchEngine'
import Spinner from '../../UI/Spinner'
import {connect} from 'react-redux';
import {bannerBradesco} from '../../assets/js/banner'
import {MyContext} from '../../hoc/Context'
import $ from 'jquery';
 
import './BannerPrincipal.css' 
 
class BannerPrincipal extends Component 
{
   
 
    componentDidUpdate(){
 
    } 
  
    render() 
    {

 


        let _divTeste =  <MyContext.Consumer>
                                {(context) => (
                                    <div  style={{backgroundColor: context.backgroundcolor,important: 'true'}} >TESTE TESTE TESTE </div>
                                )}
                        </MyContext.Consumer>;


        let _ok1 = <div className="load_item">
                        <div className="load_item_body">
                        </div>
                        <div className="load_item_load" >
                        </div>
                    </div>
 
        let _ok3 = <div style={{width:"1000px"}} data-step="1" data-intro="Veja os principais destaques do portal">
                         
                            <Imagens imagens={this.props.imagens} />
                         
                    </div>

        if(!this.props.isReady)
        {
            _ok1 = <Spinner />;
            _ok3 = <div/>
        }
        else
        {
            console.log('OK')
        }
        
        return(
            <React.Fragment>
                {_divTeste}
             
                {_ok3}
            </React.Fragment>
        );
    }
}


export default  BannerPrincipal;
