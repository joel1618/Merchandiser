using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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
        public DateTime Modifed { get; set; }
        public DateTime Created { get; set; }
    }
}