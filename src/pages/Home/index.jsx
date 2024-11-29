import { useState } from "react";
import { useProduct } from "../../hooks/useProduct";
import { useCart } from "../../hooks/useCart";
import Menu from "../../components/Menu";
import Card from "../../components/Card";
import Footer from "../../components/Footer";
import banner from "../../assets/home.png";
import delicias from "../../assets/delicias.png";
import pedaco from "../../assets/pedaco.png";

// import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./styled.scss";
import "./mobile.scss";

// import { Autoplay, EffectCoverflow,Navigation, Pagination } from "swiper/modules";


const Home = () => {
  const { searchedProducts, product } = useProduct();
  const [quantity, setQuantity] = useState(0);
  const { addToCart } = useCart();
  const [activeDepoimento, setActiveDepoimento] = useState(1);

  const sendToCart = (id, qtd) => {
    const findedItem = product.find((item) => id === item.PRODUTO_ID);
    if(findedItem) addToCart(findedItem, qtd);
  };

  const abrirDepoimento = (depoimento) => {
    setActiveDepoimento(depoimento);
  };

  const depoimentos = [
    {
      id: 1,
      nome: "Pedro Marques",
      nota: "4.5",
      estrelas: "⭐⭐⭐⭐☆",
      texto: "Muito bom, recomendo demais! Comida muito bem feita pela confeiteira, atendimento dentro dos parâmetros e boa comunicação com o cliente.",
    },
    {
      id: 2,
      nome: "Ana Beatriz",
      nota: "5.0",
      estrelas: "⭐⭐⭐⭐⭐",
      texto: "Simplesmente apaixonada! Os doces são maravilhosos, e dá pra sentir o cuidado com cada detalhe. Desde a embalagem até o sabor, tudo é impecável. Recomendo muito, principalmente os brigadeiros gourmet, que são de outro nível!",
    },
    {
      id: 3,
      nome: "Lucas Silva",
      nota: "4.0",
      estrelas: "⭐⭐⭐⭐☆",
      texto: "Nunca pensei que encontraria doces tão bem feitos. A qualidade é excelente, e o sabor é inesquecível! Comprei para uma festa e foi um sucesso, todos queriam saber onde eu tinha encomendado. Atendimento rápido e atencioso, com certeza virei cliente fiel.",
    },
  ];

  const renderDepoimento = (depoimento) => (
    <div className="depoimento" key={depoimento.id}>
      <div className="container-dados-depoimento">
        <div>
          <p className="nome-depoimento"><b>{depoimento.nome}</b></p>
          <p className="nota-depoimento">
            <span>{depoimento.estrelas}</span> <span>{depoimento.nota}</span>
          </p>
        </div>
      </div>
      <p className="texto-depoimento">
        <span>{depoimento.texto}</span>
      </p>
    </div>
  );

  return (
    <>
      <Menu />
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

        <div className="products-column">
          <span className="title_products">Conheça nossos produtos</span>
          <div className="card-wrapper">
          {searchedProducts.map((item, i) => (
              <Card
                key={i}
                item={item}
                setState={setQuantity}
                state={quantity}
                id={"card-" + item.PRODUTO_ID}
                click={() =>
                  sendToCart(
                    item.PRODUTO_ID,
                    quantity["card-" + item.PRODUTO_ID]
                  )
                }
              />
            ))}
          </div>
        </div>

{/* <div className="products-column">
  <span className="title_products">Conheça nossos produtos</span>
  <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
  >
    {product.map((item, i) => (
      <SwiperSlide key={i}>
        <div className="product-card">
          <Card
            key={i}
            item={item}
            setState={setQuantity}
            state={quantity}
            id={"card-" + item.PRODUTO_ID}
            click={() =>
              sendToCart(
                item.PRODUTO_ID,
                quantity["card-" + item.PRODUTO_ID]
              )
            }
          />
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</div> */}


        <section className="pedaco">
          <img src={pedaco} alt="foto de uma pedaço de torta" />
          <div className="texto_pedaco">
            <h2>Vai um pouquinho aí?</h2>
            <p>
              Delicie-se com as criações mais irresistíveis! Nossos doces são feitos com ingredientes selecionados e carinho em cada detalhe. Seja para adoçar seu dia ou transformar momentos especiais, cada mordida é uma explosão de sabor!
            </p>
          </div>
        </section>

        <section className="delicias">
          <img src={delicias} alt="grupo de imagens de bolos" />
        </section>

        <section className="depoimentos" id="depoimentos">
          <div className="background-depoimentos"></div>
          <div className="container">
            <div className="row">
              <div className="col-one">
                <span className="hint-title"><b>Depoimentos</b></span>
                <h1 className="title"><b>O que dizem sobre nós?</b></h1>
                <div>
                  {renderDepoimento(depoimentos.find(d => d.id === activeDepoimento))}
                </div>
                <div className="btn-container">
                  {depoimentos.map((depo) => (
                    <button
                      key={depo.id}
                      className="btn"
                      onClick={() => abrirDepoimento(depo.id)}
                    >
                      {depo.id}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </section>
    </>
  );
};

export default Home;
