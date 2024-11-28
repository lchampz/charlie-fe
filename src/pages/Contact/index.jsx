import { useState } from 'react';
import './styled.scss';
import emailjs from '@emailjs/browser';
import Modal from '../../components/FormModal';
import Whatsapp from '../../assets/whatsApp.png';
import Endereco from '../../assets/pin.png';
import Telefone from '../../assets/tel.png';
import Menu from '../../components/Menu';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function sendEmail(e) {
    e.preventDefault();
    if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
      setError('Todos os campos são obrigatórios.');
      return;
    }
    if (!isValidEmail(email)) {
      setError('Por favor, insira um e-mail válido.');
      return;
    }

    setError('');
    const templateParams = {
      form_name: name.trim(),
      message: message.trim(),
      email: email.trim(),
    };

    emailjs
      .send('service_7616isq', 'template_0uvwupj', templateParams, 'K8n2y8jmg7Jaaj_J5')
      .then(() => {
        setName('');
        setEmail('');
        setMessage('');
        setIsOpen(true);
      })
      .catch((error) => {
        setError('Ocorreu um erro ao enviar o e-mail.');
      });
  }

  return (
    <>
      <Menu />
      <div className="background">
      <section className="contact-section">
        <div className="card-contato">
          <div className="content-wrapper">
            <div className="left-content">
              <h1 className="titulo">Entre em contato</h1>
              <p>
                Na Charlie, queremos ouvir você! Entre em contato conosco para tirar dúvidas, fazer pedidos ou enviar sugestões. Nossa equipe está pronta para ajudar a
                tornar seu dia mais doce!
              </p>
            </div>

            <form className="form" onSubmit={sendEmail}>
              <h3>Envie uma mensagem</h3>
              {error && <p className="error-message">{error}</p>}

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome"
                required
              />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Mensagem"
                required
              />

              <h6>Ao enviar, você concorda com o processamento dos seus dados pessoais pela Charlie, conforme descrito na Declaração de Privacidade.</h6>
              <input type="submit" value="Enviar" className="button" />
            </form>
          </div>
        </div>

     {/*    <div className="contact-cards">
          <div className="contact-card">
            <div className="icon">
              <img src={Telefone} alt="Telefone" />
            </div>
            <div className="label">Telefone</div>
            <div className="info">+55 11 91234-5678</div>
          </div>

          <div className="contact-card">
            <div className="icon">
              <img src={Endereco} alt="Endereco" />
            </div>
            <div className="label">Endereço</div>
            <div className="info">Rua XXX, 0000<br />São Paulo, SP</div>
          </div>

          <div className="contact-card">
            <div className="icon">
              <img src={Whatsapp} alt="WhatsApp" />
            </div>
            <div className="label">WhatsApp</div>
            <div className="info">+55 11 91234-5678</div>
          </div>
        </div>
*/}
       
      </section>
      
      </div>
      <Modal isOpen={isOpen} setModalOpen={setIsOpen} />
    </>
  );
}
