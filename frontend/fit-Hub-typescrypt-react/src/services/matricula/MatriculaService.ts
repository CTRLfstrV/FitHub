import type { MatriculaDTO } from "../../types/matricula/MatriculaDTO";
import type { GlobalValidation } from "../../validations/globalValidation";

export class MatriculaService {
  private readonly urlBase: string = "http://192.168.2.110:63367/api/matricula";
  private readonly validation: GlobalValidation;

  constructor(cpfValidation: GlobalValidation){
    this.validation = cpfValidation;
  }
  async MatricularAluno(matricula: MatriculaDTO) {
    this.validation.validacaoGlobal(matricula);
  }
}
