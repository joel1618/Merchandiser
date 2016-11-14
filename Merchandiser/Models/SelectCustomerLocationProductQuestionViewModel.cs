using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Merchandiser.Models
{
    public class SelectCustomerLocationProductQuestionViewModel
    {
        public System.Guid Id { get; set; }
        public System.Guid CompanyId { get; set; }
        public System.Guid SurveyId { get; set; }
        public System.Guid CustomerId { get; set; }
        public System.Guid LocationId { get; set; }
        public System.Guid ProductId { get; set; }
        public System.Guid QuestionId { get; set; }
        public int RowOrder { get; set; }
        public Nullable<System.DateTime> Modified { get; set; }
        public string ModifiedBy { get; set; }
        public System.DateTime Created { get; set; }
        public string CreatedBy { get; set; }
        public virtual CompanyViewModel Company { get; set; }
        public virtual CustomerViewModel Customer { get; set; }
        public virtual LocationViewModel Location { get; set; }
        public virtual ProductViewModel Product { get; set; }
        public virtual QuestionViewModel Question { get; set; }
        public virtual SurveyViewModel Survey { get; set; }

        public virtual ProductTypeDetailViewModel ProductTypeDetail { get; set; }
    }
}