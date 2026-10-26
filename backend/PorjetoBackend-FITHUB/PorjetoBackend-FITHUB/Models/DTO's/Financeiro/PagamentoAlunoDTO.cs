using System;
using System.Collections.Generic;

namespace PorjetoBackend_FITHUB.Models.DTO_s.Financeiro
{
    public record PagamentoAlunoDTO
    {
        public string NomeAluno { get; set; }
        public string NomePlano { get; set; }
        public DateTime DataInicioContrato { get; set; }
        public DateTime DataTerminoContrato { get; set; }
        public decimal ValorContrato { get; set; }
        public List<PagamentoListagemDTO> Pagamentos { get; set; }

        public PagamentoAlunoDTO(string nomeAluno, string nomePlano, DateTime dataInicioContrato, DateTime dataTerminoContrato, decimal valorContrato, List<PagamentoListagemDTO> pagamentos)
        {
            NomeAluno = nomeAluno;
            NomePlano = nomePlano;
            DataInicioContrato = dataInicioContrato;
            DataTerminoContrato = dataTerminoContrato;
            ValorContrato = valorContrato;
            Pagamentos = pagamentos;
        }
    }
}
