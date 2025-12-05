using Microsoft.EntityFrameworkCore;
using TournamentHub.Application.Interfaces;
using TournamentHub.Domain.Entities;

namespace TournamentHub.Persistence.Repositories
{
    public class RoleRepository : IRoleRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public RoleRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task AddAsync(Role role)
        {
            await _dbContext.Roles.AddAsync(role);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<Role> GetByIdAsync(Guid id)
        {
            return await _dbContext.Roles.FirstOrDefaultAsync(x => x.Id == id) 
                ?? throw new Exception($"Ничего не найдено");
        }

        public async Task<Role> GetByNameAsync(string name)
        {
            return await _dbContext.Roles.FirstOrDefaultAsync(x => x.Name == name)
                ?? throw new Exception($"Ничего не найдено");
        }

        public async Task<IEnumerable<Role>> GetAllAsync()
        {
            return await _dbContext.Roles.ToListAsync();
        }
    }
}
