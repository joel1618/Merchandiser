using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Merchandiser.Repositories
{
    public class CompanyUserRepository
    {
        MerchandiserEntities context;
        public CompanyUserRepository()
        {
            this.context = new MerchandiserEntities();
        }

        public IQueryable<CompanyUser> Search()
        {
            return context.CompanyUsers;
        }

        public CompanyUser Get(Guid id)
        {
            return context.CompanyUsers.Find(id);
        }

        public CompanyUser Create(CompanyUser item)
        {
            item.Id = Guid.NewGuid();
            item.Created = DateTime.UtcNow;
            context.CompanyUsers.Add(item);
            context.SaveChanges();
            return item;
        }

        public CompanyUser Update(Guid id, CompanyUser item)
        {
            var entity = context.CompanyUsers.Find(id);
            entity.Modified = DateTime.UtcNow;
            context.SaveChanges();
            return entity;
        }

        public void Delete(Guid id)
        {
            var item = new CompanyUser { Id = id };
            context.CompanyUsers.Attach(item);
            context.CompanyUsers.Remove(item);
            context.SaveChanges();
        }
    }
}