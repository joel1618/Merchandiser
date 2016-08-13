using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Merchandiser.Models.Extensions
{
    public static class CompanyUserViewModelExtensions
    {
        public static CompanyUser ToEntity(this CompanyUserViewModel item)
        {
            if (item == null)
            {
                return null;
            }

            var model = AutoMapper.Mapper.Map<CompanyUser>(item);

            return model;
        }

        public static CompanyUserViewModel ToViewModel(this CompanyUser item)
        {
            if (item == null)
            {
                return null;
            }

            var model = AutoMapper.Mapper.Map<CompanyUserViewModel>(item);

            return model;
        }
    }
}