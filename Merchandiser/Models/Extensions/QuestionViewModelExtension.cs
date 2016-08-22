using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Merchandiser.Models.Extensions
{
    public static class QuestionViewModelExtension
    {
        public static Question ToEntity(this QuestionViewModel item)
        {
            if (item == null)
            {
                return null;
            }

            var model = AutoMapper.Mapper.Map<Question>(item);

            return model;
        }

        public static QuestionViewModel ToViewModel(this Question item)
        {
            if (item == null)
            {
                return null;
            }

            var model = AutoMapper.Mapper.Map<QuestionViewModel>(item);

            return model;
        }
    }
}