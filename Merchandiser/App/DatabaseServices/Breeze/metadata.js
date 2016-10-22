window.breeze = window.breeze || {}; window.breeze.metadata = JSON.stringify(
{"schema":{"namespace":"Merchandiser","alias":"Self","annotation:UseStrongSpatialTypes":"false","xmlns:annotation":"http://schemas.microsoft.com/ado/2009/02/edm/annotation","xmlns:customannotation":"http://schemas.microsoft.com/ado/2013/11/edm/customannotation","xmlns":"http://schemas.microsoft.com/ado/2009/11/edm","cSpaceOSpaceMapping":"[[\"Merchandiser.CompanyViewModel\",\"Merchandiser.Models.CompanyViewModel\"],[\"Merchandiser.CustomerViewModel\",\"Merchandiser.Models.CustomerViewModel\"],[\"Merchandiser.MapViewModel\",\"Merchandiser.Models.MapViewModel\"],[\"Merchandiser.ProductCategoryViewModel\",\"Merchandiser.Models.ProductCategoryViewModel\"],[\"Merchandiser.RoleViewModel\",\"Merchandiser.Models.RoleViewModel\"],[\"Merchandiser.SurveyCustomerLocationViewModel\",\"Merchandiser.Models.SurveyCustomerLocationViewModel\"],[\"Merchandiser.LocationViewModel\",\"Merchandiser.Models.LocationViewModel\"],[\"Merchandiser.SurveyViewModel\",\"Merchandiser.Models.SurveyViewModel\"],[\"Merchandiser.SurveyProductQuestionViewModel\",\"Merchandiser.Models.SurveyProductQuestionViewModel\"],[\"Merchandiser.ProductViewModel\",\"Merchandiser.Models.ProductViewModel\"],[\"Merchandiser.QuestionViewModel\",\"Merchandiser.Models.QuestionViewModel\"],[\"Merchandiser.UserRoleViewModel\",\"Merchandiser.Models.UserRoleViewModel\"],[\"Merchandiser.UserViewModel\",\"Merchandiser.Models.UserViewModel\"]]","entityType":[{"name":"CompanyViewModel","customannotation:ClrType":"Merchandiser.Models.CompanyViewModel, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}]},{"name":"CustomerViewModel","customannotation:ClrType":"Merchandiser.Models.CustomerViewModel, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"IsSendReport","type":"Edm.Boolean","nullable":"false"},{"name":"SendReport","type":"Edm.DateTime"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}]},{"name":"MapViewModel","customannotation:ClrType":"Merchandiser.Models.MapViewModel, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"Latitude","type":"Edm.Decimal","precision":"18","scale":"2"},{"name":"Longitude","type":"Edm.Decimal","precision":"18","scale":"2"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"FirstName","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"LastName","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Notes","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"CustomerId","type":"Edm.Guid","nullable":"false"},{"name":"LocationId","type":"Edm.Guid","nullable":"false"},{"name":"SurveyId","type":"Edm.Guid","nullable":"false"},{"name":"CompanyName","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"CustomerName","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"LocationName","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"SurveyName","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}]},{"name":"ProductCategoryViewModel","customannotation:ClrType":"Merchandiser.Models.ProductCategoryViewModel, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}]},{"name":"RoleViewModel","customannotation:ClrType":"Merchandiser.Models.RoleViewModel, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.String","maxLength":"128","fixedLength":"false","unicode":"true","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}]},{"name":"SurveyCustomerLocationViewModel","customannotation:ClrType":"Merchandiser.Models.SurveyCustomerLocationViewModel, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"SurveyId","type":"Edm.Guid","nullable":"false"},{"name":"CustomerId","type":"Edm.Guid","nullable":"false"},{"name":"LocationId","type":"Edm.Guid","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Modifed","type":"Edm.DateTime","nullable":"false"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}],"navigationProperty":[{"name":"Customer","relationship":"Self.SurveyCustomerLocationViewModel_Customer","fromRole":"SurveyCustomerLocationViewModel_Customer_Source","toRole":"SurveyCustomerLocationViewModel_Customer_Target"},{"name":"Location","relationship":"Self.SurveyCustomerLocationViewModel_Location","fromRole":"SurveyCustomerLocationViewModel_Location_Source","toRole":"SurveyCustomerLocationViewModel_Location_Target"},{"name":"Survey","relationship":"Self.SurveyCustomerLocationViewModel_Survey","fromRole":"SurveyCustomerLocationViewModel_Survey_Source","toRole":"SurveyCustomerLocationViewModel_Survey_Target"}]},{"name":"LocationViewModel","customannotation:ClrType":"Merchandiser.Models.LocationViewModel, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Store","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Latitude","type":"Edm.Decimal","precision":"18","scale":"2"},{"name":"Longitude","type":"Edm.Decimal","precision":"18","scale":"2"},{"name":"Address","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"AreaManager","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}]},{"name":"SurveyViewModel","customannotation:ClrType":"Merchandiser.Models.SurveyViewModel, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"IsNoteRequired","type":"Edm.Boolean","nullable":"false"},{"name":"Modifed","type":"Edm.DateTime","nullable":"false"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}]},{"name":"SurveyProductQuestionViewModel","customannotation:ClrType":"Merchandiser.Models.SurveyProductQuestionViewModel, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"SurveyId","type":"Edm.Guid","nullable":"false"},{"name":"ProductId","type":"Edm.Guid","nullable":"false"},{"name":"QuestionId","type":"Edm.Guid","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"RowOrder","type":"Edm.Int32","nullable":"false"},{"name":"Modifed","type":"Edm.DateTime","nullable":"false"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}],"navigationProperty":[{"name":"Product","relationship":"Self.SurveyProductQuestionViewModel_Product","fromRole":"SurveyProductQuestionViewModel_Product_Source","toRole":"SurveyProductQuestionViewModel_Product_Target"},{"name":"Question","relationship":"Self.SurveyProductQuestionViewModel_Question","fromRole":"SurveyProductQuestionViewModel_Question_Source","toRole":"SurveyProductQuestionViewModel_Question_Target"}]},{"name":"ProductViewModel","customannotation:ClrType":"Merchandiser.Models.ProductViewModel, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"ProductCategoryId","type":"Edm.Guid"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}],"navigationProperty":{"name":"ProductCategory","relationship":"Self.ProductViewModel_ProductCategory","fromRole":"ProductViewModel_ProductCategory_Source","toRole":"ProductViewModel_ProductCategory_Target"}},{"name":"QuestionViewModel","customannotation:ClrType":"Merchandiser.Models.QuestionViewModel, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"IsRequired","type":"Edm.Boolean","nullable":"false"},{"name":"IsTrueFalse","type":"Edm.Boolean","nullable":"false"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}]},{"name":"UserRoleViewModel","customannotation:ClrType":"Merchandiser.Models.UserRoleViewModel, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"UserId","type":"Edm.String","maxLength":"128","fixedLength":"false","unicode":"true"},{"name":"RoleId","type":"Edm.String","maxLength":"128","fixedLength":"false","unicode":"true"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"CustomerId","type":"Edm.Guid"}],"navigationProperty":[{"name":"Company","relationship":"Self.UserRoleViewModel_Company","fromRole":"UserRoleViewModel_Company_Source","toRole":"UserRoleViewModel_Company_Target"},{"name":"Customer","relationship":"Self.UserRoleViewModel_Customer","fromRole":"UserRoleViewModel_Customer_Source","toRole":"UserRoleViewModel_Customer_Target"},{"name":"Role","relationship":"Self.UserRoleViewModel_Role","fromRole":"UserRoleViewModel_Role_Source","toRole":"UserRoleViewModel_Role_Target"},{"name":"User","relationship":"Self.UserRoleViewModel_User","fromRole":"UserRoleViewModel_User_Source","toRole":"UserRoleViewModel_User_Target"}]},{"name":"UserViewModel","customannotation:ClrType":"Merchandiser.Models.UserViewModel, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.String","maxLength":"128","fixedLength":"false","unicode":"true","nullable":"false"},{"name":"UserName","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}]}],"association":[{"name":"SurveyCustomerLocationViewModel_Customer","end":[{"role":"SurveyCustomerLocationViewModel_Customer_Source","type":"Edm.Self.SurveyCustomerLocationViewModel","multiplicity":"*"},{"role":"SurveyCustomerLocationViewModel_Customer_Target","type":"Edm.Self.CustomerViewModel","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"SurveyCustomerLocationViewModel_Customer_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"SurveyCustomerLocationViewModel_Customer_Source","propertyRef":{"name":"CustomerId"}}}},{"name":"SurveyCustomerLocationViewModel_Location","end":[{"role":"SurveyCustomerLocationViewModel_Location_Source","type":"Edm.Self.SurveyCustomerLocationViewModel","multiplicity":"*"},{"role":"SurveyCustomerLocationViewModel_Location_Target","type":"Edm.Self.LocationViewModel","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"SurveyCustomerLocationViewModel_Location_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"SurveyCustomerLocationViewModel_Location_Source","propertyRef":{"name":"LocationId"}}}},{"name":"SurveyCustomerLocationViewModel_Survey","end":[{"role":"SurveyCustomerLocationViewModel_Survey_Source","type":"Edm.Self.SurveyCustomerLocationViewModel","multiplicity":"*"},{"role":"SurveyCustomerLocationViewModel_Survey_Target","type":"Edm.Self.SurveyViewModel","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"SurveyCustomerLocationViewModel_Survey_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"SurveyCustomerLocationViewModel_Survey_Source","propertyRef":{"name":"SurveyId"}}}},{"name":"ProductViewModel_ProductCategory","end":[{"role":"ProductViewModel_ProductCategory_Source","type":"Edm.Self.ProductViewModel","multiplicity":"*"},{"role":"ProductViewModel_ProductCategory_Target","type":"Edm.Self.ProductCategoryViewModel","multiplicity":"0..1"}],"referentialConstraint":{"principal":{"role":"ProductViewModel_ProductCategory_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"ProductViewModel_ProductCategory_Source","propertyRef":{"name":"ProductCategoryId"}}}},{"name":"SurveyProductQuestionViewModel_Product","end":[{"role":"SurveyProductQuestionViewModel_Product_Source","type":"Edm.Self.SurveyProductQuestionViewModel","multiplicity":"*"},{"role":"SurveyProductQuestionViewModel_Product_Target","type":"Edm.Self.ProductViewModel","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"SurveyProductQuestionViewModel_Product_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"SurveyProductQuestionViewModel_Product_Source","propertyRef":{"name":"ProductId"}}}},{"name":"SurveyProductQuestionViewModel_Question","end":[{"role":"SurveyProductQuestionViewModel_Question_Source","type":"Edm.Self.SurveyProductQuestionViewModel","multiplicity":"*"},{"role":"SurveyProductQuestionViewModel_Question_Target","type":"Edm.Self.QuestionViewModel","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"SurveyProductQuestionViewModel_Question_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"SurveyProductQuestionViewModel_Question_Source","propertyRef":{"name":"QuestionId"}}}},{"name":"UserRoleViewModel_Company","end":[{"role":"UserRoleViewModel_Company_Source","type":"Edm.Self.UserRoleViewModel","multiplicity":"*"},{"role":"UserRoleViewModel_Company_Target","type":"Edm.Self.CompanyViewModel","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"UserRoleViewModel_Company_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"UserRoleViewModel_Company_Source","propertyRef":{"name":"CompanyId"}}}},{"name":"UserRoleViewModel_Customer","end":[{"role":"UserRoleViewModel_Customer_Source","type":"Edm.Self.UserRoleViewModel","multiplicity":"*"},{"role":"UserRoleViewModel_Customer_Target","type":"Edm.Self.CustomerViewModel","multiplicity":"0..1"}],"referentialConstraint":{"principal":{"role":"UserRoleViewModel_Customer_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"UserRoleViewModel_Customer_Source","propertyRef":{"name":"CustomerId"}}}},{"name":"UserRoleViewModel_Role","end":[{"role":"UserRoleViewModel_Role_Source","type":"Edm.Self.UserRoleViewModel","multiplicity":"*"},{"role":"UserRoleViewModel_Role_Target","type":"Edm.Self.RoleViewModel","multiplicity":"0..1"}],"referentialConstraint":{"principal":{"role":"UserRoleViewModel_Role_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"UserRoleViewModel_Role_Source","propertyRef":{"name":"RoleId"}}}},{"name":"UserRoleViewModel_User","end":[{"role":"UserRoleViewModel_User_Source","type":"Edm.Self.UserRoleViewModel","multiplicity":"*"},{"role":"UserRoleViewModel_User_Target","type":"Edm.Self.UserViewModel","multiplicity":"0..1"}],"referentialConstraint":{"principal":{"role":"UserRoleViewModel_User_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"UserRoleViewModel_User_Source","propertyRef":{"name":"UserId"}}}}],"entityContainer":{"name":"DatabaseContext","customannotation:UseClrTypes":"true","entitySet":[{"name":"CompanyViewModel","entityType":"Self.CompanyViewModel"},{"name":"CustomerViewModel","entityType":"Self.CustomerViewModel"},{"name":"MapViewModel","entityType":"Self.MapViewModel"},{"name":"ProductCategoryViewModel","entityType":"Self.ProductCategoryViewModel"},{"name":"RoleViewModel","entityType":"Self.RoleViewModel"},{"name":"SurveyCustomerLocationViewModel","entityType":"Self.SurveyCustomerLocationViewModel"},{"name":"LocationViewModels","entityType":"Self.LocationViewModel"},{"name":"SurveyViewModels","entityType":"Self.SurveyViewModel"},{"name":"SurveyProductQuestionViewModel","entityType":"Self.SurveyProductQuestionViewModel"},{"name":"ProductViewModels","entityType":"Self.ProductViewModel"},{"name":"QuestionViewModels","entityType":"Self.QuestionViewModel"},{"name":"UserRoleViewModel","entityType":"Self.UserRoleViewModel"},{"name":"UserViewModels","entityType":"Self.UserViewModel"}],"associationSet":[{"name":"SurveyCustomerLocationViewModel_Customer","association":"Self.SurveyCustomerLocationViewModel_Customer","end":[{"role":"SurveyCustomerLocationViewModel_Customer_Source","entitySet":"SurveyCustomerLocationViewModel"},{"role":"SurveyCustomerLocationViewModel_Customer_Target","entitySet":"CustomerViewModel"}]},{"name":"SurveyCustomerLocationViewModel_Location","association":"Self.SurveyCustomerLocationViewModel_Location","end":[{"role":"SurveyCustomerLocationViewModel_Location_Source","entitySet":"SurveyCustomerLocationViewModel"},{"role":"SurveyCustomerLocationViewModel_Location_Target","entitySet":"LocationViewModels"}]},{"name":"SurveyCustomerLocationViewModel_Survey","association":"Self.SurveyCustomerLocationViewModel_Survey","end":[{"role":"SurveyCustomerLocationViewModel_Survey_Source","entitySet":"SurveyCustomerLocationViewModel"},{"role":"SurveyCustomerLocationViewModel_Survey_Target","entitySet":"SurveyViewModels"}]},{"name":"ProductViewModel_ProductCategory","association":"Self.ProductViewModel_ProductCategory","end":[{"role":"ProductViewModel_ProductCategory_Source","entitySet":"ProductViewModels"},{"role":"ProductViewModel_ProductCategory_Target","entitySet":"ProductCategoryViewModel"}]},{"name":"SurveyProductQuestionViewModel_Product","association":"Self.SurveyProductQuestionViewModel_Product","end":[{"role":"SurveyProductQuestionViewModel_Product_Source","entitySet":"SurveyProductQuestionViewModel"},{"role":"SurveyProductQuestionViewModel_Product_Target","entitySet":"ProductViewModels"}]},{"name":"SurveyProductQuestionViewModel_Question","association":"Self.SurveyProductQuestionViewModel_Question","end":[{"role":"SurveyProductQuestionViewModel_Question_Source","entitySet":"SurveyProductQuestionViewModel"},{"role":"SurveyProductQuestionViewModel_Question_Target","entitySet":"QuestionViewModels"}]},{"name":"UserRoleViewModel_Company","association":"Self.UserRoleViewModel_Company","end":[{"role":"UserRoleViewModel_Company_Source","entitySet":"UserRoleViewModel"},{"role":"UserRoleViewModel_Company_Target","entitySet":"CompanyViewModel"}]},{"name":"UserRoleViewModel_Customer","association":"Self.UserRoleViewModel_Customer","end":[{"role":"UserRoleViewModel_Customer_Source","entitySet":"UserRoleViewModel"},{"role":"UserRoleViewModel_Customer_Target","entitySet":"CustomerViewModel"}]},{"name":"UserRoleViewModel_Role","association":"Self.UserRoleViewModel_Role","end":[{"role":"UserRoleViewModel_Role_Source","entitySet":"UserRoleViewModel"},{"role":"UserRoleViewModel_Role_Target","entitySet":"RoleViewModel"}]},{"name":"UserRoleViewModel_User","association":"Self.UserRoleViewModel_User","end":[{"role":"UserRoleViewModel_User_Source","entitySet":"UserRoleViewModel"},{"role":"UserRoleViewModel_User_Target","entitySet":"UserViewModels"}]}]}}}
);
