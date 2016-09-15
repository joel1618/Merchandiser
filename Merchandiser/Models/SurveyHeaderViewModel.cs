using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Drawing;
using System.Linq;
using System.Web;

namespace Merchandiser.Models
{
    public class SurveyHeaderViewModel
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public Guid CompanyId { get; set; }
        [Required]
        public Guid SurveyId { get; set; }
        [Required]
        public Guid CustomerId { get; set; }
        [Required]
        public Guid LocationId { get; set; }

        public Guid BeforeImageId { get; set; }
        public Guid AfterImageId { get; set; }
        public string BeforeImage { get; set; }
        public string AfterImage { get; set; }
        public DateTime Created { get; set; }
        public string CreatedBy { get; set; }
        public DateTime Modified { get; set; }
        public string ModifiedBy { get; set; }
    }
}