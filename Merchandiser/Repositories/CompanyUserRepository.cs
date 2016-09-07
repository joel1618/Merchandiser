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

        public IQueryable<User> Search()
        {
            return context.Users;
        }

        public User Get(Guid id)
        {
            return context.Users.Find(id);
        }

        public User Create(User item)
        {
            item.Id = Guid.NewGuid();
            item.Created = DateTime.UtcNow;
            context.Users.Add(item);
            context.SaveChanges();
            return item;
        }

        public User Update(Guid id, User item)
        {
            var entity = context.Users.Find(id);
            entity.Modified = DateTime.UtcNow;
            context.SaveChanges();
            return entity;
        }

        public void Delete(Guid id)
        {
            var item = new User { Id = id };
            context.Users.Attach(item);
            context.Users.Remove(item);
            context.SaveChanges();
        }
    }
}