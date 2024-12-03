import React from 'react';
import './Styled.scss';
import equipe from '../../assets/Equipe-foto.png'

const About = () => {
  return (
    <div className="container">
      <div className="title">
        <h1>Quem Somos?</h1>
      </div>
      <div className="content">
        <p>
          A Charlie nasceu da paixão por criar doces que não apenas encantam o paladar, mas também aquecem o coração.
          Combinando tradição e inovação, nossa missão é trazer momentos doces para a vida das pessoas, sempre com
          ingredientes de qualidade e muito carinho em cada receita.
          <br />
          <br />
          Somos uma empresa familiar que valoriza o cuidado em cada detalhe, desde a seleção dos melhores ingredientes
          até o capricho na apresentação dos nossos produtos. Queremos que cada mordida dos nossos doces seja uma
          experiência única, despertando nostalgia e sorrisos.
          <br />
          <br />
          Seja para uma comemoração especial ou simplesmente para adoçar o seu dia, na Charlie você encontra o doce
          perfeito para cada momento. Nosso compromisso é oferecer sabor, qualidade e aquela sensação de felicidade
          que só um bom doce pode proporcionar.
        </p>

        <img src={equipe} alt="Equipe de confeiteiros" className="footer-image" />
      </div>
    </div>
  );
};

export default About;