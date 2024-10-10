import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authServices from "../../services/auth";

export default function Profile() {
  const { logout } = authServices();
  const navigate = useNavigate();
  const authData = JSON.parse(localStorage.getItem("auth"));

  //aqui eu verifico se o authData é falso
  useEffect(() => {
    //aqui eu chamo a função navigator que redireciona para a página de autenticação
    if (!authData) {
      //aqui eu chamo a função navigate que redireciona para a página de autenticação pois o authData é falso
      return navigate("/auth");
    }
  }, [authData]);

  const handleLogout = () => {
    logout();
    return navigate("/");
  };

  return (
    <>
      <h1>{authData?.user?.fullname}</h1>;<h3>{authData?.user?.email}</h3>;
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}
