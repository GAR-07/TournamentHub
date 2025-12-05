using TournamentHub.Domain.Entities;

namespace TournamentHub.Application.Interfaces
{
    public interface IJwtProvider
    {
        string Generate(Account account);
    }
}
