import { useState, type InputHTMLAttributes } from "react";

type CampoSenhaProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  className: string;
  classNameContainer?: string;
};

function CampoSenha({
  className,
  classNameContainer = "",
  ...props
}: CampoSenhaProps) {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  return (
    <div className={`relative ${classNameContainer}`}>
      <input
        {...props}
        className={`${className} pr-12`}
        type={mostrarSenha ? "text" : "password"}
      />
      <button
        type="button"
        className="absolute inset-y-0 right-2 inline-flex w-10 items-center justify-center rounded-md text-[#687064] transition-colors hover:text-[#30372d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
        aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
        aria-pressed={mostrarSenha}
        onClick={() => setMostrarSenha((visivel) => !visivel)}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          className="h-5 w-5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {mostrarSenha ? (
            <>
              <path d="m3 3 18 18" />
              <path d="M10.6 5.1A10.8 10.8 0 0 1 12 5c6.4 0 10 7 10 7a15.5 15.5 0 0 1-3.1 3.8" />
              <path d="M6.2 6.2C3.5 8 2 12 2 12s3.6 7 10 7c1.2 0 2.3-.3 3.3-.7" />
              <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
            </>
          ) : (
            <>
              <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
              <circle cx="12" cy="12" r="3" />
            </>
          )}
        </svg>
      </button>
    </div>
  );
}

export default CampoSenha;
