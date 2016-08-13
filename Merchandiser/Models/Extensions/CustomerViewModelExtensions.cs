using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Merchandiser.Models.Extensions
{
    public static class CustomerViewModelExtensions
    {
        public static Customer ToEntity(this CustomerViewModel item)
        {
            if (item == null)
            {
                return null;
            }

            var model = AutoMapper.Mapper.Map<Customer>(item);

            return model;
        }

        public static CustomerViewModel ToViewModel(this Customer item)
        {
            if (item == null)
            {
                return null;
            }

            var model = AutoMapper.Mapper.Map<CustomerViewModel>(item);

            return model;
        }
    }
}