import { useEffect, useRef } from "react";
import type { PlanoCadastroDTO } from "../../../../types/financeiro/plano/PlanoCadastroDTO";
import type { PlanoResponseDTO } from "../../../../types/financeiro/plano/PlanoResponseDTO";
import FormularioCadastroPlano from "./FormularioCadastroPlano";

type ModalCadastroPlanoProps = {
  onFechar: () => void;
  onSalvar: (plano: PlanoCadastroDTO) => Promise<void>;
  plano?: PlanoResponseDTO;
};

function ModalCadastroPlano({ onFechar, onSalvar, plano }: ModalCadastroPlanoProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const editando = Boolean(plano);

  useEffect(() => {
    const dialogo = dialogRef.current;
    if (dialogo && !dialogo.open) dialogo.showModal();

    return () => {
      if (dialogo?.open) dialogo.close();
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="titulo-cadastro-plano"
      aria-describedby="descricao-cadastro-plano"
      onCancel={(event) => {
        event.preventDefault();
        onFechar();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onFechar();
      }}
      className="modal-cadastro-plano m-auto w-[calc(100%-2rem)] max-w-lg p-0 text-left"
    >
      <div className="relative overflow-hidden border-b border-[#e9eee4] bg-[radial-gradient(ellipse_at_top_left,_rgba(163,205,129,0.24),_transparent_65%),linear-gradient(135deg,_#f7faf3,_#ffffff_78%)] px-6 pb-6 pt-7 sm:px-8 sm:pb-7 sm:pt-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#245b37] text-white shadow-[0_8px_18px_rgba(36,91,55,0.2)]">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="h-6 w-6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
            <div className="pt-0.5">
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#4d8052]">
                Gestão de planos
              </span>
              <h2
                id="titulo-cadastro-plano"
                className="mt-1 text-2xl font-bold tracking-tight text-[#20291f]"
              >
                {editando ? "Editar plano" : "Novo plano"}
              </h2>
              <p
                id="descricao-cadastro-plano"
                className="mt-1 max-w-sm text-sm leading-6 text-[#697565]"
              >
                {editando
                  ? "Atualize o nome ou o valor deste plano."
                  : "Preencha os dados essenciais para adicionar um plano."}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onFechar}
            aria-label="Fechar formulário de plano"
            className="grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full border border-[#e1e8db] bg-white/80 text-[#667262] transition hover:border-[#cbd9c3] hover:bg-white hover:text-[#263c2b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
      </div>

      <FormularioCadastroPlano
        onCancelar={onFechar}
        onSalvar={onSalvar}
        planoInicial={plano}
      />
    </dialog>
  );
}

export default ModalCadastroPlano;
