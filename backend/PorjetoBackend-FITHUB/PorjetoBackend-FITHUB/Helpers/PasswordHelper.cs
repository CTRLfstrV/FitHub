namespace PorjetoBackend_FITHUB.Helpers
{
    public static class PasswordHelper
    {
        public static string GerarHash(string senhaBase)
        {
            return BCrypt.Net.BCrypt.HashPassword(senhaBase);
        }

        public static bool VerificarHash(string senhaSalva, string senhaDigitada)
        {
            return BCrypt.Net.BCrypt.Verify(senhaDigitada, senhaSalva);
        }
    }
}
