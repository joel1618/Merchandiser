﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Merchandiser.Models
{
    public class QuestionViewModel
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int CompanyId { get; set; }
        public string Name { get; set; }

        public bool IsRequired { get; set; }

        public bool IsTrueFalse { get; set; }
        public DateTime Created { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }
    }
}