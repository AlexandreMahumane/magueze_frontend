
export const Signup = () => {
    return (
      <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: 'url("src/assets/signup.png")' }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <form className="bg-white p-8 rounded-lg shadow-lg w-1/2">
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nome Completo</label>
              <input type="text" id="name" placeholder="Digite seu nome" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input type="email" id="email" placeholder="Digite seu email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Senha</label>
              <input type="password" id="password" placeholder="Digite sua senha" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Registrar</button>
          </form>
        </div>
      </div>
    );
  };
  