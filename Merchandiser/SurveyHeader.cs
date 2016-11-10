
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
    
public partial class SurveyHeader
{

    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
    public SurveyHeader()
    {

        this.SurveyDetails = new HashSet<SurveyDetail>();

    }


    public System.Guid Id { get; set; }

    public System.Guid CompanyId { get; set; }

    public System.Guid SurveyId { get; set; }

    public System.Guid CustomerId { get; set; }

    public System.Guid LocationId { get; set; }

    public Nullable<decimal> Latitude { get; set; }

    public Nullable<decimal> Longitude { get; set; }

    public string Notes { get; set; }

    public bool IsBeforeImage { get; set; }

    public bool IsAfterImage { get; set; }

    public System.DateTime Created { get; set; }

    public string CreatedBy { get; set; }

    public Nullable<System.DateTime> Modified { get; set; }

    public string ModifiedBy { get; set; }



    public virtual AspNetUser AspNetUser { get; set; }

    public virtual AspNetUser AspNetUser1 { get; set; }

    public virtual Company Company { get; set; }

    public virtual Customer Customer { get; set; }

    public virtual Location Location { get; set; }

    public virtual Survey Survey { get; set; }

    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]

    public virtual ICollection<SurveyDetail> SurveyDetails { get; set; }

}

}
