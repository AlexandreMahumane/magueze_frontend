import { useState } from "react";

export const SearchInput = () => {
  const [searchCity, setSearchCity] = useState("");
  return (
    <div className="mb-4">
      <input
        type="text"
        value={searchCity}
        onChange={(e) => setSearchCity(e.target.value)}
        placeholder="Digite o nome da cidade"
        className="border border-gray-300 rounded p-2 w-full"
      />
      <button className="bg-green-500 text-white py-2 px-4 rounded mt-2 hover:bg-green-600">
        Pesquisar Cidade
      </button>
    </div>
  );
};
