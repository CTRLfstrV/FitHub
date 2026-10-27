import type { MatriculaDTO } from "../../types/matricula/MatriculaDTO";
import type { GlobalValidation } from "../../validations/globalValidation";

export class MatriculaService {
  private readonly urlBase: string = "http://localhost:63367/api/matricula";
  private readonly validation: GlobalValidation;

  constructor(cpfValidation: GlobalValidation) {
    this.validation = cpfValidation;
  }

  async MatricularAluno(matricula: MatriculaDTO): Promise<string> {
    this.validation.validacaoGlobal(matricula);

    const resposta = await fetch(this.urlBase, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        aluno: matricula.aluno,
        contrato: matricula.contrato,
        pagamento: matricula.pagamento,
      }),
    });

    if (!resposta.ok) {
      let mensagem =
        resposta.status === 404 ? "A requisição falhou" : "Falha inesperada";

      try {
        const erro = await resposta.text();

        mensagem = erro;
      } catch {
        // Mantém a mensagem padrão se o corpo não for JSON válido.
      }

      throw new Error(mensagem);
    }

    return "Matrícula concluída com êxito.";
  }
}
