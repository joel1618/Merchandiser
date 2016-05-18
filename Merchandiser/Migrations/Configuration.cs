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
                    context.SaveChanges();
                    context.Database.Connection.Close();
                }
            }
        }
    }
}
