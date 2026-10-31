using System;

namespace PorjetoBackend_FITHUB.Exceptions.PlanoExceptions
{
    public class PlanoNaoEncontradoException : ApplicationException
    {
        public PlanoNaoEncontradoException()
        {
        }

        public PlanoNaoEncontradoException(string message) : base(message)
        {
        }
    }
}