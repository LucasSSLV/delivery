import { useState } from "react";

export default function authServices() {
  const [authLoading, setAuthLoading] = useState(false);
  const url = "http://localhost:3001/auth";

  //aqui tenho a função login que recebe um formData
  const login = (formData) => {
    //aqui eu seto o estado de authLoading para true
    setAuthLoading(true);

    //aqui eu faço uma requisição para a rota /login com method POST
    fetch(`${url}/login`, {
      method: "POST",
      headers: {
        //aqui eu passo o Content-Type como application/json
        "Content-Type": "application/json",
        //aqui eu passo o Access-Control-Allow-Origin como * e assim evitar interferência de CORS
        "Access-Control-Allow-Origin": "*",
      },
      //aqui eu passo o corpo da requisição como um JSON.stringfy do formData
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        //aqui eu seto o estado de authLoading para false
        setAuthLoading(false);
      });
  };
  const logout = () => {};

  //aqui tenho a função signup que recebe um formData e seta o estado de authLoading para true
  const signup = (formData) => {
    setAuthLoading(true);

    //aqui eu faço uma requisição para a rota /login com method POST
    fetch(`${url}/signup`, {
      method: "POST",
      headers: {
        //aqui eu passo o Content-Type como application/json
        "Content-Type": "application/json",
        //aqui eu passo o Access-Control-Allow-Origin como * e assim evitar interferência de CORS
        "Access-Control-Allow-Origin": "*",
      },
      //aqui eu passo o corpo da requisição como um JSON.stringfy do formData
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        //aqui eu seto o estado de authLoading para false
        setAuthLoading(false);
      });
  };

  return { login, logout, signup, authLoading };
}
