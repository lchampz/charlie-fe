import React from 'react';
import './styled.scss';

export default function Modal({ isOpen, setModalOpen }) {
  if (!isOpen) return null;  // Retorna null se o modal não estiver aberto

  return (
    <div className="modal">
      <div className="modal-container">
        <h2>Mensagem Enviada!</h2>
        <p>Sua mensagem foi enviada com sucesso! Agradecemos pelo seu contato.</p>
        {/* Botão que fecha o modal ao clicar */}
        <button className="btn-fechar" onClick={() => setModalOpen(false)}>Fechar</button>
      </div>
    </div>
  );
}
