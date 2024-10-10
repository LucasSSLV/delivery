import { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import styles from "./page.module.css";
import authServices from "../../services/auth";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [formType, setFormType] = useState("login");
  const [formData, setFormData] = useState(null);
  const { login, signup, authLoading } = authServices();

  const navigate = useNavigate();
  const authData = JSON.parse(localStorage.getItem("auth"));

  //aqui eu verifico se o authData é falso
  useEffect(() => {
    //aqui eu chamo a função navigator que redireciona para a página de autenticação
    if (authData) {
      //aqui eu chamo a função navigate que redireciona para a página de autenticação pois o authData é falso
      return navigate("/profile");
    }
  }, [authData]);

  //aqui tenho a função handleFormType que muda o estado do formType
  const handleFormType = () => {
    setFormData(null);
    if (formType === "login") {
      setFormType("signup");
    } else {
      setFormType("login");
    }
  };

  //aqui tenho a função handleFormDataChange que muda o estado do formType
  const handleFormDataChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //aqui tenho a função handleSubmitForm que previne o comportamento padrão do formulário
  const handleSubmitForm = (e) => {
    e.preventDefault();
    switch (formType) {
      case "login":
        login(formData);
        break;
      case "signup":
        if (formData.password !== formData.confirmPassword) {
          alert("senhas não são iguais");
          return;
        }
        signup(formData);
        break;
    }
  };
  //aqui eu verifico se o authLoading é true
  if (authLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className={styles.authContainer}>
      {/* //aqui eu verifico se o formType é igual a login */}
      {formType === "login" ? (
        <>
          <h1>Login</h1>
          {/*aqui tenho o botão que chama a função handleFormType */}
          <button onClick={handleFormType}>Registrar novo usuário</button>
          <form onSubmit={handleSubmitForm}>
            {/* aqui tenho os campos/entradas email e password*/}
            <TextField
              required
              label="Email"
              type="email"
              name="email"
              onChange={handleFormDataChange}
            />
            <TextField
              required
              label="Password"
              type="password"
              name="password"
              onChange={handleFormDataChange}
            />

            {/* aqui o botão e tipo submit */}
            <Button type="submit">Login</Button>
          </form>
        </>
      ) : null}

      {formType === "signup" ? (
        //aqui tenho o formulário de cadastro
        <>
          <h1>Signup</h1>
          <button onClick={handleFormType}>Entrar</button>
          <form onSubmit={handleSubmitForm}>
            <TextField
              required
              label="/Fullname"
              type="text"
              name="fullname"
              onChange={handleFormDataChange}
            />
            <TextField
              required
              label="Email"
              type="email"
              name="email"
              onChange={handleFormDataChange}
            />
            <TextField
              required
              label="Password"
              type="password"
              name="password"
              onChange={handleFormDataChange}
            />
            <TextField
              required
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              onChange={handleFormDataChange}
            />
            <Button type="submit">Signup</Button>
          </form>
        </>
      ) : null}
    </div>
  );
}
