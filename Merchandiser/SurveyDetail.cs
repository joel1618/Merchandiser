//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Merchandiser
{
    using System;
    using System.Collections.Generic;
    
    public partial class SurveyDetail
    {
        public System.Guid Id { get; set; }
        public System.Guid CompanyId { get; set; }
        public System.Guid SurveyHeaderId { get; set; }
        public System.Guid ProductId { get; set; }
        public System.Guid QuestionId { get; set; }
        public Nullable<System.Guid> ProductTypeDetailId { get; set; }
        public string Answer { get; set; }
        public Nullable<System.DateTime> Modified { get; set; }
        public string ModifiedBy { get; set; }
        public System.DateTime Created { get; set; }
        public string CreatedBy { get; set; }
    
        public virtual Company Company { get; set; }
        public virtual Product Product { get; set; }
        public virtual ProductTypeDetail ProductTypeDetail { get; set; }
        public virtual Question Question { get; set; }
        public virtual SurveyHeader SurveyHeader { get; set; }
    }
}
