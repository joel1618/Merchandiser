using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Merchandiser.Models.Extensions
{
    public static class BuildSurveyExtension
    {
        public static vwBuildSurvey ToEntity(this BuildSurveyViewModel item)
        {
            if (item == null)
            {
                return null;
            }

            var model = AutoMapper.Mapper.Map<vwBuildSurvey>(item);

            return model;
        }

        public static BuildSurveyViewModel ToViewModel(this vwBuildSurvey item)
        {
            if (item == null)
            {
                return null;
            }

            var model = AutoMapper.Mapper.Map<BuildSurveyViewModel>(item);

            return model;
        }
    }
}