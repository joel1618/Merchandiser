using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Merchandiser.Models.Extensions
{
    public static class LocationViewModelExtension
    {
        public static Location ToEntity(this LocationViewModel item)
        {
            if (item == null)
            {
                return null;
            }

            var model = AutoMapper.Mapper.Map<Location>(item);

            return model;
        }

        public static LocationViewModel ToViewModel(this Location item)
        {
            if (item == null)
            {
                return null;
            }

            var model = AutoMapper.Mapper.Map<LocationViewModel>(item);

            return model;
        }
    }
}