import face from "../../assets/face.png";
import insta from "../../assets/insta.png";

import "./footer.scss";
import "./mobile.scss";

export default function Footer() {
	return (
		<footer>
		<section className="informations">
			<div className="principal">
				<h3>Principal</h3>
				<a href="/products">Produtos</a>
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
	)
}

