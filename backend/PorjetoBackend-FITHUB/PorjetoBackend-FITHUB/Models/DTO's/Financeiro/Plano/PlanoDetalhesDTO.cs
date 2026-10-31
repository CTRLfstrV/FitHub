using System.Collections.Generic;

namespace PorjetoBackend_FITHUB.Models.DTO_s.Financeiro.Plano
{
    public record PlanoDetalhesDTO
    {
        public string Nome { get; set; }
        public decimal Valor { get; set; }
        public List<ContratoDetalhesPlanoDTO> Contratos { get; set; }

        public PlanoDetalhesDTO(string nome, decimal valor, List<ContratoDetalhesPlanoDTO> contratos)
        {
            Nome = nome;
            Valor = valor;
            Contratos = contratos;
        }
    }
}