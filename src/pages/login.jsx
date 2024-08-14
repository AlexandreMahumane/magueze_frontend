import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    // Aqui você pode adicionar a lógica para enviar os dados ao servidor ou realizar outras ações.
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 bg-no-repeat w-screen h-screen">
      <div className="relative w-3/4 h-full bg-cover bg-center bg-[url('src/midia/Login.jpg')] flex items-center justify-end mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Login
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Digite seu email"
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                value={email}
                onChange={handleEmailChange}
              />
            </div>

            {/* Password Field */}
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
                placeholder="Digite sua senha"
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>

            {/* Login Button */}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline"
              >
                Entrar
              </button>
              <a
                href="#forgot-password"
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              >
                Esqueceu a senha?
              </a>
            </div>
          </form>

          {/* Signup Link */}
          <p className="text-center text-gray-600 text-sm mt-4">
            Não tem uma conta?{' '}
            <Link
              to={'/signup'}
              className="text-blue-500 hover:text-blue-800 font-bold"
            >
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;