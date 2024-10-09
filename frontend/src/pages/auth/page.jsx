import { useState } from "react";
import { Button, TextField } from "@mui/material";
import styles from "./page.module.css";
import authServices from "../../services/auth";

export default function Auth() {
  const [formType, setFormType] = useState("login");
  const [formData, setFormData] = useState(null);
  const { login, signup, authLoading } = authServices();

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
        signup(formData);
        if (formData.password !== formData.confirmPassword) {
          alert("senhas não são iguais");
        }
        break;
    }
  };

  if (formType === "login") {
    return (
      //aqui tenho o formulário de login
      <div className={styles.authContainer}>
        <h1>Login</h1>
        {/*aqui tenho o botão que chama a função handleFormType */}
        <button onClick={handleFormType}>entrar</button>
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
      </div>
    );
  }

  if (formType === "signup") {
    return (
      //aqui tenho o formulário de cadastro
      <div className={styles.authContainer}>
        <h1>Signup</h1>
        <button onClick={handleFormType}>criar uma conta</button>
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
      </div>
    );
  }
}
