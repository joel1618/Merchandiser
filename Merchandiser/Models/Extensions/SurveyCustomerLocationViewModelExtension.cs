using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Merchandiser.Models.Extensions
{
    public static class SurveyCustomerLocationViewModelExtension
    {
        public static SurveyCustomerLocation ToEntity(this SurveyCustomerLocationViewModel item)
        {
            if (item == null)
            {
                return null;
            }

            var model = AutoMapper.Mapper.Map<SurveyCustomerLocation>(item);

            return model;
        }

        public static SurveyCustomerLocationViewModel ToViewModel(this SurveyCustomerLocation item)
        {
            if (item == null)
            {
                return null;
            }

            var model = AutoMapper.Mapper.Map<SurveyCustomerLocationViewModel>(item);

            return model;
        }
    }
}