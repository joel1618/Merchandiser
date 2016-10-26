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
    
    public partial class Survey
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Survey()
        {
            this.SurveyCustomerLocations = new HashSet<SurveyCustomerLocation>();
            this.SurveyCustomerLocationProductQuestions = new HashSet<SurveyCustomerLocationProductQuestion>();
            this.SurveyHeaders = new HashSet<SurveyHeader>();
            this.SurveyProductQuestions = new HashSet<SurveyProductQuestion>();
        }
    
        public System.Guid Id { get; set; }
        public System.Guid CompanyId { get; set; }
        public string Name { get; set; }
        public bool IsNoteRequired { get; set; }
        public bool IsEdit { get; set; }
        public Nullable<int> IsEditDays { get; set; }
        public bool IsDelete { get; set; }
        public Nullable<int> IsDeleteDays { get; set; }
        public Nullable<System.DateTime> Modified { get; set; }
        public string ModifiedBy { get; set; }
        public System.DateTime Created { get; set; }
        public string CreatedBy { get; set; }
    
        public virtual Company Company { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SurveyCustomerLocation> SurveyCustomerLocations { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SurveyCustomerLocationProductQuestion> SurveyCustomerLocationProductQuestions { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SurveyHeader> SurveyHeaders { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SurveyProductQuestion> SurveyProductQuestions { get; set; }
    }
}
