using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Merchandiser.Models
{
    public class BuildSurveyViewModel2
    {
        public List<CustomerViewModel> Customers { get; set; }
        public List<LocationViewModel> Locations { get; set; }
        public List<ProductViewModel> Products { get; set; }
        public List<QuestionViewModel> Questions { get; set; }
        public bool PopulateExisting { get; set; }

        public int SurveyId { get; set; }

        public int CompanyId { get; set; }
    }
}