using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Merchandiser
{
    public class DatabaseContext : DbContext
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
        }

        public DbSet<Merchandise> Merchandise { get; set; }
        //public DbSet<Provider> Providers { get; set; }
    }
}