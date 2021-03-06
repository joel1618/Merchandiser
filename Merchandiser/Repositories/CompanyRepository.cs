﻿using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Merchandiser.Repositories
{
    public class CompanyRepository
    {
        MerchandiserEntities context;
        public CompanyRepository()
        {
            this.context = new MerchandiserEntities();
        }

        public IQueryable<Company> Search()
        {
            return context.Companies;
        }

        public Company Get(int id)
        {
            return context.Companies.Find(id);
        }

        public Company Create(Company item)
        {
            item.Created = DateTime.UtcNow;
            context.Companies.Add(item);
            context.SaveChanges();
            return item;
        }

        public Company Update(int id, Company item)
        {
            var entity = context.Companies.Find(id);
            entity.Name = item.Name;
            entity.Modified = DateTime.UtcNow;
            context.SaveChanges();
            return entity;
        }

        public void Delete(int id)
        {
            var item = Get(id);
            if (item != null)
            {
                context.Companies.Remove(item);
            };
            context.SaveChanges();
        }
    }
}