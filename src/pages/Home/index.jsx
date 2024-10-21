import { useState } from "react";
import { useProduct } from "../../hooks/useProduct";
import { useCart } from "../../hooks/useCart";
import Menu from "../../components/Menu";
import Card from '../../components/Card';
import banner from "../../assets/home.png";
import logo_moments from "../../assets/logo1.png";
import card1 from "../../assets/01.png";
import card2 from "../../assets/02.png";
import card3 from "../../assets/03.png";
import card4 from "../../assets/04.png";
import delicias from "../../assets/delicias.png";
import pedaco from "../../assets/pedaco.png";
import face from "../../assets/face.png";
import insta from "../../assets/insta.png";

import "./styled.scss";

const Home = () => {
  const { product } = useProduct() ;
  const [ quantity, setQuantity ] = useState(0);
  const { addToCart } = useCart();

  const sendToCart = (id, qtd) => {
    const findedItem = product.find((item) => id === item.PRODUTO_ID);

    addToCart(findedItem, qtd);
  };

  return (
    <>
      <Menu></Menu>
      <section className="backgroud">
        <section className="banner">
          <div className="titulo">
            <h1>Gostosuras ou travessuras?</h1>
            <h2>por que não os dois?</h2>
            <a id="button_banner" href="/products">
              Ver Novidades
            </a>
          </div>

          <div className="img_menu">
            <img src={banner} alt="Imagem de Cupcake" />
          </div>
        </section>

        <section className="moments">
          <img src={logo_moments} alt="logo da imagem do momento" />
          <p>Os melhores momentos da vida são aqueles que compartilhamos com as pessoas que amamos. 
          E nada traz mais alegria do que um doce feito com carinho.</p>
          
        </section>

        <section className="categorias">
          <h2>Confira Nossos Diferenciais</h2>

        <section className="cards">
        <div className="card">
            <img src={card1} alt="card 1" />
            <p>Diversão  </p>
          </div>

          <div className="card">
            <img src={card2} alt="card 2" />
            <p>Doçura </p>
          </div>

          <div className="card">
            <img src={card3} alt="card 3" />
            <p>Celebração  </p>
          </div>

          <div className="card">
            <img src={card4} alt="card 4" />
            <p>Conforto</p>
          </div>
        </section>
        </section>

        <section className="delicias">
          <img src={delicias} alt="grupo de imagens de bolos" />
        </section>

        <section className="pedaco">
          <img src={pedaco} alt="foto de uma pedaço de torta" />
          <div className="texto_pedaco">
            <h2>Vai um pouquinho aí?</h2>
            <p>Delicie-se com as criações mais irresistíveis! Nossos doces são feitos com ingredientes selecionados e carinho em cada detalhe. 
            Seja para adoçar seu dia ou transformar momentos especiais, cada mordida é uma explosão de sabor!</p>
          </div>
        </section>
        
        <div className="products-column">
          <span>Conheça nossos produtos</span>
          <div className="card-wrapper">
          {product.map((item, i) => (
              <Card key={i} item={item} setState={setQuantity} state={quantity} id={"card-"+item.PRODUTO_ID} click={() => sendToCart(item.PRODUTO_ID, quantity['card-'+item.PRODUTO_ID])}/>
            ))}
          </div>
        </div>

        <footer>
            <section className="informations">
              <div className="principal">
                <h3>Principal</h3>
                <a href="">Produtos</a>
                <a href="">Quem Somos</a>
                <a href="">Carrinho</a>
                <a href="">Contato</a>
              </div>

              <div className="contato">
                <h3>Contato</h3>
                <p>(11) 95954-0278</p>
                <p>Contato@charliedoces.com.br</p>
              </div>

              <div className="redes">
                <h3>Redes Sociais</h3>
                <a href=""><img src={face} alt="facebook" /></a>
                <a href=""><img src={insta} alt="instagram" /></a>
              </div>
            </section>
        </footer>

        {/* <section className="direitos">
          <p>Direitos reservados a Charlie Doces</p>
        </section> */}
      </section>
    </>
  );
};

export default Home;
