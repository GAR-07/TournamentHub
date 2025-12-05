using TournamentHub.Domain.Entities;

namespace TournamentHub.Persistence.Seed
{
    public static class RoleSeeder
    {
        public static async Task SeedAsync(ApplicationDbContext db)
        {
            if (!db.Roles.Any())
            {
                var roles = new List<Role>
            {
                new Role("User"),
                new Role("Admin")
            };

                db.Roles.AddRange(roles);
                await db.SaveChangesAsync();
            }
        }
    }
}
