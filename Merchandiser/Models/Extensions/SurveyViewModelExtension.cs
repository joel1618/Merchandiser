using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Merchandiser.Models.Extensions
{
    public static class SurveyViewModelExtension
    {
        public static Survey ToEntity(this SurveyViewModel item)
        {
            if (item == null)
            {
                return null;
            }

            var model = AutoMapper.Mapper.Map<Survey>(item);

            return model;
        }

        public static SurveyViewModel ToViewModel(this Survey item)
        {
            if (item == null)
            {
                return null;
            }

            var model = AutoMapper.Mapper.Map<SurveyViewModel>(item);

            return model;
        }
    }
}