import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/index.";

export const Forms = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", { username, password });

      if (response.data && response.data.token) {
        const token = response.data.token;

        localStorage.setItem("authToken", token);
        console.log(token);

        navigate("/");
      } else {
        setError(
          "Login falhou. Usuário não encontrado ou credenciais incorretas."
        );
      }
    } catch (error) {
      setError("Login falhou. Verifique suas credenciais e tente novamente.");
    }
  };
  return (
    <form onSubmit={handleLogin}>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Digite seu username"
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          required
        />
      </div>

      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Senha
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite sua senha"
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          required
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={handleLogin}
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline"
        >
          Entrar
        </button>
      </div>
    </form>
  );
};
