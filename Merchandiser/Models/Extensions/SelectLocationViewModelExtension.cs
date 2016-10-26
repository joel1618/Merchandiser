using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Merchandiser.Models.Extensions
{
    public static class SelectLocationViewModelExtension
    {
        public static SelectLocation ToEntity(this SelectLocationViewModel item)
        {
            if (item == null)
            {
                return null;
            }

            var model = AutoMapper.Mapper.Map<SelectLocation>(item);

            return model;
        }

        public static SelectLocationViewModel ToViewModel(this SelectLocation item)
        {
            if (item == null)
            {
                return null;
            }

            var model = AutoMapper.Mapper.Map<SelectLocationViewModel>(item);

            return model;
        }
    }
}