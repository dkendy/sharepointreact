import React from 'react';
import Slider from "react-slick";

const imagens = (props) => {
  
    const settings = {
        dots: true,
        infinitive: true,
        speed:500,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1
    }

    let t = props.imagens.map( igKey => {
        return(<div key={igKey.urlImage} >
                <a u="image"   href={igKey.urlImage} target={igKey.target}>
                    <span> 
                    <img  src={igKey.urlImage} alt={igKey.descricaoImagem} 
                          target={igKey.target}/>
                    </span>
                </a>
                
        </div>)
    });
     
    return(
        <Slider {...settings}>
         {t}
        </Slider>);

}

export default imagens;