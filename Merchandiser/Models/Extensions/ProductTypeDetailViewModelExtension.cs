using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Merchandiser.Models.Extensions
{
    public static class ProductTypeDetailViewModelExtension
    {
        public static ProductTypeDetail ToEntity(this ProductTypeDetailViewModel item)
        {
            if (item == null)
            {
                return null;
            }

            var model = AutoMapper.Mapper.Map<ProductTypeDetail>(item);

            return model;
        }

        public static ProductTypeDetailViewModel ToViewModel(this ProductTypeDetail item)
        {
            if (item == null)
            {
                return null;
            }

            var model = AutoMapper.Mapper.Map<ProductTypeDetailViewModel>(item);

            return model;
        }
    }
}