using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Merchandiser.Models
{
    public class SelectLocationViewModel
    {
        public int Id { get; set; }

        public int? CustomerId { get; set; }

        public int? CompanyId { get; set; }
        public string Name { get; set; }
        public decimal? Latitude { get; set; }
        public decimal? Longitude { get; set; }

        public string Address { get; set; }
        public DateTime? SurveyCreated { get; set; }
    }
}