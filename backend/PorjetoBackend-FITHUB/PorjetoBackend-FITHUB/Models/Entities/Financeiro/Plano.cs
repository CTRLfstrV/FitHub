using System.Collections.Generic;
using PorjetoBackend_FITHUB.Exceptions.PlanoExceptions;
using PorjetoBackend_FITHUB.Models.DTO_s.Financeiro.Plano;

namespace PorjetoBackend_FITHUB.Models.Entities.Financeiro
{
    public class Plano
    {
        public int Id { get; private set; }
        
        private string _nome;
        public string Nome 
        {
            get
            {
                return _nome;
            }
            set
            {
                if (string.IsNullOrEmpty(value))
                    throw new NomePlanoInvalidoException("O nome plano não estar vazio");
                
                if (_nome != value)
                    _nome = value;
            }
            
        }
        
        private decimal _valor;
        public decimal Valor 
        {
            get
            {
                return _valor;
            }
            set
            {
                if (value <= 0)
                    throw new ValorPlanoInvalidoException("O valor deve ser maior que 0");
                
                if (_valor != value)
                    _valor = value;
            }
            
        }

        private int _quantidadeMeses;
        public int QuantidadeMeses 
        {
            get
            {
                return _quantidadeMeses;
            }
            set
            {
                if (value > 0 && _quantidadeMeses != value)
                    _quantidadeMeses = value;
            }
            
        }

        public List<Contrato> Contratos { get; set; }

        public Plano() { }

        public Plano(PlanoResponseDTO plano)
        {
            Nome = plano.Nome;
            Valor = plano.Valor;
            QuantidadeMeses = plano.QuantidadeMeses;
        }
    }
}
