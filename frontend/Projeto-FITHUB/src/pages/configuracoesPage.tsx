import CabecalhoConfiguracoes from "../components/configuracoes-usuarios/CabecalhoConfiguracoes";
import DadosPessoaisConfiguracoes from "../components/configuracoes-usuarios/DadosPessoaisConfiguracoes";
import RedefinicaoSenhaConfiguracoes from "../components/configuracoes-usuarios/RedefinicaoSenhaConfiguracoes";

function ConfiguracoesPage() {
  return (
    <div className="min-h-full">
      <section className="min-w-0 flex-1 px-4 py-6 sm:px-7 sm:py-8 lg:px-10 lg:py-10">
        <div className="mx-auto w-full max-w-[1160px]">
          <CabecalhoConfiguracoes />
          <div className="grid gap-5 sm:gap-6">
            <DadosPessoaisConfiguracoes />
            <RedefinicaoSenhaConfiguracoes />
          </div>
        </div>
      </section>
    </div>
  );
}

export default ConfiguracoesPage;
