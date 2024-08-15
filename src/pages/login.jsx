import React from "react";
import { Link } from "react-router-dom";
import { Forms } from "../components/forms/loginInputs";

export const Login = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen w-screen"
      style={{ backgroundImage: 'url("src/assets/Login.jpg")' }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        

        <Forms />

        <p className="text-center text-gray-600 text-sm mt-4">
          Não tem uma conta?{" "}
          <Link
            to={"/signup"}
            className="text-blue-500 hover:text-blue-800 font-bold"
          >
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
};
