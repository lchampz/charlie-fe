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
import { useNavigate } from "react-router-dom";

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
  {
    icon: Brush,
    title: "Meus Pedidos",
    subtitle: "Acompanhar o status dos meus pedidos.",
    id: 3,
  },
];

const UserPage = () => {
  const { user, getUserInfo, token, handleLogout } = useAuth();
  const addToast = useToast();
  const [page, setPage] = useState(0);
  const [userInfo, setUserInfo] = useState({
    name: "",
    cpf: "",
    email: "",
    pass: "",
  });
  const [newAddress, setNewAddress] = useState({
    id: "",
    name: null,
    address: "",
    number: "",
    complement: "",
    cep: "",
    city: "",
    state: "",
    userId: user.id
  });
  const [address, setAddress] = useState([]);
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState(null);
  const [modalOrder, setModalOrder] = useState(false);
  const navigate = useNavigate();

  const service = UserService();

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

    const ordersResponse = await service.GetOrders(token);
    setOrders(ordersResponse.data);
    console.log(ordersResponse.data);
  };

  useEffect(() => {
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
    getData();
  };

  const updateAddress = async () => {
    try {
      const response = await service.UpdateAddress(newAddress, token);
      if (response)
        addToast(response.data, response.error ? "fail" : "success");
    } catch (err) {
      addToast("Erro ao atualizar informações do endereço", "fail");
    }
    getData();
  };

  const registerNewAddress = async () => {
    try {
      const response = await service.CreateAddress(newAddress, token);
      if (response)
        addToast(response.data, response.error ? "fail" : "success");
    } catch (err) {
      addToast("Erro ao cadastrar novo endereço", "fail");
    }
    getData();
  }

  const deleteAddress = async () => {
    try {
      const response = await service.DeleteAddress(newAddress.id, token);
      if (response)
        addToast(response.data, response.error ? "fail" : "success");
    } catch (err) {
      addToast("Erro ao deletar endereço", "fail");
    }

    getData();
  }

  const handleChangePage = (id) => {
    setPage(id);
  };

  const handleSetOrder = (order) => {
    setOrder(order);
    setModalOrder(true);
  }

  const logoutAndRedirect = () => {
    handleLogout();
    navigate("/home");
  };

  const ModalOrder = () => {
    console.log(order.items)
    return (
      <div
        className="background-loading"
        style={{ backgroundColor: "rgba(0, 0, 0, .45)" }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h2>Pedido</h2>
            <span style={{cursor: "pointer"}} onClick={() => setModalOrder(false)}>X</span>
          </div>
          <div className="modal-body">
            <div className="modal-order-content">
              
                
                <span style={{ display: "flex", gap: "5px"}}>
                  <label>Endereço: </label>
                  <p>{order.order.endereco.ENDERECO_NOME}</p>
                </span>
              
              <div className="address-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Produto</th>
                      <th>Quantidade</th>
                      <th>Preço</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item, i) => (
                      <tr key={i}>
                        <td>{item.produto.PRODUTO_NOME}</td>
                        <td>{item.ITEM_QTD}</td>
                        <td>{item.ITEM_PRECO}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const PageAddress = () => {
    const renderAddress = () => {
      const settingAddressInfo = (id) => {
        const findAddress = address.find((item) => item.ENDERECO_ID === id);

        setNewAddress({
          id: findAddress.ENDERECO_ID,
          userId: findAddress.USUARIO_ID,
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
        id: "",
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
        <Button click={cleanUp} placeholder={"Adicionar Novo Endereço"} />
      </div>
    );
  };

  const PageOrders = () => {
    const renderOrders = () => {
      return orders.map((item, i) => (
        <tr key={i} onClick={() => handleSetOrder(item)}>
          <td>{item.order.PEDIDO_ID}</td>
          <td>{item.order.endereco.ENDERECO_NOME}</td>
          <td>
            <p
              style={{
                color: "white",
                backgroundColor: "#4E65BF",
                padding: "5px",
                borderRadius: "10px",
              }}
            >
              {item.order.status.STATUS_DESC}
            </p>
          </td>
          <td>{item.order.PEDIDO_DATA}</td>
        </tr>
      ));
    };

    return (
      <div className="address-wrapper">
        <table>
          <thead>
            <tr>
              <th>Pedido</th>
              <th>Endereço</th>
              <th>Status</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>{renderOrders()}</tbody>
        </table>
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
          <label>Logradouro</label>
          <Input
            state={newAddress}
            setState={setNewAddress}
            name="address"
            value={newAddress?.address}
            placeholder={"logradouro..."}
            width="100%"
            padding={"1rem"}
          />
        </span>

        <span>
          <label>CEP</label>
          <Input
            state={newAddress}
            setState={setNewAddress}
            name="cep"
            value={newAddress?.cep}
            placeholder={"CEP..."}
            width="100%"
            padding={"1rem"}
          />
        </span>

        <span>
          <label>Cidade</label>
          <Input
            state={newAddress}
            setState={setNewAddress}
            name="city"
            value={newAddress?.city}
            placeholder={"cidade..."}
            width="100%"
            padding={"1rem"}
          />
        </span>

        <span>
          <label>Complemento</label>
          <Input
            state={newAddress}
            setState={setNewAddress}
            name="complement"
            value={newAddress?.complement}
            placeholder={"complemento..."}
            width="100%"
            padding={"1rem"}
          />
        </span>

        <span>
          <label>Número</label>
          <Input
            state={newAddress}
            setState={setNewAddress}
            name="number"
            value={newAddress?.number}
            placeholder={"número..."}
            width="100%"
            padding={"1rem"}
          />
        </span>

        <span>
          <label>Estado</label>
          <Input
            state={newAddress}
            setState={setNewAddress}
            name="state"
            value={newAddress?.state}
            placeholder={"estado..."}
            width="100%"
            padding={"1rem"}
          />
        </span>
        <section>
          <Button click={deleteAddress} placeholder={"Excluir"} />
          <Button click={newAddress.id == "" || !newAddress.id ? registerNewAddress : updateAddress} placeholder={newAddress.id == "" || !newAddress.id ? "Adicionar Endereço" :"Atualizar Informações"} />
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
      case 3:
        return <PageOrders />;
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
            <div className="exit" onClick={logoutAndRedirect}>
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
      {modalOrder && ModalOrder(order)}
    </div>
  );
};

export default UserPage;
