using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Merchandiser.Models
{
    public class SurveyHeaderDetailViewModel
    {
        public SurveyHeaderViewModel Header { get; set; }
        public List<SurveyDetailViewModel> Details { get; set; }
    }
}