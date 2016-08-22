using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Merchandiser.Models.Extensions
{
    public static class SurveyProductQuestionViewModelExtension
    {
        public static SurveyProductQuestion ToEntity(this SurveyProductQuestionViewModel item)
        {
            if (item == null)
            {
                return null;
            }

            var model = AutoMapper.Mapper.Map<SurveyProductQuestion>(item);

            return model;
        }

        public static SurveyProductQuestionViewModel ToViewModel(this SurveyProductQuestion item)
        {
            if (item == null)
            {
                return null;
            }

            var model = AutoMapper.Mapper.Map<SurveyProductQuestionViewModel>(item);

            return model;
        }
    }
}