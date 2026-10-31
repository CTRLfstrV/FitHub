using System;

namespace PorjetoBackend_FITHUB.Exceptions.PlanoExceptions
{
    public class IdPlanoInvalidoException : ApplicationException
    {
        public IdPlanoInvalidoException()
        {
        }

        public IdPlanoInvalidoException(string message) : base(message)
        {
        }
    }
}