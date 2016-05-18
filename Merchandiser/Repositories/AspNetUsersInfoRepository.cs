using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AspNetUsersInfoEntity = Merchandiser.AspNetUsersInfo;

namespace Merchandiser.Repositories
{
    public class AspNetUsersInfoRepository
    {
        public AspNetUsersInfoEntity Create(AspNetUsersInfoEntity item)
        {
            using(var context = new MerchandiserEntities())
            {
                context.AspNetUsersInfoes.Add(item);
                context.SaveChanges();
                return item;
            }
        }
    }
}