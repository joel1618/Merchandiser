using Merchandiser.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Merchandiser
{
    internal class DatabaseContext : DbContext
    {
        public DatabaseContext()
           : base("BreezeMetadata")
        {
            // Prevent attempt to initialize a database for this context
            Database.SetInitializer<DatabaseContext>(null);
        }
        static DatabaseContext()
        {
            // Prevent attempt to initialize a database for this context
            Database.SetInitializer<DatabaseContext>(null);
        }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            //modelBuilder.Configurations.Add(new ConflictDtoConfiguration());
            //modelBuilder.Entity<AspNetUserRole>().HasKey(t => new { t.UserId, t.CompanyId, t.RoleId });
        }

        public DbSet<Company> Company { get; set; }
        public DbSet<CompanyViewModel> CompanyViewModel { get; set; }

        public DbSet<AspNetUserRole> AspNetUserRole { get; set; }
    }
}