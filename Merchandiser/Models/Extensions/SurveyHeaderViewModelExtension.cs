using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Merchandiser.Models.Extensions
{
    public static class SurveyHeaderViewModelExtension
    {
        public static SurveyHeader ToEntity(this SurveyHeaderViewModel item)
        {
            if (item == null)
            {
                return null;
            }

            var model = AutoMapper.Mapper.Map<SurveyHeader>(item);

            return model;
        }

        public static SurveyHeaderViewModel ToViewModel(this SurveyHeader item)
        {
            if (item == null)
            {
                return null;
            }

            var model = AutoMapper.Mapper.Map<SurveyHeaderViewModel>(item);

            return model;
        }
    }
}