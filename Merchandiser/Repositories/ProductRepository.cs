using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Merchandiser.Repositories
{
    public class ProductRepository
    {
        MerchandiserEntities context;
        public ProductRepository()
        {
            this.context = new MerchandiserEntities();
        }

        public IQueryable<Product> Search()
        {
            return context.Products;
        }

        public Product Get(Guid id)
        {
            return context.Products.Find(id);
        }

        public Product Create(Product item)
        {
            item.Id = Guid.NewGuid();
            item.Created = DateTime.UtcNow;
            context.Products.Add(item);
            context.SaveChanges();
            return item;
        }

        public Product Update(Guid id, Product item)
        {
            var entity = context.Products.Find(id);
            entity.Name = item.Name;
            entity.Modified = DateTime.UtcNow;
            context.SaveChanges();
            return entity;
        }

        public void Delete(Guid id)
        {
            var item = Get(id);
            if (item != null)
            {
                context.Products.Remove(item);
            };
            context.SaveChanges();
        }
    }
}