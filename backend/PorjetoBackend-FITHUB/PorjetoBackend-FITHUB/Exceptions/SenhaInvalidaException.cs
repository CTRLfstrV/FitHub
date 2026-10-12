using System;

namespace PorjetoBackend_FITHUB.Exceptions
{
    public class SenhaInvalidaException : ApplicationException
    {
        public SenhaInvalidaException(string message) : base(message) { }
    }
}
