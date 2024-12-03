import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFound from "./pages/404";
import Products from "./pages/Products";
import UserPage from "./pages/UserPage";
import Payout from "./pages/Payout";
import Contact from "./pages/Contact";
import QuemSomos from "./pages/QuemSomos";
import { useAuth } from "./hooks/useAuth";


const ProtectedRoute = ({ element }) => {
  const { token, user } = useAuth();

  return (token && user) ? element : <Navigate to="/login" replace />;
};

const GuestRoute = ({ element }) => {
  const { token, user } = useAuth();

  return !(token && user) ? element : <Navigate to="/home" replace />;
}

const AppRoutes = () => {
  const routes = [
    { path: "/", name: "Default", element: <Navigate to="/home" replace /> },
    { path: "/login", name: "Login", element: <GuestRoute element={<Login />} /> },
    { path: "/home", name: "Home", element: <Home /> },
    { path: "/contact", name: "Contato", element: <Contact /> },
    { path: "/quemsomos", name: "Quem Somos", element: <QuemSomos /> },
    // { path: "/quem-somos", name: "Quem Somos", element: <Quem-Somos /> },
    { path: "/products", name: "Produtos", element: <Products /> },
    { path: "/user", name: "Usuario", element: <ProtectedRoute element={<UserPage />} /> },
    { path: "/payout", name: "Pagamento", element: <ProtectedRoute element={<Payout />} /> },
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
