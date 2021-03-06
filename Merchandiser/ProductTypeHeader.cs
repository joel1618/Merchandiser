
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
    
public partial class ProductTypeHeader
{

    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
    public ProductTypeHeader()
    {

        this.Products = new HashSet<Product>();

        this.ProductTypeDetails = new HashSet<ProductTypeDetail>();

    }


    public int Id { get; set; }

    public int CompanyId { get; set; }

    public string Name { get; set; }

    public Nullable<System.DateTime> Modified { get; set; }

    public string ModifiedBy { get; set; }

    public System.DateTime Created { get; set; }

    public string CreatedBy { get; set; }



    public virtual Company Company { get; set; }

    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]

    public virtual ICollection<Product> Products { get; set; }

    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]

    public virtual ICollection<ProductTypeDetail> ProductTypeDetails { get; set; }

}

}
