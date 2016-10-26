using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Merchandiser.Models
{
    public class SelectSurveyViewModel
    {
        public Guid Id { get; set; }
        public Guid? CustomerId { get; set; }

        public Guid? CompanyId { get; set; }
        public Guid? LocationId { get; set; }
        public string Name { get; set; }
        public DateTime? SurveyCreated { get; set; }
    }
}