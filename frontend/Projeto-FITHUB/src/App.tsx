import HomeLayout from "./layouts/homeLayout.tsx";
import RecepcionistaLayout from "./layouts/recepcionistaLayout.tsx";
import LoginPage from "./pages/loginPage.tsx";
import HomePage from "./pages/homePage.tsx";
import RecepcionistaDashBoardPage from "./pages/recepcionista/recepcionistaDashboardPage.tsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RecepcionistaGerenciamentoAlunoPage from "./pages/recepcionista/recepcionistaGerenciamentoAlunoPage.tsx";
import RecepcionistaDetalhesAluno from "./pages/recepcionista/recepcionistaDetalhesAluno.tsx";
import RecepcionistaMatriculaPage from "./pages/recepcionista/recepcionistaMatriculaPage.tsx";
import ConfiguracoesPage from "./pages/configuracoesPage.tsx";
import RecepcionistaGerenciamentoPlano from "./pages/recepcionista/recepcionistaGerenciamentoPlano.tsx";

//http://localhost:4173/

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route element={<HomeLayout />}>
          <Route path="/home" element={<HomePage />} />
        </Route>
        <Route element={<RecepcionistaLayout />}>
          <Route
            path="/recepcionista/dashboard"
            element={<RecepcionistaDashBoardPage />}
          />
          <Route
            path="/recepcionista/gerenciamento-alunos"
            element={<RecepcionistaGerenciamentoAlunoPage />}
          />
          <Route
            path="/recepcionista/detalhes-aluno/:id"
            element={<RecepcionistaDetalhesAluno />}
          />
          <Route
            path="/recepcionista/matricular-aluno"
            element={<RecepcionistaMatriculaPage />}
          />
          <Route
            path="/recepcionista/planos"
            element={<RecepcionistaGerenciamentoPlano />}
          />
          <Route
            path="/recepcionista/configuracoes"
            element={<ConfiguracoesPage />}
          />
        </Route>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
