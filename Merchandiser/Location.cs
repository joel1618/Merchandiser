
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
    
public partial class Location
{

    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
    public Location()
    {

        this.SurveyCustomerLocations = new HashSet<SurveyCustomerLocation>();

        this.SurveyCustomerLocationProductQuestions = new HashSet<SurveyCustomerLocationProductQuestion>();

        this.SurveyHeaders = new HashSet<SurveyHeader>();

    }


    public System.Guid Id { get; set; }

    public System.Guid CompanyId { get; set; }

    public string Name { get; set; }

    public string Store { get; set; }

    public Nullable<decimal> Latitude { get; set; }

    public Nullable<decimal> Longitude { get; set; }

    public string Address { get; set; }

    public string AreaManager { get; set; }

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

}

}
