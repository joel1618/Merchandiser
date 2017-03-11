using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Merchandiser.Models
{
    public class MapViewModel
    {
        public int Id { get; set; }
        public decimal? Latitude { get; set; }
        public decimal? Longitude { get; set; }
        public DateTime Created { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string Notes { get; set; }
        public int CompanyId { get; set; }
        public int CustomerId { get; set; }
        public int LocationId { get; set; }
        public int SurveyId { get; set; }

        public string CompanyName { get; set; }
        public string CustomerName { get; set; }
        public string LocationName { get; set; }
        public string SurveyName { get; set; }
    }
}