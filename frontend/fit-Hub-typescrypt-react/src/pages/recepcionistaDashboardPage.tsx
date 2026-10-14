import { useNavigate } from "react-router-dom";
import { RedirecionadorService } from "../services/RedirecionadorService";
import { VerificacaoSessaoService } from "../services/VerificacaoSessaoService";

function RecepcionistaDashBoardPage() {
  const redirecionadorService: RedirecionadorService = new RedirecionadorService(new VerificacaoSessaoService());
  redirecionadorService.RedirecionaPorSessao(useNavigate());

  return <h1>Ola</h1>;
}

export default RecepcionistaDashBoardPage;
