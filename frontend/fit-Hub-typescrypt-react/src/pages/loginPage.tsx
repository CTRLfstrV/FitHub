function loginPage() {
  return (
    <section className="text-white flex justify-center items-center h-screen">
      <div className="mx-auto max-w-md mt-30 p-10 h-170 overflow-hidden rounded-xl md:max-w-2xl shadow-2xl gap-5">
        <div className="flex justify-center items-center flex-col">
          <img
            className="h-auto w-full object-cover"
            src="/img/primary-logo.svg"
            alt="FitHub logo"
          />
        </div>

        <div>
          <form className="mt-8 p-10 display: flex flex-col items-center justify-center gap-1 w-full">
            <div className="mb-4">
              <input
                type="email"
                placeholder="Seu email ou CPF"
                className="rounded-lg border text-black placeholder:text-gray-500 font-mono border-gray-300 w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-400"
              />
            </div>
            <div className="mb-4 display: flex flex-row items-center justify-center">
              <input
                type="password"
                placeholder="Sua senha"
                className="rounded-lg border text-black placeholder:text-gray-500 font-mono border-gray-300 w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-400"
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default loginPage;
