using PorjetoBackend_FITHUB.Exceptions.PlanoExceptions;

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
                if (value < 0)
                    throw new ValorPlanoInvalidoException("O valor deve ser maior que 0");
                
                if (_valor != value)
                    _valor = value;
            }
            
        }

        public Plano() { }
    }
}
