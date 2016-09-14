using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Merchandiser.Models.Extensions
{
    public static class RoleViewModelExtension
    {
        public static AspNetRole ToEntity(this RoleViewModel item)
        {
            if (item == null)
            {
                return null;
            }

            var model = AutoMapper.Mapper.Map<AspNetRole>(item);

            return model;
        }

        public static RoleViewModel ToViewModel(this AspNetRole item)
        {
            if (item == null)
            {
                return null;
            }

            var model = AutoMapper.Mapper.Map<RoleViewModel>(item);

            return model;
        }
    }
}