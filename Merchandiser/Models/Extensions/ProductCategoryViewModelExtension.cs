using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Merchandiser.Models.Extensions
{
    public static class ProductCategoryViewModelExtension
    {
        public static ProductCategory ToEntity(this ProductCategoryViewModel item)
        {
            if (item == null)
            {
                return null;
            }

            var model = AutoMapper.Mapper.Map<ProductCategory>(item);

            return model;
        }

        public static ProductCategoryViewModel ToViewModel(this ProductCategory item)
        {
            if (item == null)
            {
                return null;
            }

            var model = AutoMapper.Mapper.Map<ProductCategoryViewModel>(item);

            return model;
        }
    }
}