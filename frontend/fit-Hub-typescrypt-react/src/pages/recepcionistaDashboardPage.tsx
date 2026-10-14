import { useNavigate } from "react-router-dom";
import { RedirecionadorService } from "../services/RedirecionadorService";
import { VerificacaoSessaoService } from "../services/VerificacaoSessaoService";
import RecepcionistaSideBar from "../components/recepcionistaSideBar";

function RecepcionistaDashBoardPage() {
  const redirecionadorService: RedirecionadorService =
    new RedirecionadorService(new VerificacaoSessaoService());
  redirecionadorService.RedirecionaPorSessao(useNavigate());

  return (
    <div className="flex min-h-full flex-col md:flex-row">
      <RecepcionistaSideBar />
      <section className="flex-1 p-6 md:p-10">
        <h1>Ola</h1>
      </section>
    </div>
  );
}

export default RecepcionistaDashBoardPage;
