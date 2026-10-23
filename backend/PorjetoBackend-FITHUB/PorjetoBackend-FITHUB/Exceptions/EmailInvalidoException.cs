using System;

namespace PorjetoBackend_FITHUB.Exceptions
{
    public class EmailInvalidoException : ApplicationException
    {
        public EmailInvalidoException() { }
        public EmailInvalidoException(string message) : base(message) { }
    }
}