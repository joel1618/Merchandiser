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
    
    public partial class ProductTypeDetail
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public ProductTypeDetail()
        {
            this.SurveyDetails = new HashSet<SurveyDetail>();
        }
    
        public System.Guid Id { get; set; }
        public System.Guid CompanyId { get; set; }
        public System.Guid ProductTypeHeaderId { get; set; }
        public string Name { get; set; }
        public string ModifiedBy { get; set; }
        public Nullable<System.DateTime> Modified { get; set; }
        public string CreatedBy { get; set; }
        public System.DateTime Created { get; set; }
    
        public virtual Company Company { get; set; }
        public virtual ProductTypeHeader ProductTypeHeader { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SurveyDetail> SurveyDetails { get; set; }
    }
}
