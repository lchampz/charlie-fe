import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

import Brush from '../../assets/brush.svg'
import Chevron from '../../assets/chevron.svg'
import Exit from '../../assets/exit.svg'
import Logo from '../../assets/logo.png'

import "./styled.scss";

const UserPage = () => {
  const { user } = useAuth();
  const [page, setPage] = useState(0);

  const handleChangePage = (id) => {
    setPage(id);
  };

  const PageAddress = () => {
    return <div>Endereco</div>;
  };

  const PageUser = () => {
    return <div>User</div>;
  };

  const Menu = () => {
    const cards = [
      {
        icon: Brush,
        title: "Usuário",
        subtitle: "Editar informações do usuário.",
        id: 1,
      },
      {
        icon: Brush,
        title: "Endereço",
        subtitle: "Editar/Cadastrar endereços para entrega.",
        id: 2,
      },
    ];

    return (
      <div className="wrapper-page">
        <div className="title-user-page">
          <span>
            {/* icon user */}
            <b>Informações do usuário</b>
          </span>
          <p>Gerencie as informações do usuário.</p>
        </div>
        <div className="wrapper-card-page-user">
          {cards.map((item, i) => (
            <div
              onClick={() => handleChangePage(item.id)}
              key={i}
              className="card-user-page"
            >
              <div className="card-content">
                <img src={item.icon} alt={item.title} />
                <p className="title">{item.title}</p>
                <p className="subtitle">{item.subtitle}</p>
                <img src={Chevron} alt={item.title} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const getPageToRender = (id) => {
    switch (id) {
      case 0:
        return <Menu />;
      case 1:
        return <PageUser />;
      case 2:
        return <PageAddress />;
    }
  };

  return (
    <div className="wrapper-user-page">
      <div className="container-user-page">
        <div className="header-user-page">
          <div className="row">
            <div className="greeting">
              <p>Boa tarde,</p>
              <p>{user.name}</p>
            </div>
            <div className="exit">
             <img src={Exit} alt="sair" />
              <p>  Sair</p>
            </div>
          </div>
          <div className="row"><img src={Logo} alt="" /></div>
        </div>
        <div className="content-user-page">
          {page !== 0 && (
            <div className="return">
              
              <p onClick={() => handleChangePage(0)}> Voltar</p>
            </div>
          )}
          {getPageToRender(page)}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
