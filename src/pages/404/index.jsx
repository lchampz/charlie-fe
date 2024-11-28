import "./styled.scss";

const NotFound = () => {
  return (
    <div className="error-page-container">
      <div className="error-page">
        <div className="content">
          <h2 className="header" data-text="404">
            404
          </h2>
          <h4>Página não encontrada!</h4>
          <p>A página que você está tentando acessar não existe.</p>
          <div className="btns">
            <a href="./home">voltar para o início</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
