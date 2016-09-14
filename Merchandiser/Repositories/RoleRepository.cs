using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Merchandiser.Repositories
{
    public class RoleRepository
    {
        MerchandiserEntities context;
        public RoleRepository()
        {
            this.context = new MerchandiserEntities();
        }

        public IQueryable<AspNetRole> Search()
        {
            return context.AspNetRoles;
        }
    }
}