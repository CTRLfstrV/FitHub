import './App.css'

function App() {
  return (
    <>
    
    <header className="bg-green-600 text-white flex justify-between items-center -m-10">
      <img className="size-48 -mt-4 -mb-13 ml-20" src="/img/Primary-logo.svg" alt="FitHub logo"></img>
      <div className="flex grid grid-cols-5 mt-8 gap-4 justify-items-stretch mr-20">
      <a className="flex-auto Text-lg mt-2 text-center font-bold text-white hover:scale-110 transition-transform duration-300 ease-in-out" href="#">
        Inicio
      </a>
      <a className="flex-auto Text-lg mt-2 text-center font-bold text-white hover:scale-110 transition-transform duration-300 ease-in-out" href="#">
        Ver Planos
      </a>
      <a className="flex-auto Text-lg mt-2 text-center font-bold text-white hover:scale-110 transition-transform duration-300 ease-in-out" href="#">
        Configurações
      </a>
      <button className="bg-white text-green-600 px-4 py-2 ml-3 mt-0 rounded-lg hover:bg-green-100 hover:scale-110 transition-transform duration-300 ease-in-out">
        Fazer Login
      </button>
      <button className="bg-green-600 text-white px-4 py-2 ml-3 mt-0 rounded-lg hover:bg-green-700 hover:scale-110 transition-transform duration-300 ease-in-out">
        Cadastrar-se
      </button>
      </div>


    </header>

    
    </>
  )
}

export default App
