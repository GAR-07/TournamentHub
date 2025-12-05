using Microsoft.EntityFrameworkCore;
using TournamentHub.Application.Interfaces;
using TournamentHub.Domain.Entities;

namespace TournamentHub.Persistence.Repositories
{
    public class AccountRepository : IAccountRepository
    {
        private readonly ApplicationDbContext _dbContext;
        public AccountRepository(ApplicationDbContext dbContext) => _dbContext = dbContext;

        public async Task AddAsync(Account account, CancellationToken ct)
        {
            await _dbContext.Accounts.AddAsync(account);
            await _dbContext.SaveChangesAsync(ct);
        }

        public async Task UpdateAsync(Account account, CancellationToken ct)
        {
            _dbContext.Accounts.Update(account);
            await _dbContext.SaveChangesAsync(ct);
        }

        public Task<bool> ExistsByEmailAsync(string email, CancellationToken ct)
        {
            return _dbContext.Accounts.AnyAsync(x => x.Email == email, ct);
        }

        public async Task<Account> GetByIdAsync(Guid id, CancellationToken ct)
        {
            return await _dbContext.Accounts
                .Include(x => x.Role)
                .FirstOrDefaultAsync(x => x.Id == id, ct)
                ?? throw new Exception($"Ничего не найдено");
        }

        public async Task<Account> GetByEmailAsync(string email, CancellationToken ct)
        {
            return await _dbContext.Accounts
                .Include(x => x.Role)
                .FirstOrDefaultAsync(x => x.Email == email, ct)
                ?? throw new Exception($"Ничего не найдено");
        }
    }
}
