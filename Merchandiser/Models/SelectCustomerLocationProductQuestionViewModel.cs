using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Merchandiser.Models
{
    public class SelectCustomerLocationProductQuestionViewModel
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public int SurveyId { get; set; }
        public int CustomerId { get; set; }
        public int LocationId { get; set; }
        public int ProductId { get; set; }
        public int QuestionId { get; set; }

        public int? ProductTypeDetailId { get; set; }
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