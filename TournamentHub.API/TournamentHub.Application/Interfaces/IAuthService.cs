using TournamentHub.Domain.Entities;
using TournamentHub.Shared.DTO;

namespace TournamentHub.Application.Interfaces
{
    public interface IAuthService
    {
        Task<Account> RegisterAsync(AccountRequestRegister request, CancellationToken ct);
        Task<Account> LoginAsync(AccountRequestLogin request, CancellationToken ct);
    }
}