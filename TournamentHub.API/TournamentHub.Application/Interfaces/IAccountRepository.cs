using TournamentHub.Domain.Entities;

namespace TournamentHub.Application.Interfaces
{
    public interface IAccountRepository
    {
        Task AddAsync(Account account, CancellationToken ct);
        Task UpdateAsync(Account account, CancellationToken ct);
        Task<bool> ExistsByEmailAsync(string email, CancellationToken ct);
        Task<Account?> GetByIdAsync(Guid id, CancellationToken ct);
        Task<Account?> GetByEmailAsync(string email, CancellationToken ct);
    }
}