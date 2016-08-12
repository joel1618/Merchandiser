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
        static DatabaseContext()
        {
            // Prevent attempt to initialize a database for this context
            //Database.SetInitializer<DatabaseContext>(null);
        }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            //modelBuilder.Configurations.Add(new ConflictDtoConfiguration());
        }

        public DbSet<Company> Company { get; set; }
        public DbSet<CompanyUser> CompanyUser { get; set; }
    }
}