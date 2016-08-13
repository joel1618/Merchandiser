using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Merchandiser.Repositories
{
    public class CustomerRepository
    {
        MerchandiserEntities context;
        public CustomerRepository()
        {
            this.context = new MerchandiserEntities();
        }

        public IQueryable<Customer> Search()
        {
            return context.Customers;
        }

        public Customer Get(Guid id)
        {
            return context.Customers.Find(id);
        }

        public Customer Create(Customer item)
        {
            item.Id = Guid.NewGuid();
            item.Created = DateTime.UtcNow;
            context.Customers.Add(item);
            context.SaveChanges();
            return item;
        }

        public Customer Update(Guid id, Customer item)
        {
            var entity = context.Customers.Find(id);
            entity.Name = item.Name;
            entity.Modified = DateTime.UtcNow;
            context.SaveChanges();
            return entity;
        }

        public void Delete(Guid id)
        {
            var item = new Customer { Id = id };
            context.Customers.Attach(item);
            context.Customers.Remove(item);
            context.SaveChanges();
        }
    }
}