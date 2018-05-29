import React from 'react';
import Slider from "react-slick";

const itemnoticias = (props) => {
  
    const settings = {
        dots: true,
        infinitive: true,
        speed:500,
        autoplay: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        lazyLoad: true
    }
   let n = (props.noticiashome.map( igKey => {

                let like = <span>{igKey.Likes} curtiram isso</span>;
 
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
                        <p>{ igKey.subTitulo }</p> 
                        </a>
                        {like}
                    </div>  )
            }));


            return(
                <Slider {...settings}>
                 {n}
                </Slider>);

}

export default itemnoticias;



                         