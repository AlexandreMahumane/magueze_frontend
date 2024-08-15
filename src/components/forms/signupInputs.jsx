import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/index.";

export const SignupInputs = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/register", { name, password });

      const token = response.data.token;

      localStorage.setItem("authToken", token);
      console.log(token);
      navigate("/");
    } catch (error) {
      setError("O cadastro falhou. Verifique os dados e tente novamente.");
    }
  };
  return (
    <form
      onSubmit={handleSignup}
      className="bg-white p-8 rounded-lg shadow-lg w-1/2"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Cadastro
      </h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Nome Completo
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Digite seu nome"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Senha
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite sua senha"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Registrar
      </button>
    </form>
  );
};
