using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Merchandiser.Repositories
{
    public class ProductTypeHeaderRepository
    {
        MerchandiserEntities context;
        public ProductTypeHeaderRepository()
        {
            this.context = new MerchandiserEntities();
        }

        public IQueryable<ProductTypeHeader> Search()
        {
            return context.ProductTypeHeaders;
        }

        public ProductTypeHeader Get(int id)
        {
            return context.ProductTypeHeaders.Find(id);
        }

        public ProductTypeHeader Create(ProductTypeHeader item)
        {
            item.Created = DateTime.UtcNow;
            context.ProductTypeHeaders.Add(item);
            context.SaveChanges();
            return item;

        }

        public ProductTypeHeader Update(int id, ProductTypeHeader item)
        {
            var entity = context.ProductTypeHeaders.Find(id);
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
                context.ProductTypeHeaders.Remove(item);
            };
            context.SaveChanges();
        }
    }
}