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

        public Company Get(Guid id)
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

        public Company Update(Guid id, Company item)
        {
            var entity = context.Companies.Find(id);
            entity.Modified = DateTime.UtcNow;
            context.SaveChanges();
            throw new NotImplementedException();
        }

        public void Delete(Guid id)
        {
            var item = new Company { Id = id };
            context.Companies.Attach(item);
            context.Companies.Remove(item);
            context.SaveChanges();
        }
    }
}