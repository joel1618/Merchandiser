using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Merchandiser.Models
{
    public class MapViewModel
    {
        public Guid Id { get; set; }
        public decimal[] Position { get; set; }
        public decimal? Latitude { get; set; }
        public decimal? Longitude { get; set; }
        public DateTime Created { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}