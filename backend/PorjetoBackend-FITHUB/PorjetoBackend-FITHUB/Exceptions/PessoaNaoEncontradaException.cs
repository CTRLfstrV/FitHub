using System;

namespace PorjetoBackend_FITHUB.Exceptions
{
    public class PessoaNaoEncontradaException : ApplicationException
    {
        public PessoaNaoEncontradaException(string message) : base(message)
        {
        }
    }
}