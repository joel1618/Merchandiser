using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Merchandiser.Models.Extensions
{
    public static class SelectSurveyViewModelExtension
    {
        public static SelectSurvey ToEntity(this SelectSurveyViewModel item)
        {
            if (item == null)
            {
                return null;
            }

            var model = AutoMapper.Mapper.Map<SelectSurvey>(item);

            return model;
        }

        public static SelectSurveyViewModel ToViewModel(this SelectSurvey item)
        {
            if (item == null)
            {
                return null;
            }

            var model = AutoMapper.Mapper.Map<SelectSurveyViewModel>(item);

            return model;
        }
    }
}