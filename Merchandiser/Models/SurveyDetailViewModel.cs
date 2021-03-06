﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Merchandiser.Models
{
    public class SurveyDetailViewModel
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int CompanyId { get; set; }
        [Required]
        public int SurveyHeaderId { get; set; }
        [Required]
        public int ProductId { get; set; }
        [Required]
        public int QuestionId { get; set; }

        public int? ProductTypeDetailId { get; set; }
        public string Answer { get; set; }
        public DateTime Modifed { get; set; }
        public DateTime Created { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }

        public virtual ProductViewModel Product { get; set; }
        public virtual QuestionViewModel Question { get; set; }

        public virtual ProductTypeDetailViewModel ProductTypeDetail { get; set; }
    }
}