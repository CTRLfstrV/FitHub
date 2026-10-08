function header(){
    return (
    <header className="bg-green-600 text-white flex justify-between items-center -m-10">
        <img
          className="size-48 -mt-4 -mb-13 ml-20"
          src="/img/Primary-logo.svg"
          alt="FitHub logo"
        ></img>
        <div className="flex grid grid-cols-4 mt-8 gap-3 justify-items-stretch mr-20">
          <a
            className="relative z-0 flex-auto overflow-hidden Text-lg mt-2 text-center font-bold text-white rounded-t-lg transition-transform duration-300 ease-in-out hover:scale-110 hover:text-green-800 before:absolute before:inset-x-0 before:bottom-0 before:z-[-1] before:h-0   before:bg-green-100 before:transition-all before:duration-300 before:ease-in-out hover:before:h-full"
            href="#"
          >
            Inicio
          </a>
          <a
            className="relative z-0 flex-auto overflow-hidden Text-lg mt-2 text-center font-bold text-white rounded-t-lg transition-transform duration-300 ease-in-out hover:scale-110 hover:text-green-800 before:absolute before:inset-x-0 before:bottom-0 before:z-[-1] before:h-0   before:bg-green-100 before:transition-all before:duration-300 before:ease-in-out hover:before:h-full"
            href="#"
          >
            Ver Planos
          </a>
          <button className="font-bold bg-white text-green-600 px-4 py-2 ml-3 mt-0 rounded-lg hover:bg-green-100 hover:scale-110 transition-transform duration-300 ease-in-out">
            Fazer Login
          </button>
        </div>
      </header>
    );
}

export default header