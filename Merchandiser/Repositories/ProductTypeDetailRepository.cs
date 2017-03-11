using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Merchandiser.Repositories
{
    public class ProductTypeDetailRepository
    {
        MerchandiserEntities context;
        public ProductTypeDetailRepository()
        {
            this.context = new MerchandiserEntities();
        }

        public IQueryable<ProductTypeDetail> Search()
        {
            return context.ProductTypeDetails;
        }

        public ProductTypeDetail Get(int id)
        {
            return context.ProductTypeDetails.Find(id);
        }

        public ProductTypeDetail Create(ProductTypeDetail item)
        {
            item.Created = DateTime.UtcNow;
            context.ProductTypeDetails.Add(item);
            context.SaveChanges();
            return item;

        }

        public ProductTypeDetail Update(int id, ProductTypeDetail item)
        {
            var entity = context.ProductTypeDetails.Find(id);
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
                context.ProductTypeDetails.Remove(item);
            };
            context.SaveChanges();
        }
    }
}