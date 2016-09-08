using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Merchandiser.Models.Extensions
{
    public static class SurveyDetailViewModelExtension
    {
        public static SurveyDetail ToEntity(this SurveyDetailViewModel item)
        {
            if (item == null)
            {
                return null;
            }

            var model = AutoMapper.Mapper.Map<SurveyDetail>(item);

            return model;
        }

        public static SurveyDetailViewModel ToViewModel(this SurveyDetail item)
        {
            if (item == null)
            {
                return null;
            }

            var model = AutoMapper.Mapper.Map<SurveyDetailViewModel>(item);

            return model;
        }
    }
}