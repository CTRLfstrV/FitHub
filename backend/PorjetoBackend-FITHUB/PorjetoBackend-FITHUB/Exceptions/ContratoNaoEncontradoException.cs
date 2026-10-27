using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PorjetoBackend_FITHUB.Exceptions
{
    public class ContratoNaoEncontradoException : ApplicationException
    {
        public ContratoNaoEncontradoException()
        { 
        }
        public ContratoNaoEncontradoException(string message) : base(message)
        {
        }
    }
}
