using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Merchandiser.Repositories
{
    public class ProductCategoryRepository
    {
        MerchandiserEntities context;
        public ProductCategoryRepository()
        {
            this.context = new MerchandiserEntities();
        }

        public IQueryable<ProductCategory> Search()
        {
            return context.ProductCategories;
        }

        public ProductCategory Get(int id)
        {
            return context.ProductCategories.Find(id);
        }

        public ProductCategory Create(ProductCategory item)
        {
            item.Created = DateTime.UtcNow;
            context.ProductCategories.Add(item);
            context.SaveChanges();
            return item;
        }

        public ProductCategory Update(int id, ProductCategory item)
        {
            var entity = context.ProductCategories.Find(id);
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
                context.ProductCategories.Remove(item);
            };
            context.SaveChanges();
        }
    }
}