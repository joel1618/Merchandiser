using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Merchandiser.Models
{
    public class LocationViewModel
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public Guid CompanyId { get; set; }
        public string Name { get; set; }
        public string Store { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public string Address { get; set; }
        public string AreaManager { get; set; }
        public DateTime Created { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }
    }
}