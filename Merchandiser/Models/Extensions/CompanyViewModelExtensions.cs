using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Merchandiser.Models.Extensions
{
    public static class CompanyViewModelExtensions
    {
        public static Company ToEntity(this CompanyViewModel item)
        {
            if (item == null)
            {
                return null;
            }

            var model = AutoMapper.Mapper.Map<Company>(item);

            return model;
        }

        public static CompanyViewModel ToViewModel(this Company item)
        {
            if (item == null)
            {
                return null;
            }

            var model = AutoMapper.Mapper.Map<CompanyViewModel>(item);

            return model;
        }
    }
}