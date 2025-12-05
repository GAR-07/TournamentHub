using TournamentHub.Domain.Entities;

namespace TournamentHub.Application.Interfaces
{
    public interface IRoleRepository
    {
        Task AddAsync(Role role);
        Task<Role> GetByIdAsync(Guid id);
        Task<Role> GetByNameAsync(string name);
        Task<IEnumerable<Role>> GetAllAsync();
    }
}