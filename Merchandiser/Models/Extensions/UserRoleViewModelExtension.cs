using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Merchandiser.Models.Extensions
{
    public static class UserRoleViewModelExtension
    {
        public static AspNetUserRole ToEntity(this UserRoleViewModel item)
        {
            if (item == null)
            {
                return null;
            }

            var model = AutoMapper.Mapper.Map<AspNetUserRole>(item);

            return model;
        }

        public static UserRoleViewModel ToViewModel(this AspNetUserRole item)
        {
            if (item == null)
            {
                return null;
            }

            var model = AutoMapper.Mapper.Map<UserRoleViewModel>(item);

            return model;
        }
    }
}