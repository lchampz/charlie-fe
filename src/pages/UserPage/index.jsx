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
  const [newAddress, setNewAddress] = useState({
    name: null,
    address: "",
    number: "",
    complement: "",
    cep: "",
    city: "",
    state: "",
  });
  const [address, setAddress] = useState([]);

  const service = UserService();

  useEffect(() => {
    const getData = async () => {
      const userResponse = await getUserInfo();
      setUserInfo({
        id: userResponse.user.USUARIO_ID,
        name: userResponse.user.USUARIO_NOME,
        cpf: userResponse.user.USUARIO_CPF,
        email: userResponse.user.USUARIO_EMAIL,
        pass: userResponse.user.USUARIO_SENHA,
      });

      const addressResponse = await service.GetAddress(token);
      setAddress(addressResponse);
    };

    getData();
  }, []);

  const updateUser = async () => {
    try {
      const response = await service.UpdateUser(userInfo, token);
      if (response)
        addToast(response.data, response.error ? "fail" : "success");
    } catch (err) {
      addToast("Erro ao atualizar informações do usuário", "fail");
    }
  };

  const handleChangePage = (id) => {
    setPage(id);
  };

  const PageAddress = () => {
    const renderAddress = () => {
      const settingAddressInfo = (id) => {
        const findAddress = address.find((item) => item.ENDERECO_ID === id);

        setNewAddress({
          name: findAddress.ENDERECO_NOME,
          address: findAddress.ENDERECO_LOGRADOURO,
          number: findAddress.ENDERECO_NUMERO,
          complement: findAddress.ENDERECO_COMPLEMENTO,
          cep: findAddress.ENDERECO_CEP,
          city: findAddress.ENDERECO_CIDADE,
          state: findAddress.ENDERECO_ESTADO,
        });
      };

      return address.map((item, i) => (
        <tr onClick={() => settingAddressInfo(item.ENDERECO_ID)} key={i}>
          <td>{item.ENDERECO_NOME}</td>
          <td>{item.ENDERECO_LOGRADOURO}</td>
          <td>{item.ENDERECO_NUMERO}</td>
        </tr>
      ));
    };

    const cleanUp = () => {
      setNewAddress({
        name: "",
        address: "",
        number: "",
        complement: "",
        cep: "",
        city: "",
        state: "",
      });
    };

    return (
      <div className="address-wrapper">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Logradouro</th>
              <th>Numero</th>
            </tr>
          </thead>
          <tbody>{renderAddress()}</tbody>
        </table>
        <Button click={cleanUp} placeholder={"Adicionar Endereço"} />
      </div>
    );
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

        <Button
          margin={"0 auto"}
          click={updateUser}
          placeholder={"Atualizar Informações"}
        />
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

  const AddressRegister = () => {
    return (
      <div className="page-address-container">
        <span>
          <label>Nome</label>
          <Input
            state={newAddress}
            setState={setNewAddress}
            name="name"
            value={newAddress?.name}
            placeholder={"nome..."}
            width="100%"
            padding={"1rem"}
          />
        </span>

        <span>
          <label>Email</label>
          <Input
            state={newAddress}
            setState={setNewAddress}
            name="address"
            value={newAddress?.address}
            placeholder={"email..."}
            width="100%"
            padding={"1rem"}
          />
        </span>

        <span>
          <label>CPF</label>
          <Input
            state={newAddress}
            setState={setNewAddress}
            name="cep"
            value={newAddress?.cep}
            placeholder={"CPF..."}
            width="100%"
            padding={"1rem"}
          />
        </span>

        <span>
          <label>Senha</label>
          <Input
            state={newAddress}
            setState={setNewAddress}
            name="city"
            value={newAddress?.city}
            placeholder={"senha..."}
            width="100%"
            padding={"1rem"}
          />
        </span>

        <span>
          <label>Senha</label>
          <Input
            state={newAddress}
            setState={setNewAddress}
            name="complement"
            value={newAddress?.complement}
            placeholder={"senha..."}
            width="100%"
            padding={"1rem"}
          />
        </span>

        <span>
          <label>Senha</label>
          <Input
            state={newAddress}
            setState={setNewAddress}
            name="number"
            value={newAddress?.number}
            placeholder={"senha..."}
            width="100%"
            padding={"1rem"}
          />
        </span>

        <span>
          <label>Senha</label>
          <Input
            state={newAddress}
            setState={setNewAddress}
            name="state"
            value={newAddress?.state}
            placeholder={"senha..."}
            width="100%"
            padding={"1rem"}
          />
        </span>
        <section>
          <Button click={updateUser} placeholder={"Excluir"} />
          <Button click={updateUser} placeholder={"Atualizar Informações"} />
        </section>
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
      {page === 2 && newAddress.name !== null && <AddressRegister />}
    </div>
  );
};

export default UserPage;
