using System;

namespace PorjetoBackend_FITHUB.Exceptions
{
    public class StatusContratoInvalidoException : ApplicationException
    {
        public StatusContratoInvalidoException()
        {
        }

        public StatusContratoInvalidoException(string message) : base(message)
        {
        }
    }
}