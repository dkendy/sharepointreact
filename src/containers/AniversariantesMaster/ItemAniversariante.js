
import React from 'react';


const itemaniversariante = (props) => {
  
     
    return(props.aniversariantes.map( igKey => {

                return(  
                    <div  key={igKey.nome} className="bradesco-border" id="divAniversariantes">
                        <div id="bradesco-aniversariantes" className="bradesco-box-niver">			
                        <span>
                        <a href="#"><img src={ igKey.imagem } /></a>
                        </span>
                        <div className="bradesco-box-niver-conteudo"> 
                            <h4 className="bradesco-bold">{ igKey.nome }</h4> 
                             
                        </div>		 
                        </div>
                    </div>

                )
            }));

}

export default itemaniversariante;
