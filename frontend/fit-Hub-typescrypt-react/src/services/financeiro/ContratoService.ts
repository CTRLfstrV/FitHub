import type { ContratoProximoVencimentoResponseDTO } from "../../types/financeiro/ContratoProximoVencimentoResponseDTO";

export class ContratoService{
    private readonly urlBase: string = "http://192.168.2.110:63367/api/contrato/";

    async ContratosProximosVencimento() : Promise<ContratoProximoVencimentoResponseDTO[]>{
        const url: string = this.urlBase + "vencimento-proximo";

        const resposta = await fetch(url, {
            method: "GET",
            credentials: "include"
        });

        if(!resposta.ok)
            throw new Error("Não foi possível pegar os contratos com vencimento próximo");

        const contratosVencimentoProximo: ContratoProximoVencimentoResponseDTO[] = await resposta.json();
        return contratosVencimentoProximo;
    }
}