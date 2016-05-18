using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MerchandiseEntity = Merchandiser.Merchandise;

namespace Merchandiser.Repositories
{
    public class MerchandiseRepository
    {
        MerchandiserEntities context;
        public MerchandiseRepository()
        {
            this.context = new MerchandiserEntities();
        }
        public IQueryable<MerchandiseEntity> Search()
        {
            return context.Merchandises;
        }

        public MerchandiseEntity Create(MerchandiseEntity item)
        {
            context.Merchandises.Add(item);
            context.SaveChanges();
            return item;
        }
    }
}