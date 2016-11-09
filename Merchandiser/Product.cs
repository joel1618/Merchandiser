
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
    
public partial class Product
{

    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
    public Product()
    {

        this.SurveyCustomerLocationProductQuestions = new HashSet<SurveyCustomerLocationProductQuestion>();

        this.SurveyDetails = new HashSet<SurveyDetail>();

        this.SurveyProductQuestions = new HashSet<SurveyProductQuestion>();

    }


    public System.Guid Id { get; set; }

    public System.Guid CompanyId { get; set; }

    public Nullable<System.Guid> ProductCategoryId { get; set; }

    public string Name { get; set; }

    public Nullable<System.DateTime> Modified { get; set; }

    public string ModifiedBy { get; set; }

    public System.DateTime Created { get; set; }

    public string CreatedBy { get; set; }



    public virtual Company Company { get; set; }

    public virtual ProductCategory ProductCategory { get; set; }

    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]

    public virtual ICollection<SurveyCustomerLocationProductQuestion> SurveyCustomerLocationProductQuestions { get; set; }

    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]

    public virtual ICollection<SurveyDetail> SurveyDetails { get; set; }

    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]

    public virtual ICollection<SurveyProductQuestion> SurveyProductQuestions { get; set; }

}

}
