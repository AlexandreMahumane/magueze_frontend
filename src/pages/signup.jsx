import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/index.";
import { SignupInputs } from "../components/forms/signupInputs";

export const Signup = () => {


  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url("src/assets/signup.png")' }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
<SignupInputs/>
      </div>
    </div>
  );
};
