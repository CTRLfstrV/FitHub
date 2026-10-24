using System;

namespace PorjetoBackend_FITHUB.Exceptions.MatriculaExceptions
{
    public class DatasException : ApplicationException
    {
        public DatasException()
        {
        }

        public DatasException(string message) : base(message)
        {
        }
    }
}