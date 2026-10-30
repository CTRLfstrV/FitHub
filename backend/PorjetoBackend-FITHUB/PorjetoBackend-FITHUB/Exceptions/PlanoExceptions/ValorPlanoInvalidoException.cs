using System;

namespace PorjetoBackend_FITHUB.Exceptions.PlanoExceptions
{
    public class ValorPlanoInvalidoException : ApplicationException
    {
        public ValorPlanoInvalidoException()
        {
        }

        public ValorPlanoInvalidoException(string message) : base(message)
        {
        }
    }
}