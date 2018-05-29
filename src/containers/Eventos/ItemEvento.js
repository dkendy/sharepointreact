import React from 'react';


const itemeventos = (props) => {
  
     
    return(props.Eventos.map( igKey => {

                return( 
                    <div id="divHomeLista" key={igKey.titulo}  className="col-sm-12 col-xs-12 bradesco-noticia-home bradesco-border-noticias">
                    <a href={igKey.titulo} target="_self">
                    <img alt="{tag}" src={$(igKey.imagem).attr('src')}/>
                    </a>
                    
                    <div  className="bradesco-noticias-tag">
                    <span>{igKey.dia}</span>/
                    <span>{igKey.mes}</span> - 
                    </div>
                    <a href={igKey.titulo} target="_self" className="bradesco-noticia-home-text bradesco-font-size">
                    <h2>{ igKey.titulo }</h2> 
                    </a>
                </div>)
            }));

}

export default itemeventos;
