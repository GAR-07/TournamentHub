using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TournamentHub.Domain.Entities;

namespace TournamentHub.Persistence.Configurations
{
    public class AccountConfiguration : IEntityTypeConfiguration<Account>
    {
        public void Configure(EntityTypeBuilder<Account> builder)
        {
            builder.HasKey(u => u.Id);
            builder.Property(u => u.UserName)
                .IsRequired()
                .HasMaxLength(50);
            builder.Property(u => u.Email)
                .IsRequired()
                .HasMaxLength(255);
            builder.Property<string>("PasswordHash")
               .IsRequired()
               .HasColumnName("PasswordHash");
            builder.HasOne(a => a.Role)
                .WithMany(r => r.Accounts);
            builder.HasOne(a => a.Profile)
                .WithOne(p => p.Account)
                .HasForeignKey<Profile>(p => p.AccountId);
        }
    }
}
