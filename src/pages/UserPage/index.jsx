import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";

import Input from "../../components/Input";
import Button from "../../components/Button";

import Brush from "../../assets/brush.svg";
import Chevron from "../../assets/chevron.svg";
import Exit from "../../assets/exit.svg";
import Logo from "../../assets/logo.png";

import "./styled.scss";
import { UserService } from "../../services/User";
import { useToast } from "../../hooks/useToast";

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

const UserPage = () => {
  const { user, getUserInfo, token } = useAuth();
  const addToast = useToast();
  const [page, setPage] = useState(0);
  const [userInfo, setUserInfo] = useState({
    name: "",
    cpf: "",
    email: "",
    pass: "",
  });
  const service = UserService();

  useEffect(() => {
    const getData = async () => {
      const response = await getUserInfo();
      setUserInfo({
        id: response.user.USUARIO_ID,
        name: response.user.USUARIO_NOME,
        cpf: response.user.USUARIO_CPF,
        email: response.user.USUARIO_EMAIL,
        pass: response.user.USUARIO_SENHA,
      });
    };

    getData();
  }, []);

  const updateUser = async () => {
    try {
      const response = await service.UpdateUser(userInfo, token);
      if(response) addToast(response.data, response.error ? "fail" : "success");
    } catch(err) {
        addToast("Erro ao atualizar informações do usuário", "fail");
      }
  }

  const handleChangePage = (id) => {
    setPage(id);
  };

  const PageAddress = () => {
    return <div>Endereco</div>;
  };

  const PageUser = () => {
    return (
      <div className="page-user-container">
        <span>
          <label>Nome</label>
          <Input
            state={userInfo}
            setState={setUserInfo}
            name="name"
            value={userInfo?.name}
            placeholder={"nome..."}
            width="100%"
            padding={"1rem"}
          />
        </span>

        <span>
          <label>Email</label>
          <Input
            state={userInfo}
            setState={setUserInfo}
            name="email"
            value={userInfo?.email}
            placeholder={"email..."}
            width="100%"
            padding={"1rem"}
          />
        </span>

        <span>
          <label>CPF</label>
          <Input
            state={userInfo}
            setState={setUserInfo}
            name="cpf"
            value={userInfo?.cpf}
            placeholder={"CPF..."}
            width="100%"
            padding={"1rem"}
          />
        </span>

        <span>
          <label>Senha</label>
          <Input
            state={userInfo}
            setState={setUserInfo}
            name="pass"
            value={userInfo?.pass}
            placeholder={"senha..."}
            width="100%"
            padding={"1rem"}
          />
        </span>

        <Button margin={"0 auto"} click={updateUser} placeholder={"Atualizar Informações"} />
      </div>
    );
  };

  const Menu = () => {
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
              <p>{user?.name}</p>
            </div>
            <div className="exit">
              <img src={Exit} alt="sair" />
              <p> Sair</p>
            </div>
          </div>
          <div className="row">
            <img src={Logo} alt="" />
          </div>
        </div>
        <div className="content-user-page">
          {page !== 0 && (
            <div className="return">
              <p onClick={() => handleChangePage(0)}> Voltar</p>
              <div className="title">
                {cards[page - 1].title + " - " + cards[page - 1].subtitle}{" "}
              </div>
            </div>
          )}
          {getPageToRender(page)}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
