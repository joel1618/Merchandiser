using Merchandiser.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace Merchandiser.Repositories
{
    public class UserRoleRepository
    {
        MerchandiserEntities context;
        public UserRoleRepository()
        {
            this.context = new MerchandiserEntities();
        }

        public IQueryable<AspNetUserRole> Search()
        {
            return context.AspNetUserRoles;
        }

        public AspNetUserRole Get(Guid id)
        {
            return context.AspNetUserRoles.Find(id);
        }

        public AspNetUserRole Create(AspNetUserRole item)
        {
            context.AspNetUserRoles.Add(item);
            context.SaveChanges();
            return item;
        }

        public void Delete(Guid id)
        {
            var item = new AspNetUserRole { Id = id };
            context.AspNetUserRoles.Attach(item);
            context.AspNetUserRoles.Remove(item);
            context.SaveChanges();
        }
    }
}