using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Merchandiser.Models
{
    public class SelectLocationViewModel
    {
        public Guid Id { get; set; }

        public Guid? CustomerId { get; set; }

        public Guid? CompanyId { get; set; }
        public string Name { get; set; }

        public string Address { get; set; }
        public DateTime? SurveyCreated { get; set; }
    }
}