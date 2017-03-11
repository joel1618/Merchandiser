using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Merchandiser.Models
{
    public class SurveyViewModel
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int CompanyId { get; set; }
        public string Name { get; set; }
        public bool IsNoteRequired { get; set; }

        public bool IsCreate { get; set; }

        public int? IsCreateDays { get; set; }
        public bool IsEdit { get; set; }
        public int? IsEditDays { get; set; }
        public bool IsDelete { get; set; }
        public int? IsDeleteDays { get; set; }
        public DateTime Modifed { get; set; }
        public DateTime Created { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }
    }
}