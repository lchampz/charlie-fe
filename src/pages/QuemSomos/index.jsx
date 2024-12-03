import Footer from "../../components/Footer";
import Menu from "../../components/Menu";
import cozinheiro from "../../assets/Equipe-foto.png";
import "./styled.scss";

export default function QuemSomos() {
  return (
    <>
      <Menu />
      <section className="container_quemsomos">
        <div className="backgroud_quemsomos">
          <h1>Charlie Doces - Quem Somos</h1>
          <p>
					A Charlie nasceu da paixão por criar doces que não apenas encantam o paladar, mas também aquecem o coração. Combinando tradição e inovação, nossa missão é proporcionar momentos doces e especiais, sempre utilizando ingredientes de alta qualidade e muito carinho em cada receita.
          </p>
          <p>
					Somos uma empresa familiar que valoriza o cuidado em cada detalhe, desde a seleção dos melhores ingredientes até o capricho na apresentação dos nossos produtos. Queremos que cada mordida dos nossos doces seja uma experiência única, capaz de despertar nostalgia e provocar sorrisos.
          </p>
          <p>
					Seja para uma comemoração especial ou simplesmente para adoçar o seu dia, na Charlie você encontrará o doce perfeito para qualquer ocasião. Nosso compromisso é oferecer sabor, qualidade e a felicidade que só um bom doce pode proporcionar.
          </p>
          <div className="imagens">
            <img src={cozinheiro} alt="Imagem de cozinheiros" />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
