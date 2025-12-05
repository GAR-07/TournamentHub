using BCrypt.Net;
using TournamentHub.Application.Interfaces;

namespace TournamentHub.Infrastructure.Security
{
    public class BCryptPasswordHasher : IBCryptPasswordHasher
    {
        public string Hash(string password)
        {
            return BCrypt.Net.BCrypt.EnhancedHashPassword(password, HashType.SHA512);
        }

        public bool Verify(string password, string hashedPassword)
        {
            return BCrypt.Net.BCrypt.EnhancedVerify(password, hashedPassword, HashType.SHA512);
        }
    }
}