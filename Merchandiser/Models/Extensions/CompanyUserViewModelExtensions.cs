using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Merchandiser.Models.Extensions
{
    public static class CompanyUserViewModelExtensions
    {
        public static User ToEntity(this CompanyUserViewModel item)
        {
            if (item == null)
            {
                return null;
            }

            var model = AutoMapper.Mapper.Map<User>(item);

            return model;
        }

        public static CompanyUserViewModel ToViewModel(this User item)
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