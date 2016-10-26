using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Merchandiser.Models.Extensions
{
    public static class SurveyCustomerLocationProductQuestionViewModelExtension
    {
        public static SurveyCustomerLocationProductQuestion ToEntity(this SurveyCustomerLocationProductQuestionViewModel item)
        {
            if (item == null)
            {
                return null;
            }

            var model = AutoMapper.Mapper.Map<SurveyCustomerLocationProductQuestion>(item);

            return model;
        }

        public static SurveyCustomerLocationProductQuestionViewModel ToViewModel(this SurveyCustomerLocationProductQuestion item)
        {
            if (item == null)
            {
                return null;
            }

            var model = AutoMapper.Mapper.Map<SurveyCustomerLocationProductQuestionViewModel>(item);

            return model;
        }
    }
}