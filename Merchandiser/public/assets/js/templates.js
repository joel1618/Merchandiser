angular.module("Main").run(["$templateCache", function($templateCache) {$templateCache.put("ApplicationComponents/Company/Views/Company.html","<div ng-controller=\"CompanyController\">\r\n    <h3>Company</h3>\r\n    <div class=\"row\">\r\n        <div class=\"col-md-12\">\r\n            <table>\r\n                <thead>\r\n                    <tr>\r\n                        <th></th>\r\n                        <th></th>\r\n                        <th></th>\r\n                        <th>&nbsp;Company Name</th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody ng-repeat=\"item in items\">\r\n                    <tr>\r\n                        <td><button class=\"btn btn-primary btn-sm\" ng-click=\"Select(item.Id)\">Select</button></td>\r\n                        <td><button class=\"btn btn-primary btn-sm\" ng-click=\"Edit(item.Id)\">Edit</button></td>\r\n                        <td><button class=\"btn btn-danger btn-sm\" ng-click=\"Delete(item.Id)\">Delete</button></td>\r\n                        <td>&nbsp;{{item.Name}}</td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n        <hr />\r\n        <div class=\"col-md-12\">\r\n            <div ui-view></div>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("ApplicationComponents/Company/Views/CompanyAddEdit.html","<div ng-controller=\"CompanyAddEditController\">\r\n    <h3>Company Detail</h3>\r\n    <div class=\"col-md-4\">\r\n        <div ng-form=\"form\">\r\n            <fieldset class=\"form-group\">\r\n                <label>Company Name</label>\r\n                <input type=\"text\" class=\"form-control\" ng-model=\"item.Name\" required />\r\n                <br />\r\n                <button class=\"btn btn-primary pull-right\" ng-click=\"Save()\" ng-disabled=\"!form.$valid\">Save</button>\r\n            </fieldset>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("ApplicationComponents/CompanyUser/Views/CompanyUser.html","<div ng-controller=\"CompanyUserController\">\r\n    <h3>Company User</h3>\r\n    <div class=\"row\">\r\n        <div class=\"col-md-12\">\r\n            <table>\r\n                <thead>\r\n                    <tr>\r\n                        <th></th>\r\n                        <th></th>\r\n                        <th>&nbsp;Company User Name</th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody ng-repeat=\"item in items\">\r\n                    <tr>\r\n                        <td><button class=\"btn btn-primary btn-sm\" ng-click=\"Edit(item.Id)\">Edit</button></td>\r\n                        <td><button class=\"btn btn-danger btn-sm\" ng-click=\"Delete(item.Id)\">Delete</button></td>\r\n                        <td>&nbsp;{{item.Name}}</td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n        <hr />\r\n        <div class=\"col-md-12\">\r\n            <div ui-view></div>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("ApplicationComponents/CompanyUser/Views/CompanyUserAddEdit.html","<div ng-controller=\"CompanyUserAddEditController\">\r\n    <h3>Company User Detail</h3>\r\n    <div class=\"col-md-4\">\r\n        <div ng-form=\"form\">\r\n            <fieldset class=\"form-group\">\r\n                <label>Company User Name</label>\r\n                <input type=\"text\" class=\"form-control\" ng-model=\"item.Name\" required />\r\n                <br />\r\n                <button class=\"btn btn-primary pull-right\" ng-click=\"Save()\" ng-disabled=\"!form.$valid\">Save</button>\r\n            </fieldset>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("ApplicationComponents/Location/Views/Location.html","<div ng-controller=\"LocationController\">\r\n    <h3>Location</h3>\r\n    <div class=\"row\">\r\n        <div class=\"col-md-12\">\r\n            <table>\r\n                <thead>\r\n                    <tr>\r\n                        <th></th>\r\n                        <th></th>\r\n                        <th>&nbsp;Location Name</th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody ng-repeat=\"item in items\">\r\n                    <tr>\r\n                        <td><button class=\"btn btn-primary btn-sm\" ng-click=\"Edit(item.Id)\">Edit</button></td>\r\n                        <td><button class=\"btn btn-danger btn-sm\" ng-click=\"Delete(item.Id)\">Delete</button></td>\r\n                        <td>&nbsp;{{item.Name}}</td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n        <hr />\r\n        <div class=\"col-md-12\">\r\n            <div ui-view></div>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("ApplicationComponents/Location/Views/LocationAddEdit.html","<div ng-controller=\"LocationAddEditController\">\r\n    <h3>Location Detail</h3>\r\n    <div class=\"col-md-4\">\r\n        <div ng-form=\"form\">\r\n            <fieldset class=\"form-group\">\r\n                <label>Location Name</label>\r\n                <input type=\"text\" class=\"form-control\" ng-model=\"item.Name\" maxlength=\"100\" required />\r\n                <label>Store</label>\r\n                <input type=\"text\" class=\"form-control\" ng-model=\"item.Store\" maxlength=\"100\" />\r\n                <label>Address</label>\r\n                <input type=\"text\" class=\"form-control\" ng-model=\"item.Address\" maxlength=\"100\" />\r\n                <label>Area Manager</label>\r\n                <input type=\"text\" class=\"form-control\" ng-model=\"item.AreaManager\" maxlength=\"100\" />\r\n                <br />\r\n                <button class=\"btn btn-primary pull-right\" ng-click=\"Save()\" ng-disabled=\"!form.$valid\">Save</button>\r\n            </fieldset>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("ApplicationComponents/Customer/Views/Customer.html","<div ng-controller=\"CustomerController\">\r\n    <h3>Customer</h3>\r\n    <div class=\"row\">\r\n        <div class=\"col-md-12\">\r\n            <table>\r\n                <thead>\r\n                    <tr>\r\n                        <th></th>\r\n                        <th></th>\r\n                        <th>&nbsp;Customer Name</th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody ng-repeat=\"item in items\">\r\n                    <tr>\r\n                        <td><button class=\"btn btn-primary btn-sm\" ng-click=\"Edit(item.Id)\">Edit</button></td>\r\n                        <td><button class=\"btn btn-danger btn-sm\" ng-click=\"Delete(item.Id)\">Delete</button></td>\r\n                        <td>&nbsp;{{item.Name}}</td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n        <hr />\r\n        <div class=\"col-md-12\">\r\n            <div ui-view></div>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("ApplicationComponents/Customer/Views/CustomerAddEdit.html","<div ng-controller=\"CustomerAddEditController\">\r\n    <h3>Customer Detail</h3>\r\n    <div class=\"col-md-4\">\r\n        <div ng-form=\"form\">\r\n            <fieldset class=\"form-group\">\r\n                <label>Customer Name</label>\r\n                <input type=\"text\" class=\"form-control\" ng-model=\"item.Name\" required />\r\n                <br />\r\n                <button class=\"btn btn-primary pull-right\" ng-click=\"Save()\" ng-disabled=\"!form.$valid\">Save</button>\r\n            </fieldset>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("ApplicationComponents/Main/Views/Main.html","<div ng-controller=\"MainController\">\r\n    <div class=\"row\">\r\n        <div class=\"col-md-2\">\r\n            <ul class=\"nav nav-pills nav-stacked\">\r\n                <li ng-class=\"{ \'active\' : SelectedNavigation === \'Companies\' }\" ng-click=\"SelectedNavigation = \'Companies\'\"><a ui-sref=\"main.company.addedit\">Companies</a></li>\r\n                <li ng-class=\"{ \'hidden\' : SelectedCompany.Id === undefined, \'active\' : SelectedNavigation === \'Customers\' }\" ng-click=\"SelectedNavigation = \'Customers\'\"><a ui-sref=\"main.customer.addedit\">Customers</a></li>\r\n                <li ng-class=\"{ \'hidden\' : SelectedCompany.Id === undefined, \'active\' : SelectedNavigation === \'Locations\' }\" ng-click=\"SelectedNavigation = \'Locations\'\"><a ui-sref=\"main.location.addedit\">Locations</a></li>\r\n                <li ng-class=\"{ \'hidden\' : SelectedCompany.Id === undefined, \'active\' : SelectedNavigation === \'Products\' }\" ng-click=\"SelectedNavigation = \'Products\'\"><a ui-sref=\"main.product.addedit\">Products</a></li>\r\n                <li ng-class=\"{ \'hidden\' : SelectedCompany.Id === undefined, \'active\' : SelectedNavigation === \'Questions\' }\" ng-click=\"SelectedNavigation = \'Questions\'\"><a ui-sref=\"main.question.addedit\">Questions</a></li>\r\n                <li ng-class=\"{ \'hidden\' : SelectedCompany.Id === undefined, \'active\' : SelectedNavigation === \'Users\' }\" ng-click=\"SelectedNavigation = \'Users\'\"><a ui-sref=\"main.companyuser.addedit\">Users</a></li>\r\n                <li ng-class=\"{ \'hidden\' : SelectedCompany.Id === undefined, \'active\' : SelectedNavigation === \'Surveys\' }\" ng-click=\"SelectedNavigation = \'Surveys\'\"><a ui-sref=\"main.survey.addedit\">Surveys</a></li>\r\n                <li ng-class=\"{ \'hidden\' : SelectedSurvey.Id === undefined, \'active\' : SelectedNavigation === \'Survey Customers and Locations\' }\" ng-click=\"SelectedNavigation = \'Survey Customers and Locations\'\"><a ui-sref=\"main.surveycustomerlocation.addedit\">Survey Customers and Locations</a></li>\r\n                <li ng-class=\"{ \'hidden\' : SelectedSurvey.Id === undefined, \'active\' : SelectedNavigation === \'Survey Products and Questions\' }\" ng-click=\"SelectedNavigation = \'Survey Products and Questions\'\"><a ui-sref=\"main.surveyproductquestion.addedit\">Survey Products and Questions</a></li>\r\n            </ul>\r\n        </div>\r\n        <div class=\"col-md-10\">\r\n            <div class=\"row\">\r\n                <div class=\"col-md-10\">\r\n                    <div ui-view></div>\r\n                </div>\r\n                <div class=\"col-md-2\">\r\n                    <label ng-show=\"SelectedCompany.Id !== undefined\">Company</label>\r\n                    <h5>{{SelectedCompany.Name}}</h5>\r\n                    <label ng-show=\"SelectedSurvey.Id !== undefined\">Survey</label>\r\n                    <h5>{{SelectedSurvey.Name}} </h5>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("ApplicationComponents/Merchandise/CustomerLocation/MerchandiseCustomerLocation.html","<div ng-controller=\"MerchandiseCustomerLocationController\">\r\n\r\n</div>");
$templateCache.put("ApplicationComponents/Merchandise/Survey/MerchandiseSurvey.html","<div ng-controller=\"MerchandiseSurveyController\">\r\n\r\n</div>");
$templateCache.put("ApplicationComponents/Product/Views/Product.html","<div ng-controller=\"ProductController\">\r\n    <h3>Product</h3>\r\n    <div class=\"row\">\r\n        <div class=\"col-md-12\">\r\n            <table>\r\n                <thead>\r\n                    <tr>\r\n                        <th></th>\r\n                        <th></th>\r\n                        <th>&nbsp;Product Name</th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody ng-repeat=\"item in items\">\r\n                    <tr>\r\n                        <td><button class=\"btn btn-primary btn-sm\" ng-click=\"Edit(item.Id)\">Edit</button></td>\r\n                        <td><button class=\"btn btn-danger btn-sm\" ng-click=\"Delete(item.Id)\">Delete</button></td>\r\n                        <td>&nbsp;{{item.Name}}</td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n        <hr />\r\n        <div class=\"col-md-12\">\r\n            <div ui-view></div>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("ApplicationComponents/Product/Views/ProductAddEdit.html","<div ng-controller=\"ProductAddEditController\">\r\n    <h3>Product Detail</h3>\r\n    <div class=\"col-md-4\">\r\n        <div ng-form=\"form\">\r\n            <fieldset class=\"form-group\">\r\n                <label>Product Name</label>\r\n                <input type=\"text\" class=\"form-control\" ng-model=\"item.Name\" required />\r\n                <br />\r\n                <button class=\"btn btn-primary pull-right\" ng-click=\"Save()\" ng-disabled=\"!form.$valid\">Save</button>\r\n            </fieldset>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("ApplicationComponents/Question/Views/Question.html","<div ng-controller=\"QuestionController\">\r\n    <h3>Question</h3>\r\n    <div class=\"row\">\r\n        <div class=\"col-md-12\">\r\n            <table>\r\n                <thead>\r\n                    <tr>\r\n                        <th></th>\r\n                        <th></th>\r\n                        <th>&nbsp;Question Name</th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody ng-repeat=\"item in items\">\r\n                    <tr>\r\n                        <td><button class=\"btn btn-primary btn-sm\" ng-click=\"Edit(item.Id)\">Edit</button></td>\r\n                        <td><button class=\"btn btn-danger btn-sm\" ng-click=\"Delete(item.Id)\">Delete</button></td>\r\n                        <td>&nbsp;{{item.Name}}</td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n        <hr />\r\n        <div class=\"col-md-12\">\r\n            <div ui-view></div>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("ApplicationComponents/Question/Views/QuestionAddEdit.html","<div ng-controller=\"QuestionAddEditController\">\r\n    <h3>Question Detail</h3>\r\n    <div class=\"col-md-4\">\r\n        <div ng-form=\"form\">\r\n            <fieldset class=\"form-group\">\r\n                <label>Question Name</label>\r\n                <input type=\"text\" class=\"form-control\" ng-model=\"item.Name\" required />\r\n                <br />\r\n                <button class=\"btn btn-primary pull-right\" ng-click=\"Save()\" ng-disabled=\"!form.$valid\">Save</button>\r\n            </fieldset>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("ApplicationComponents/SurveyCustomerLocation/Views/SurveyCustomerLocation.html","<div ng-controller=\"SurveyCustomerLocationController\">\r\n    <h3>Survey Customer Location</h3>\r\n    <div class=\"row\">\r\n        <div class=\"col-md-12\">\r\n            <table>\r\n                <thead>\r\n                    <tr>\r\n                        <th></th>\r\n                        <th></th>\r\n                        <th>&nbsp;Customer</th>\r\n                        <th>&nbsp;Location</th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody ng-repeat=\"item in items\">\r\n                    <tr>\r\n                        <td><button class=\"btn btn-primary btn-sm\" ng-click=\"Edit(item.Id)\">Edit</button></td>\r\n                        <td><button class=\"btn btn-danger btn-sm\" ng-click=\"Delete(item.Id)\">Delete</button></td>\r\n                        <td>&nbsp;{{item.Customer.Name}}</td>\r\n                        <td>&nbsp;{{item.Location.Name}}</td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n        <hr />\r\n        <div class=\"col-md-12\">\r\n            <div ui-view></div>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("ApplicationComponents/SurveyCustomerLocation/Views/SurveyCustomerLocationAddEdit.html","<div ng-controller=\"SurveyCustomerLocationAddEditController\">\r\n    <h3>Survey Customer Location Detail</h3>\r\n    <div class=\"col-md-4\">\r\n        <div ng-form=\"form\">\r\n            <fieldset class=\"form-group\">\r\n                <label>Customer</label>\r\n                <input type=\"text\" class=\"form-control\" typeahead-no-results=\"noResultsCustomers\" ng-model=\"item.Customer.Name\" uib-typeahead=\"item.Name for item in SearchCustomers($viewValue)\" \r\n                       ng-model-options=\"{ debounce: { \'default\': 500, \'blur\': 0 } }\"\r\n                       typeahead-on-select=\"SelectCustomer($item, $model, $label)\" required/>\r\n                <div ng-show=\"noResultsCustomers\">\r\n                    No Results Found!\r\n                </div>\r\n                <label>Location</label>\r\n                <input type=\"text\" class=\"form-control\" typeahead-no-results=\"noResultsLocation\" ng-model=\"item.Location.Name\" uib-typeahead=\"item.Name for item in SearchLocations($viewValue)\" \r\n                       ng-model-options=\"{ debounce: { \'default\': 500, \'blur\': 0 } }\"\r\n                       typeahead-on-select=\"SelectLocation($item, $model, $label)\" required />\r\n                <div ng-show=\"noResultsLocation\">\r\n                    No Results Found!\r\n                </div>\r\n                <br />\r\n                <button class=\"btn btn-primary pull-right\" ng-click=\"Save()\" ng-disabled=\"!form.$valid\">Save</button>\r\n            </fieldset>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("ApplicationComponents/Survey/Views/Survey.html","<div ng-controller=\"SurveyController\">\r\n    <h3>Survey</h3>\r\n    <div class=\"row\">\r\n        <div class=\"col-md-12\">\r\n            <table>\r\n                <thead>\r\n                    <tr>\r\n                        <th></th>\r\n                        <th></th>\r\n                        <th></th>\r\n                        <th>&nbsp;Survey Name</th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody ng-repeat=\"item in items\">\r\n                    <tr>\r\n                        <td><button class=\"btn btn-primary btn-sm\" ng-click=\"Select(item.Id)\">Select</button></td>\r\n                        <td><button class=\"btn btn-primary btn-sm\" ng-click=\"Edit(item.Id)\">Edit</button></td>\r\n                        <td><button class=\"btn btn-danger btn-sm\" ng-click=\"Delete(item.Id)\">Delete</button></td>\r\n                        <td>&nbsp;{{item.Name}}</td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n        <hr />\r\n        <div class=\"col-md-12\">\r\n            <div ui-view></div>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("ApplicationComponents/Survey/Views/SurveyAddEdit.html","<div ng-controller=\"SurveyAddEditController\">\r\n    <h3>Survey Detail</h3>\r\n    <div class=\"col-md-4\">\r\n        <div ng-form=\"form\">\r\n            <fieldset class=\"form-group\">\r\n                <label>Survey Name</label>\r\n                <input type=\"text\" class=\"form-control\" ng-model=\"item.Name\" required />\r\n                <br />\r\n                <button class=\"btn btn-primary pull-right\" ng-click=\"Save()\" ng-disabled=\"!form.$valid\">Save</button>\r\n            </fieldset>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("ApplicationComponents/SurveyProductQuestion/Views/SurveyProductQuestion.html","<div ng-controller=\"SurveyProductQuestionController\">\r\n    <h3>Survey Product Question</h3>\r\n    <div class=\"row\">\r\n        <div class=\"col-md-12\">\r\n            <table>\r\n                <thead>\r\n                    <tr>\r\n                        <th></th>\r\n                        <th></th>\r\n                        <th>&nbsp;Product</th>\r\n                        <th>&nbsp;Question</th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody ng-repeat=\"item in items\">\r\n                    <tr>\r\n                        <td><button class=\"btn btn-primary btn-sm\" ng-click=\"Edit(item.Id)\">Edit</button></td>\r\n                        <td><button class=\"btn btn-danger btn-sm\" ng-click=\"Delete(item.Id)\">Delete</button></td>\r\n                        <td>&nbsp;{{item.Product.Name}}</td>\r\n                        <td>&nbsp;{{item.Question.Name}}</td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n        <hr />\r\n        <div class=\"col-md-12\">\r\n            <div ui-view></div>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("ApplicationComponents/SurveyProductQuestion/Views/SurveyProductQuestionAddEdit.html","<div ng-controller=\"SurveyProductQuestionAddEditController\">\r\n    <h3>Survey Product Question Detail</h3>\r\n    <div class=\"col-md-4\">\r\n        <div ng-form=\"form\">\r\n            <fieldset class=\"form-group\">\r\n                <label>Product</label>\r\n                <input type=\"text\" class=\"form-control\" typeahead-no-results=\"noResultsProduct\" ng-model=\"item.Product.Name\" uib-typeahead=\"item.Name for item in SearchProducts($viewValue)\"\r\n                       ng-model-options=\"{ debounce: { \'default\': 500, \'blur\': 0 } }\"\r\n                       typeahead-on-select=\"SelectProduct($item, $model, $label)\" required />\r\n                <div ng-show=\"noResultsProduct\">\r\n                    No Results Found!\r\n                </div>\r\n                <label>Question</label>\r\n                <input type=\"text\" class=\"form-control\" typeahead-no-results=\"noResultsQuestion\" ng-model=\"item.Question.Name\" uib-typeahead=\"item.Name for item in SearchQuestions($viewValue)\"\r\n                       ng-model-options=\"{ debounce: { \'default\': 500, \'blur\': 0 } }\"\r\n                       typeahead-on-select=\"SelectQuestion($item, $model, $label)\" required />\r\n                <div ng-show=\"noResultsQuestion\">\r\n                    No Results Found!\r\n                </div>\r\n                <br />\r\n                <button class=\"btn btn-primary pull-right\" ng-click=\"Save()\" ng-disabled=\"!form.$valid\">Save</button>\r\n            </fieldset>\r\n        </div>\r\n    </div>\r\n</div>");}]);