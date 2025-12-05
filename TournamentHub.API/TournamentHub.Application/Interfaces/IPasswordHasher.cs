using Microsoft.AspNetCore.Identity;

namespace TournamentHub.Application.Interfaces
{
    public interface IBCryptPasswordHasher
    {
        string Hash(string password);
        bool Verify(string password, string hashedPassword);
    }
}
