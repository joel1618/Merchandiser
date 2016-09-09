using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.Data;
using System.Data.Entity.Migrations;
using System.Configuration;

namespace Merchandiser.Migrations
{
    public class Configuration : IDatabaseInitializer<MerchandiserEntities>
    {
        public void InitializeDatabase(MerchandiserEntities context)
        {
            using (context = new MerchandiserEntities())
            {
                if (!context.Database.Exists())
                {
                    context.Database.Create();
                    context.Database.Connection.Open();
                    AddRoles(context);
                    context.SaveChanges();
                    context.Database.Connection.Close();
                }
            }
        }

        public void AddRoles(MerchandiserEntities context)
        {
            context.AspNetRoles.Add(new AspNetRole() { Name = "Administrator" });
            context.AspNetRoles.Add(new AspNetRole() { Name = "Customer" });
            context.AspNetRoles.Add(new AspNetRole() { Name = "Data Entry" });
        }
    }
}
