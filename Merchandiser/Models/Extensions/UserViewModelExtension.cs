using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Merchandiser.Models.Extensions
{
    public static class UserViewModelExtension
    {
        public static AspNetUser ToEntity(this UserViewModel item)
        {
            if (item == null)
            {
                return null;
            }

            var model = AutoMapper.Mapper.Map<AspNetUser>(item);

            return model;
        }

        public static UserViewModel ToViewModel(this AspNetUser item)
        {
            if (item == null)
            {
                return null;
            }

            var model = AutoMapper.Mapper.Map<UserViewModel>(item);

            return model;
        }
    }
}