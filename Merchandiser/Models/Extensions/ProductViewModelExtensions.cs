using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Merchandiser.Models.Extensions
{
    public static class ProductViewModelExtensions
    {
        public static Product ToEntity(this ProductViewModel item)
        {
            if (item == null)
            {
                return null;
            }

            var model = AutoMapper.Mapper.Map<Product>(item);

            return model;
        }

        public static ProductViewModel ToViewModel(this Product item)
        {
            if (item == null)
            {
                return null;
            }

            var model = AutoMapper.Mapper.Map<ProductViewModel>(item);

            return model;
        }
    }
}