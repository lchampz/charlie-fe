import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFound from "./pages/404";
import Products from "./pages/Products";

const AppRoutes = () => {
  const routes = [
    { path: "/", name: "Login", element: <Login /> },
    { path: "/home", name: "Home", element: <Home /> },
    { path: "/products", name: "Produtos", element: <Products /> },
    { path: "*", name: "NotFound", element: <NotFound /> },
  ];

  return (
    <Routes>
      {routes.map(({ path, element, name }) => (
        <Route key={name} path={path} element={element} />
      ))}
      
    </Routes>
  );
};

export default AppRoutes;
