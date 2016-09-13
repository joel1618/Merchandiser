using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Merchandiser.Repositories
{
    public class AspNetRoleRepository
    {
        MerchandiserEntities context;
        public AspNetRoleRepository()
        {
            this.context = new MerchandiserEntities();
        }

        public IQueryable<AspNetRole> Search()
        {
            return context.AspNetRoles;
        }
    }
}