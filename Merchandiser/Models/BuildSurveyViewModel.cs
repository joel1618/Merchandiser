using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Merchandiser.Models
{
    public class BuildSurveyViewModel
    {
        [Key]
        public int CompanyId { get; set; }

        public Nullable<int> CustomerId { get; set; }

        public string CustomerName { get; set; }

        public Nullable<System.DateTime> CustomerCreated { get; set; }

        public Nullable<int> LocationId { get; set; }

        public string LocationName { get; set; }

        public Nullable<System.DateTime> LocationCreated { get; set; }

        public Nullable<int> ProductId { get; set; }

        public string ProductName { get; set; }

        public Nullable<System.DateTime> ProductCreated { get; set; }

        public Nullable<int> QuestionId { get; set; }

        public string QuestionName { get; set; }

        public Nullable<System.DateTime> QuestionCreated { get; set; }

        public Nullable<int> SurveyId { get; set; }
    }
}