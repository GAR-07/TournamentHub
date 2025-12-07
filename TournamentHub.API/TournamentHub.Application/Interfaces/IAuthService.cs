using TournamentHub.Application.DTO;
using TournamentHub.Domain.Entities;

namespace TournamentHub.Application.Interfaces
{
    public interface IAuthService
    {
        Task<Account> RegisterAsync(AccountRequestRegister request, CancellationToken ct);
        Task<Account> LoginAsync(AccountRequestLogin request, CancellationToken ct);
        Task ChangePasswordAsync(Guid accountId, ChangePasswordRequest request, CancellationToken ct);
    }
}