﻿using Merchandiser.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
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
            item.Id = Guid.NewGuid();
            item.Company = context.Companies.Find(item.CompanyId);
            item.Customer = context.Customers.Find(item.CustomerId);
            item.AspNetRole = context.AspNetRoles.Find(item.RoleId);
            item.AspNetUser = context.AspNetUsers.Find(item.UserId);
            context.AspNetUserRoles.Add(item);
            context.SaveChanges();
            return item;
        }

        public void Delete(Guid id)
        {
            var item = Get(id);
            if (item != null)
            {
                context.AspNetUserRoles.Remove(item);
            };
            context.SaveChanges();
        }
    }
}