angular.module("Main").run(["$templateCache", function($templateCache) {$templateCache.put("ApplicationComponents/DataEntry/CustomerLocation/MerchandiseCustomerLocation.html","<div ng-controller=\"MerchandiseCustomerLocationController\">\r\n    <div class=\"col-md-4\"></div>\r\n    <div class=\"col-md-4\">\r\n        <label>Company</label>\r\n        <select class=\"form-control\" ng-model=\"SelectedCompany\" ng-options=\"x.Name for x in Company\" ng-change=\"SelectCompany()\"></select><br/>\r\n        <label>Location</label>\r\n        <select class=\"form-control\" ng-model=\"SelectedLocation\" ng-options=\"x.Location.Name for x in Location\" ng-change=\"SelectLocation()\"></select><br />\r\n        <label>Customer</label>\r\n        <select class=\"form-control\" ng-model=\"SelectedCustomer\" ng-options=\"x.Customer.Name for x in Customer\" ng-change=\"SelectCustomer()\"></select><br />\r\n        <label>Survey</label>\r\n        <select class=\"form-control\" ng-model=\"SelectedSurvey\" ng-options=\"x.Survey.Name for x in Survey\" ng-change=\"SelectSurvey()\"></select>\r\n    </div>\r\n    <div class=\"col-md-4\"></div>\r\n</div>");
$templateCache.put("ApplicationComponents/DataEntry/Survey/MerchandiseSurvey.html","<div ng-controller=\"MerchandiseSurveyController\">\r\n    <div class=\"container\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-6\">\r\n                <label>Before Image</label>\r\n                <br />\r\n                <!--http://stackoverflow.com/questions/17922557/angularjs-how-to-check-for-changes-in-file-input-fields-->\r\n                <label class=\"btn btn-primary btn-sm btn-file\">\r\n                    Choose Image <input type=\"file\" accept=\"image/*\" style=\"display: none;\" onchange=\"angular.element(this).scope().setBeforeImage(this)\" >\r\n                </label>\r\n                <button class=\"btn btn-danger btn-sm\" ng-click=\"DeleteBeforeImage()\" ng-disabled=\"Header.BeforeImage == null && BeforeImage == null\">Delete Image</button>\r\n                <br/>\r\n                <img id=\"BeforeImage\" ng-src=\"{{BeforeImage}}\" ng-show=\"BeforeImage !== null\" alt=\"No Image Found\" style=\"max-width:400px; max-height:400px\"/>\r\n                <!--<canvas id=\"CanvasBeforeImage\" style=\"max-width:400px; max-height:400px\"></canvas>-->\r\n                <br />\r\n                <table border=\"1\">\r\n                    <thead>\r\n                        <tr>\r\n                            <th>\r\n                                Product\r\n                            </th>\r\n                            <th>\r\n                                Question\r\n                            </th>\r\n                            <th>\r\n                                Answer\r\n                            </th>\r\n                        </tr>\r\n                    </thead>\r\n                    <tbody>\r\n                        <tr ng-repeat=\"item in Detail | orderBy: [\'Product.Name\',\'Question.Name\'] \">\r\n                            <td>\r\n                                {{item.Product.Name}}\r\n                            </td>\r\n                            <td>\r\n                                {{item.Question.Name}}\r\n                            </td>\r\n                            <td>\r\n                                <input ng-model=\"item.Answer\" type=\"text\" placeholder=\"Answer...\" class=\"form-control input-sm\" />\r\n                            </td>\r\n                        </tr>\r\n                    </tbody>\r\n                </table>\r\n                <label>After Image</label>\r\n                <br />\r\n                <!--http://stackoverflow.com/questions/17922557/angularjs-how-to-check-for-changes-in-file-input-fields-->\r\n                <label class=\"btn btn-primary btn-sm btn-file\">\r\n                    Choose File <input type=\"file\" accept=\"image/*\" style=\"display: none;\" onchange=\"angular.element(this).scope().setAfterImage(this)\">\r\n                </label>\r\n                <button class=\"btn btn-danger btn-sm\" ng-click=\"DeleteAfterImage()\" ng-disabled=\"Header.AfterImage == null && AfterImage == null\">Delete Image</button>\r\n                <br />\r\n                <img id=\"AfterImage\" ng-src=\"{{AfterImage}}\" ng-show=\"AfterImage !== null\" alt=\"No Image Found\" style=\"max-width:400px; max-height:400px\" />\r\n                <!--<canvas id=\"CanvasAfterImage\" style=\"max-width:400px; max-height:400px\"></canvas>-->\r\n                <br/>\r\n                <button class=\"btn btn-primary btn-sm pull-right\" ng-click=\"Save()\">Save</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("ApplicationComponents/DataEntry/SurveyData/MerchandiseSurveyData.html","<div ng-controller=\"MerchandiseSurveyDataController\">\r\n    <div ui-grid=\"grid.options\" ui-grid-exporter style=\"width:99%;height:100%;\"></div>\r\n</div>");
$templateCache.put("ApplicationComponents/Report/Main/ReportMain.html","<div ng-controller=\"ReportMainController\">\r\n    <div class=\"grid\" ui-grid-exporter ui-grid=\"gridOptions\"></div>\r\n</div>");
$templateCache.put("ApplicationComponents/Administrator/Company/Views/Company.html","<div ng-controller=\"CompanyController\">\r\n    <h3>Company</h3>\r\n    <div class=\"row\">\r\n        <div class=\"col-md-12\">\r\n            <table>\r\n                <thead>\r\n                    <tr>\r\n                        <th></th>\r\n                        <th></th>\r\n                        <th></th>\r\n                        <th>&nbsp;Company Name</th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody ng-repeat=\"item in items\">\r\n                    <tr>\r\n                        <td><button class=\"btn btn-primary btn-sm\" ng-click=\"Select(item.Id)\">Select</button></td>\r\n                        <td><button class=\"btn btn-primary btn-sm\" ng-click=\"Edit(item.Id)\">Edit</button></td>\r\n                        <td><button class=\"btn btn-danger btn-sm\" ng-click=\"Delete(item.Id)\">Delete</button></td>\r\n                        <td>&nbsp;{{item.Name}}</td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n        <hr />\r\n        <div class=\"col-md-12\">\r\n            <div ui-view></div>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("ApplicationComponents/Administrator/Company/Views/CompanyAddEdit.html","<div ng-controller=\"CompanyAddEditController\">\r\n    <h3>Company Detail</h3>\r\n    <div class=\"col-md-4\">\r\n        <div ng-form=\"form\">\r\n            <fieldset class=\"form-group\">\r\n                <label>Company Name</label>\r\n                <input type=\"text\" class=\"form-control\" ng-model=\"item.Name\" required />\r\n                <br />\r\n                <button class=\"btn btn-primary pull-right\" ng-click=\"Save()\" ng-disabled=\"!form.$valid\">Save</button>\r\n            </fieldset>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("ApplicationComponents/Administrator/Customer/Views/Customer.html","<div ng-controller=\"CustomerController\">\r\n    <h3>Customer</h3>\r\n    <div class=\"row\">\r\n        <div class=\"col-md-12\">\r\n            <table>\r\n                <thead>\r\n                    <tr>\r\n                        <th></th>\r\n                        <th></th>\r\n                        <th>&nbsp;Customer Name</th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody ng-repeat=\"item in items\">\r\n                    <tr>\r\n                        <td><button class=\"btn btn-primary btn-sm\" ng-click=\"Edit(item.Id)\">Edit</button></td>\r\n                        <td><button class=\"btn btn-danger btn-sm\" ng-click=\"Delete(item.Id)\">Delete</button></td>\r\n                        <td>&nbsp;{{item.Name}}</td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n        <hr />\r\n        <div class=\"col-md-12\">\r\n            <div ui-view></div>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("ApplicationComponents/Administrator/Customer/Views/CustomerAddEdit.html","<div ng-controller=\"CustomerAddEditController\">\r\n    <h3>Customer Detail</h3>\r\n    <div class=\"col-md-4\">\r\n        <div ng-form=\"form\">\r\n            <fieldset class=\"form-group\">\r\n                <label>Customer Name</label>\r\n                <input type=\"text\" class=\"form-control\" ng-model=\"item.Name\" required />\r\n                <br />\r\n                <button class=\"btn btn-primary pull-right\" ng-click=\"Save()\" ng-disabled=\"!form.$valid\">Save</button>\r\n            </fieldset>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("ApplicationComponents/Administrator/Location/Views/Location.html","<div ng-controller=\"LocationController\">\r\n    <h3>Location</h3>\r\n    <div class=\"row\">\r\n        <div class=\"col-md-12\">\r\n            <table>\r\n                <thead>\r\n                    <tr>\r\n                        <th></th>\r\n                        <th></th>\r\n                        <th>&nbsp;Location Name</th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody ng-repeat=\"item in items\">\r\n                    <tr>\r\n                        <td><button class=\"btn btn-primary btn-sm\" ng-click=\"Edit(item.Id)\">Edit</button></td>\r\n                        <td><button class=\"btn btn-danger btn-sm\" ng-click=\"Delete(item.Id)\">Delete</button></td>\r\n                        <td>&nbsp;{{item.Name}}</td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n        <hr />\r\n        <div class=\"col-md-12\">\r\n            <div ui-view></div>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("ApplicationComponents/Administrator/Location/Views/LocationAddEdit.html","<div ng-controller=\"LocationAddEditController\">\r\n    <h3>Location Detail</h3>\r\n    <div class=\"col-md-4\">\r\n        <div ng-form=\"form\">\r\n            <fieldset class=\"form-group\">\r\n                <label>Location Name</label>\r\n                <input type=\"text\" class=\"form-control\" ng-model=\"item.Name\" maxlength=\"100\" required />\r\n                <label>Store</label>\r\n                <input type=\"text\" class=\"form-control\" ng-model=\"item.Store\" maxlength=\"100\" />\r\n                <label>Address</label>\r\n                <input type=\"text\" class=\"form-control\" ng-model=\"item.Address\" maxlength=\"100\" />\r\n                <label>Area Manager</label>\r\n                <input type=\"text\" class=\"form-control\" ng-model=\"item.AreaManager\" maxlength=\"100\" />\r\n                <br />\r\n                <button class=\"btn btn-primary pull-right\" ng-click=\"Save()\" ng-disabled=\"!form.$valid\">Save</button>\r\n            </fieldset>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("ApplicationComponents/Administrator/Main/Views/Main.html","<div ng-controller=\"MainController\">\r\n    <div class=\"row\">\r\n        <div class=\"col-md-2\">\r\n            <ul class=\"list-group\" style=\"color:black;\">\r\n                <li ui-sref-active=\"active\" class=\"list-group-item\" ng-click=\"Route(\'main.company.addedit\')\" ui-sref=\"main.company.addedit\">Companies</li>\r\n                <li ui-sref-active=\"active\" class=\"list-group-item\" ng-click=\"Route(\'main.customer.addedit\')\" ui-sref=\"main.customer.addedit\">Customers</li>\r\n                <li ui-sref-active=\"active\" class=\"list-group-item\" ng-click=\"Route(\'main.location.addedit\')\" ui-sref=\"main.location.addedit\">Locations</li>\r\n                <li ui-sref-active=\"active\" class=\"list-group-item\" ng-click=\"Route(\'main.product.addedit\')\" ui-sref=\"main.product.addedit\">Products</li>\r\n                <li ui-sref-active=\"active\" class=\"list-group-item\" ng-click=\"Route(\'main.question.addedit\')\" ui-sref=\"main.question.addedit\">Questions</li>\r\n                <li ui-sref-active=\"active\" class=\"list-group-item\" ng-click=\"Route(\'main.userrole.addedit\')\" ui-sref=\"main.userrole.addedit\">Users</li>\r\n                <li ui-sref-active=\"active\" class=\"list-group-item\" ng-click=\"Route(\'main.survey.addedit\')\" ui-sref=\"main.survey.addedit\">Surveys</li>\r\n                <li ui-sref-active=\"active\" class=\"list-group-item\" ng-click=\"Route(\'main.surveycustomerlocation.addedit\')\" ui-sref=\"main.surveycustomerlocation.addedit\">Survey Customers and Locations</a></li>\r\n                <li ui-sref-active=\"active\" class=\"list-group-item\" ng-click=\"Route(\'main.surveyproductquestion.addedit\')\" ui-sref=\"main.surveyproductquestion.addedit\">Survey Products and Questions</></li>\r\n            </ul>\r\n        </div>\r\n        <div class=\"col-md-10\">\r\n            <div class=\"row\">\r\n                <div class=\"col-md-10\">\r\n                    <div ui-view></div>\r\n                </div>\r\n                <div class=\"col-md-2\" style=\"padding-right:20px;\">\r\n                    <ul class=\"list-group\">\r\n                        <li class=\"list-group-item\"><a ui-sref=\"merchandise\">Merchandise</a></li>\r\n                        <li class=\"list-group-item\"><a ui-sref=\"reportmain\">Report</a></li>\r\n                    </ul>\r\n                    <div class=\"panel panel-primary\" ng-show=\"SelectedCompany.Id !== undefined\">\r\n                        <div class=\"panel-heading\">\r\n                            <h3 class=\"panel-title\">Selected Company</h3>\r\n                        </div>\r\n                        <div class=\"panel-body\">\r\n                            {{SelectedCompany.Name}}\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"panel panel-primary\" ng-show=\"SelectedSurvey.Id !== undefined\">\r\n                        <div class=\"panel-heading\">\r\n                            <h3 class=\"panel-title\">Selected Survey</h3>\r\n                        </div>\r\n                        <div class=\"panel-body\">\r\n                            {{SelectedSurvey.Name}}\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n");
$templateCache.put("ApplicationComponents/Administrator/Product/Views/Product.html","<div ng-controller=\"ProductController\">\r\n    <h3>Product</h3>\r\n    <div class=\"row\">\r\n        <div class=\"col-md-12\">\r\n            <table>\r\n                <thead>\r\n                    <tr>\r\n                        <th></th>\r\n                        <th></th>\r\n                        <th>&nbsp;Product Name</th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody ng-repeat=\"item in items\">\r\n                    <tr>\r\n                        <td><button class=\"btn btn-primary btn-sm\" ng-click=\"Edit(item.Id)\">Edit</button></td>\r\n                        <td><button class=\"btn btn-danger btn-sm\" ng-click=\"Delete(item.Id)\">Delete</button></td>\r\n                        <td>&nbsp;{{item.Name}}</td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n        <hr />\r\n        <div class=\"col-md-12\">\r\n            <div ui-view></div>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("ApplicationComponents/Administrator/Product/Views/ProductAddEdit.html","<div ng-controller=\"ProductAddEditController\">\r\n    <h3>Product Detail</h3>\r\n    <div class=\"col-md-4\">\r\n        <div ng-form=\"form\">\r\n            <fieldset class=\"form-group\">\r\n                <label>Product Name</label>\r\n                <input type=\"text\" class=\"form-control\" ng-model=\"item.Name\" required />\r\n                <br />\r\n                <button class=\"btn btn-primary pull-right\" ng-click=\"Save()\" ng-disabled=\"!form.$valid\">Save</button>\r\n            </fieldset>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("ApplicationComponents/Administrator/Survey/Views/Survey.html","<div ng-controller=\"SurveyController\">\r\n    <h3>Survey</h3>\r\n    <div class=\"row\">\r\n        <div class=\"col-md-12\">\r\n            <table>\r\n                <thead>\r\n                    <tr>\r\n                        <th></th>\r\n                        <th></th>\r\n                        <th></th>\r\n                        <th>&nbsp;Survey Name</th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody ng-repeat=\"item in items\">\r\n                    <tr>\r\n                        <td><button class=\"btn btn-primary btn-sm\" ng-click=\"Select(item.Id)\">Select</button></td>\r\n                        <td><button class=\"btn btn-primary btn-sm\" ng-click=\"Edit(item.Id)\">Edit</button></td>\r\n                        <td><button class=\"btn btn-danger btn-sm\" ng-click=\"Delete(item.Id)\">Delete</button></td>\r\n                        <td>&nbsp;{{item.Name}}</td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n        <hr />\r\n        <div class=\"col-md-12\">\r\n            <div ui-view></div>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("ApplicationComponents/Administrator/Survey/Views/SurveyAddEdit.html","<div ng-controller=\"SurveyAddEditController\">\r\n    <h3>Survey Detail</h3>\r\n    <div class=\"col-md-4\">\r\n        <div ng-form=\"form\">\r\n            <fieldset class=\"form-group\">\r\n                <label>Survey Name</label>\r\n                <input type=\"text\" class=\"form-control\" ng-model=\"item.Name\" required />\r\n                <br />\r\n                <button class=\"btn btn-primary pull-right\" ng-click=\"Save()\" ng-disabled=\"!form.$valid\">Save</button>\r\n            </fieldset>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("ApplicationComponents/Administrator/SurveyCustomerLocation/Views/SurveyCustomerLocation.html","<div ng-controller=\"SurveyCustomerLocationController\">\r\n    <h3>Survey Customer Location</h3>\r\n    <div class=\"row\">\r\n        <div class=\"col-md-12\">\r\n            <table>\r\n                <thead>\r\n                    <tr>\r\n                        <th></th>\r\n                        <th></th>\r\n                        <th>&nbsp;Customer</th>\r\n                        <th>&nbsp;Location</th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody ng-repeat=\"item in items\">\r\n                    <tr>\r\n                        <td><button class=\"btn btn-primary btn-sm\" ng-click=\"Edit(item.Id)\">Edit</button></td>\r\n                        <td><button class=\"btn btn-danger btn-sm\" ng-click=\"Delete(item.Id)\">Delete</button></td>\r\n                        <td>&nbsp;{{item.Customer.Name}}</td>\r\n                        <td>&nbsp;{{item.Location.Name}}</td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n        <hr />\r\n        <div class=\"col-md-12\">\r\n            <div ui-view></div>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("ApplicationComponents/Administrator/SurveyCustomerLocation/Views/SurveyCustomerLocationAddEdit.html","<div ng-controller=\"SurveyCustomerLocationAddEditController\">\r\n    <h3>Survey Customer Location Detail</h3>\r\n    <div class=\"col-md-4\">\r\n        <div ng-form=\"form\">\r\n            <fieldset class=\"form-group\">\r\n                <label>Customer</label>\r\n                <input type=\"text\" class=\"form-control\" typeahead-no-results=\"noResultsCustomers\" ng-model=\"item.Customer.Name\" uib-typeahead=\"item.Name for item in SearchCustomers($viewValue)\" \r\n                       ng-model-options=\"{ debounce: { \'default\': 500, \'blur\': 0 } }\"\r\n                       typeahead-on-select=\"SelectCustomer($item, $model, $label)\" required/>\r\n                <div ng-show=\"noResultsCustomers\">\r\n                    No Results Found!\r\n                </div>\r\n                <label>Location</label>\r\n                <input type=\"text\" class=\"form-control\" typeahead-no-results=\"noResultsLocation\" ng-model=\"item.Location.Name\" uib-typeahead=\"item.Name for item in SearchLocations($viewValue)\" \r\n                       ng-model-options=\"{ debounce: { \'default\': 500, \'blur\': 0 } }\"\r\n                       typeahead-on-select=\"SelectLocation($item, $model, $label)\" required />\r\n                <div ng-show=\"noResultsLocation\">\r\n                    No Results Found!\r\n                </div>\r\n                <br />\r\n                <button class=\"btn btn-primary pull-right\" ng-click=\"Save()\" ng-disabled=\"!form.$valid\">Save</button>\r\n            </fieldset>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("ApplicationComponents/Administrator/SurveyProductQuestion/Views/SurveyProductQuestion.html","<div ng-controller=\"SurveyProductQuestionController\">\r\n    <h3>Survey Product Question</h3>\r\n    <div class=\"row\">\r\n        <div class=\"col-md-12\">\r\n            <table>\r\n                <thead>\r\n                    <tr>\r\n                        <th></th>\r\n                        <th></th>\r\n                        <th>&nbsp;Product</th>\r\n                        <th>&nbsp;Question</th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody ng-repeat=\"item in items\">\r\n                    <tr>\r\n                        <td><button class=\"btn btn-primary btn-sm\" ng-click=\"Edit(item.Id)\">Edit</button></td>\r\n                        <td><button class=\"btn btn-danger btn-sm\" ng-click=\"Delete(item.Id)\">Delete</button></td>\r\n                        <td>&nbsp;{{item.Product.Name}}</td>\r\n                        <td>&nbsp;{{item.Question.Name}}</td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n        <hr />\r\n        <div class=\"col-md-12\">\r\n            <div ui-view></div>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("ApplicationComponents/Administrator/SurveyProductQuestion/Views/SurveyProductQuestionAddEdit.html","<div ng-controller=\"SurveyProductQuestionAddEditController\">\r\n    <h3>Survey Product Question Detail</h3>\r\n    <div class=\"col-md-4\">\r\n        <div ng-form=\"form\">\r\n            <fieldset class=\"form-group\">\r\n                <label>Product</label>\r\n                <input type=\"text\" class=\"form-control\" typeahead-no-results=\"noResultsProduct\" ng-model=\"item.Product.Name\" uib-typeahead=\"item.Name for item in SearchProducts($viewValue)\"\r\n                       ng-model-options=\"{ debounce: { \'default\': 500, \'blur\': 0 } }\"\r\n                       typeahead-on-select=\"SelectProduct($item, $model, $label)\" required />\r\n                <div ng-show=\"noResultsProduct\">\r\n                    No Results Found!\r\n                </div>\r\n                <label>Question</label>\r\n                <input type=\"text\" class=\"form-control\" typeahead-no-results=\"noResultsQuestion\" ng-model=\"item.Question.Name\" uib-typeahead=\"item.Name for item in SearchQuestions($viewValue)\"\r\n                       ng-model-options=\"{ debounce: { \'default\': 500, \'blur\': 0 } }\"\r\n                       typeahead-on-select=\"SelectQuestion($item, $model, $label)\" required />\r\n                <div ng-show=\"noResultsQuestion\">\r\n                    No Results Found!\r\n                </div>\r\n                <br />\r\n                <button class=\"btn btn-primary pull-right\" ng-click=\"Save()\" ng-disabled=\"!form.$valid\">Save</button>\r\n            </fieldset>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("ApplicationComponents/Administrator/UserRole/Views/UserRole.html","<div ng-controller=\"UserRoleController\">\r\n    <h3>User Role</h3>\r\n    <div class=\"row\">\r\n        <div class=\"col-md-12\">\r\n            <table>\r\n                <thead>\r\n                    <tr>\r\n                        <!--<th></th>-->\r\n                        <th></th>\r\n                        <th>&nbsp;User</th>\r\n                        <th>&nbsp;Role</th>\r\n                        <th>&nbsp;Customer</th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody ng-repeat=\"item in items\">\r\n                    <tr>\r\n                        <!--<td><button class=\"btn btn-primary btn-sm\" ng-click=\"Edit(item.Id)\">Edit</button></td>-->\r\n                        <td><button class=\"btn btn-danger btn-sm\" ng-click=\"Delete(item.Id)\">Delete</button></td>\r\n                        <td>&nbsp;{{item.User.UserName}}</td>\r\n                        <td>&nbsp;{{item.Role.Name}}</td>\r\n                        <td>&nbsp;{{item.Customer.Name}}</td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n        <hr />\r\n        <div class=\"col-md-12\">\r\n            <div ui-view></div>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("ApplicationComponents/Administrator/UserRole/Views/UserRoleAddEdit.html","<div ng-controller=\"UserRoleAddEditController\">\r\n    <h3>User Role Detail</h3>\r\n    <div class=\"col-md-4\">\r\n        <div ng-form=\"form\">\r\n            <fieldset class=\"form-group\">\r\n                <label>User Name</label>\r\n                <input type=\"text\" class=\"form-control\" ng-model=\"item.User.UserName\" required />\r\n                <label>Role</label>\r\n                <select required class=\"form-control\" ng-model=\"item.Role\" ng-options=\"x.Name for x in Roles\"></select>\r\n                <br />\r\n                <label>Customer</label>\r\n                <select required class=\"form-control\" ng-model=\"item.Customer\" ng-options=\"x.Name for x in Customers\"></select>\r\n                <br />\r\n                <button class=\"btn btn-primary pull-right\" ng-click=\"Save()\" ng-disabled=\"!form.$valid\">Save</button>\r\n            </fieldset>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("ApplicationComponents/Administrator/Question/Views/Question.html","<div ng-controller=\"QuestionController\">\r\n    <h3>Question</h3>\r\n    <div class=\"row\">\r\n        <div class=\"col-md-12\">\r\n            <table>\r\n                <thead>\r\n                    <tr>\r\n                        <th></th>\r\n                        <th></th>\r\n                        <th>&nbsp;Question Name</th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody ng-repeat=\"item in items\">\r\n                    <tr>\r\n                        <td><button class=\"btn btn-primary btn-sm\" ng-click=\"Edit(item.Id)\">Edit</button></td>\r\n                        <td><button class=\"btn btn-danger btn-sm\" ng-click=\"Delete(item.Id)\">Delete</button></td>\r\n                        <td>&nbsp;{{item.Name}}</td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n        <hr />\r\n        <div class=\"col-md-12\">\r\n            <div ui-view></div>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("ApplicationComponents/Administrator/Question/Views/QuestionAddEdit.html","<div ng-controller=\"QuestionAddEditController\">\r\n    <h3>Question Detail</h3>\r\n    <div class=\"col-md-4\">\r\n        <div ng-form=\"form\">\r\n            <fieldset class=\"form-group\">\r\n                <label>Question Name</label>\r\n                <input type=\"text\" class=\"form-control\" ng-model=\"item.Name\" required />\r\n                <br />\r\n                <button class=\"btn btn-primary pull-right\" ng-click=\"Save()\" ng-disabled=\"!form.$valid\">Save</button>\r\n            </fieldset>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("ApplicationComponents/Report/Main/CellTemplates/EditDelete.html","<div>\r\n    <span class=\"btn btn-primary btn-sm\" ng-click=\"grid.appScope.Edit(row.entity)\">Edit</span>\r\n    <span class=\"btn btn-danger btn-sm\" ng-click=\"grid.appScope.Delete(row.entity.Id)\">Delete</span>\r\n</div>");}]);