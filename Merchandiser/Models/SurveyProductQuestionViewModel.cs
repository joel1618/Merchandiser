using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Merchandiser.Models
{
    public class SurveyProductQuestionViewModel
    {
        [Key]
        public Guid Id { get; set; }
        public Guid SurveyId { get; set; }
        public Guid ProductId { get; set; }
        public Guid QuestionId { get; set; }
        public string Name { get; set; }
        public DateTime Modifed { get; set; }
        public DateTime Created { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }
    }
}