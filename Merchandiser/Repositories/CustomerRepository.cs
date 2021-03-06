﻿using Microsoft.AspNet.Identity;
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

        public Customer Get(int id)
        {
            return context.Customers.Find(id);
        }

        public Customer Create(Customer item)
        {
            item.Created = DateTime.UtcNow;
            context.Customers.Add(item);
            context.SaveChanges();
            return item;
        }

        public Customer Update(int id, Customer item)
        {
            var entity = context.Customers.Find(id);
            entity.Name = item.Name;
            entity.Modified = DateTime.UtcNow;
            entity.IsSendReport = item.IsSendReport;
            entity.SendReport = item.SendReport;
            context.SaveChanges();
            return entity;
        }

        public void Delete(int id)
        {
            var item = Get(id);
            if (item != null)
            {
                context.Customers.Remove(item);
            };
            context.SaveChanges();
        }
    }
}