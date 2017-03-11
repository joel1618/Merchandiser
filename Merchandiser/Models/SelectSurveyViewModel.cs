using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Merchandiser.Models
{
    public class SelectSurveyViewModel
    {
        public int Id { get; set; }
        public int? CustomerId { get; set; }

        public int? CompanyId { get; set; }
        public int? LocationId { get; set; }
        public string Name { get; set; }
        public DateTime? SurveyCreated { get; set; }
    }
}