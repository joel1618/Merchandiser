using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Merchandiser.Repositories
{
    public class MapRepository
    {
        MerchandiserEntities context;
        public MapRepository()
        {
            this.context = new MerchandiserEntities();
        }

        public IQueryable<Map> Search()
        {
            return context.Maps;
        }
    }
}