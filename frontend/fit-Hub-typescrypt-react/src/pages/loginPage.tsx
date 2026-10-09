function loginPage() {
  return (
    <section className="text-black font-mono flex justify-center items-center h-screen w-full">
      <div className="mx-auto max-w-md mt-30 p-10 h-170 overflow-hidden rounded-xl md:max-w-2xl shadow-2xl gap-5 h-full flex flex-col justify-center items-center">
        <div className="flex justify-center items-center flex-col">
          <img
            className="h-auto w-full object-cover"
            src="/img/primary-logo.svg"
            alt="FitHub logo"
          />
          <h1 className="text-2xl text-center">
            Bem-vindo ao FitHub!
          </h1>
          <p className="text-gray-600 mt-2 text-center">
            Faça login para continuar
          </p>
        </div>

        <div>
          <form className="mt-8 p-5 display: flex flex-col items-center justify-center gap-1 w-full">
            <div className="mb-4">
              <input
                type="email"
                required
                placeholder="Seu email ou CPF"
                className="rounded-lg border placeholder:text-gray-500 border-gray-300 w-100 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-400"
              />
            </div>
            <div className="mb-4 display: flex flex-row items-center justify-center">
              <input
                type="password"
                required
                placeholder="Sua senha"
                className="rounded-lg border placeholder:text-gray-500 border-gray-300 w-100 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-400"
              />
            </div>
            <div className="mb-4 flex justify-center items-center w-full">
              <button id="login-btn" onClick={handleLogin} className="transition-transform duration-300 ease-in-out hover:scale-101 hover:bg-green-600 bg-green-500 text-white py-2 px-4 rounded-lg cursor-pointer w-100" type="submit">
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );

  function handleLogin(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    console.log("Login button clicked");
  }
}

export default loginPage;
