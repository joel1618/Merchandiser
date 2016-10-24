﻿using System;
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

        public bool IsBeforeImage { get; set; }
        public bool IsAfterImage { get; set; }

        public DateTime Created { get; set; }
        public string CreatedBy { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }
        public DateTime Modified { get; set; }
        public string ModifiedBy { get; set; }
        public decimal? Latitude { get; set; }
        public decimal? Longitude { get; set; }

        public string Notes { get; set; }

        public virtual UserViewModel CreatedUser { get; set; }

        public virtual UserViewModel ModifiedUser { get; set; }

        public virtual LocationViewModel Location { get; set; }

        public virtual SurveyViewModel Survey { get; set; }

        public virtual CustomerViewModel Customer { get; set; }

        public virtual CompanyViewModel Company { get; set; }
    }
}