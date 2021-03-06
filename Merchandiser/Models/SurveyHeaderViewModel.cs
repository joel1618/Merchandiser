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
        public int Id { get; set; }
        [Required]
        public int CompanyId { get; set; }
        [Required]
        public int SurveyId { get; set; }
        [Required]
        public int CustomerId { get; set; }
        [Required]
        public int LocationId { get; set; }

        public bool IsBeforeImage { get; set; }
        public bool IsAfterImage { get; set; }

        public DateTime Created { get; set; }
        public string CreatedBy { get; set; }
        public DateTime Modified { get; set; }
        public string ModifiedBy { get; set; }
        public decimal? Latitude { get; set; }
        public decimal? Longitude { get; set; }

        public string Notes { get; set; }

        public string Address { get; set; }
        public string Phone { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public string AreaManager { get; set; }

        public string CustomerName { get; set; }

        public string LocationName { get; set; }

        public bool IsReviewed { get; set; }

        public DateTime? Reviewed { get; set; }

        public string ReviewedBy { get; set; }

        public virtual UserViewModel CreatedUser { get; set; }

        public virtual UserViewModel ModifiedUser { get; set; }

        public virtual UserInfoViewModel UserInfo { get; set; }

        public virtual LocationViewModel Location { get; set; }

        public virtual SurveyViewModel Survey { get; set; }

        public virtual CustomerViewModel Customer { get; set; }

        public virtual CompanyViewModel Company { get; set; }
    }
}