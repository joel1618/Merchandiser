using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Merchandiser.Models.Extensions
{ 
    public static class ProductTypeHeaderViewModelExtension
    {
        public static ProductTypeHeader ToEntity(this ProductTypeHeaderViewModel item)
        {
            if (item == null)
            {
                return null;
            }

            var model = AutoMapper.Mapper.Map<ProductTypeHeader>(item);

            return model;
        }

        public static ProductTypeHeaderViewModel ToViewModel(this ProductTypeHeader item)
        {
            if (item == null)
            {
                return null;
            }

            var model = AutoMapper.Mapper.Map<ProductTypeHeaderViewModel>(item);

            return model;
        }
    }
}