angular.module("Main").run(["$templateCache", function($templateCache) {$templateCache.put("ApplicationComponents/DataEntry/CustomerLocation/MerchandiseCustomerLocation.html","<div ng-controller=\"MerchandiseCustomerLocationController\">\r\n    <div class=\"col-md-4\"></div>\r\n    <div class=\"col-md-2\">\r\n        <label>Company</label>\r\n        <select class=\"form-control\" ng-model=\"SelectedCompany\" ng-options=\"x.Name for x in Company\" ng-change=\"SelectCompany()\"></select><br/>\r\n        <label>Customer</label>\r\n        <select class=\"form-control\" ng-model=\"SelectedCustomer\" ng-options=\"x.Name for x in Customer\" ng-change=\"SelectCustomer()\"></select><br />\r\n        <label>Store</label>\r\n        <select class=\"form-control\" ng-model=\"SelectedLocation\" ng-options=\"x.Name for x in Location\" ng-change=\"SelectLocation()\"></select><br />\r\n        <label>Survey</label>\r\n        <select class=\"form-control\" ng-model=\"SelectedSurvey\" ng-options=\"x.Survey.Name for x in Survey\" ng-change=\"SelectSurvey()\"></select>\r\n        <br/>\r\n        <button class=\"btn btn-primary pull-right\" ng-click=\"SelectSurvey()\" ng-show=\"IsGoShown()\">Go</button>\r\n    </div>\r\n    <div class=\"col-md-6\"></div>\r\n</div>");
$templateCache.put("ApplicationComponents/DataEntry/Survey/MerchandiseSurvey.html","<div ng-controller=\"MerchandiseSurveyController\">\r\n    <div class=\"container\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-3 col-sm-12 col-xs-12\">\r\n                <div class=\"pull-left\">\r\n                    <div class=\"panel panel-primary\">\r\n                        <div class=\"panel-heading\">\r\n                            <h3 class=\"panel-title\">Survey Information</h3>\r\n                        </div>\r\n                        <div class=\"panel-body\">\r\n                            <label for=\"surveyName\">Survey Name</label>\r\n                            <p id=\"surveyName\">{{Survey.Name}}</p>\r\n                            <label for=\"customer\">Customer Name</label>\r\n                            <p id=\"customer\">{{Customer.Name}}</p>\r\n                            <label for=\"locationName\">Location Name</label>\r\n                            <p id=\"locationName\">{{Location.Name}}</p>\r\n                            <label for=\"locationAddress\">Location Address</label>\r\n                            <p id=\"locationAddress\">{{Location.Address}}</p>\r\n                            <label for=\"manager\">Location Manager</label>\r\n                            <p id=\"manager\">{{Location.AreaManager}}</p>\r\n                        </div>\r\n                    </div>                    \r\n                </div>\r\n            </div>\r\n            <div class=\"col-md-3 col-sm-12 col-xs-12\">\r\n                <div class=\"pull-left\">\r\n                    <label for=\"notes\">Notes</label>\r\n                    <br />\r\n                    <textarea class=\"form-control\" id=\"notes\" ng-model=\"Header.Notes\" style=\"height:200px; width:100vh;\">{{Header.Notes}}</textarea>\r\n                </div>\r\n                <br/>\r\n            </div>\r\n            <div class=\"col-md-6 col-sm-12 col-xs-12\">\r\n                <div class=\"pull-left\">\r\n                    <label>Before Image</label>\r\n                    <br />\r\n                    <!--http://stackoverflow.com/questions/17922557/angularjs-how-to-check-for-changes-in-file-input-fields-->\r\n                    <label class=\"btn btn-primary btn-sm btn-file\">\r\n                        Choose Image <input type=\"file\" accept=\"image/*\" style=\"display: none;\" onchange=\"angular.element(this).scope().setBeforeImage(this)\">\r\n                    </label>\r\n                    <button class=\"btn btn-danger btn-sm\" ng-click=\"DeleteBeforeImage()\" ng-disabled=\"Header.BeforeImage == null && BeforeImage == null\">Delete Image</button>\r\n                    <br />\r\n                    <img id=\"BeforeImage\" ng-src=\"{{BeforeImage}}\" ng-show=\"BeforeImage !== null\" alt=\"No Image Found\" style=\"max-width:400px; max-height:400px\" />\r\n                    <!--<canvas id=\"CanvasBeforeImage\" style=\"max-width:400px; max-height:400px\"></canvas>-->\r\n                    <br />\r\n                    <table border=\"1\">\r\n                        <thead>\r\n                            <tr>\r\n                                <th>\r\n                                    Product\r\n                                </th>\r\n                                <th>\r\n                                    Question\r\n                                </th>\r\n                                <th>\r\n                                    Answer\r\n                                </th>\r\n                            </tr>\r\n                        </thead>\r\n                        <tbody>\r\n                            <tr ng-repeat=\"item in Detail | orderBy: [\'Product.Name\',\'Question.Name\'] \">\r\n                                <td>\r\n                                    {{item.Product.Name}}\r\n                                </td>\r\n                                <td>\r\n                                    {{item.Question.Name}}\r\n                                </td>\r\n                                <td>\r\n                                    <input ng-model=\"item.Answer\" type=\"text\" placeholder=\"Answer...\" class=\"form-control input-sm\" />\r\n                                </td>\r\n                            </tr>\r\n                        </tbody>\r\n                    </table>\r\n                    <label>After Image</label>\r\n                    <br />\r\n                    <!--http://stackoverflow.com/questions/17922557/angularjs-how-to-check-for-changes-in-file-input-fields-->\r\n                    <label class=\"btn btn-primary btn-sm btn-file\">\r\n                        Choose File <input type=\"file\" accept=\"image/*\" style=\"display: none;\" onchange=\"angular.element(this).scope().setAfterImage(this)\">\r\n                    </label>\r\n                    <button class=\"btn btn-danger btn-sm\" ng-click=\"DeleteAfterImage()\" ng-disabled=\"Header.AfterImage == null && AfterImage == null\">Delete Image</button>\r\n                    <br />\r\n                    <img id=\"AfterImage\" ng-src=\"{{AfterImage}}\" ng-show=\"AfterImage !== null\" alt=\"No Image Found\" style=\"max-width:400px; max-height:400px\" />\r\n                    <!--<canvas id=\"CanvasAfterImage\" style=\"max-width:400px; max-height:400px\"></canvas>-->\r\n                    <br />\r\n                    <button class=\"btn btn-primary btn-sm pull-right\" ng-click=\"Save()\">Save</button>\r\n                    </div>\r\n                </div>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("ApplicationComponents/DataEntry/SurveyData/MerchandiseSurveyData.html","<div ng-controller=\"MerchandiseSurveyDataController\">\r\n    <div ui-grid=\"grid.options\" ui-grid-exporter style=\"width:99%;height:100%;\"></div>\r\n</div>");
$templateCache.put("ApplicationComponents/Main/Views/Main.html","<div ng-controller=\"MainController\">\r\n    <div class=\"navbar navbar-inverse navbar-fixed-top\">\r\n        <div class=\"container\">\r\n            <div class=\"navbar-header\">\r\n                <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#navbar\">\r\n                    <span class=\"icon-bar\"></span>\r\n                    <span class=\"icon-bar\"></span>\r\n                    <span class=\"icon-bar\"></span>\r\n                </button>\r\n                <a class=\"navbar-brand\" ng-click=\"GoTo(\'main.admin.company.addedit\')\">Merchandiser</a>\r\n            </div>\r\n            <div class=\"collapse navbar-collapse\" id=\"navbar\">\r\n                <ul class=\"nav navbar-nav\">\r\n                    <li><a ng-click=\"GoTo(\'main.admin.company.addedit\')\">Admin</a></li>\r\n                    <li><a ng-click=\"GoTo(\'main.survey\')\">Survey</a></li>\r\n                    <li><a ng-click=\"GoTo(\'main.report.surveyreport\')\">Report</a></li>\r\n                    <!--<li><a ng-click=\"GoTo(\'main.map\')\">Map</a></li>-->\r\n\r\n                </ul>\r\n                <ul class=\"nav navbar-nav navbar-right\">\r\n                    <li><a>Hello {{Username}}!</a></li>\r\n                    <li><a ng-click=\"Logout()\">Log off</a></li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div ui-view></div>\r\n</div>\r\n");
$templateCache.put("ApplicationComponents/Reporting/Location/LocationReport.html","<div ng-controller=\"LocationReportController\">\r\n        <div class=\"col-md-2\">\r\n            <h4>Positions</h4>\r\n            <ul class=\"list-group\" style=\"height: 75vh; overflow: hidden; overflow-y: scroll;\">\r\n                <li class=\"list-group-item\" ng-repeat=\"position in positions\" ng-click=\"SelectPosition(position)\" ng-style=\"position.Id === SelectedPosition.Id ? {\'background-color\': \'#428bca\'} : { \'background-color\': \'white\'} \">\r\n                    {{position.FirstName}} {{position.LastName}} {{position.Created | date: \'MM/dd/yyyy\'}}\r\n                </li>\r\n            </ul>\r\n        </div>\r\n        <div class=\"col-md-10\">\r\n            <ng-map zoom=\"10\" center=\"current-location\" style=\"height: 75vh; \">\r\n                <info-window id=\"myInfoWindow\">\r\n                    <div ng-non-bindable>\r\n                        {{position.FirstName}} {{position.LastName}}\r\n                    </div>\r\n                </info-window>\r\n                <div ng-repeat=\"position in positions track by $index\">\r\n                    <marker id=\"{{$index}}\" position=\"{{position.Latitude}}, {{position.Longitude}}\" on-click=\"SelectMarker(event, position)\"></marker>\r\n                </div>\r\n            </ng-map>\r\n        </div>\r\n</div>");
$templateCache.put("ApplicationComponents/Reporting/Report/Report.html","<div ng-controller=\"ReportController\">\r\n    <div class=\"row\">\r\n        <div class=\"col-md-2\">\r\n            <ul class=\"list-group\" style=\"color:black;\">\r\n                <li ui-sref-active=\"active\" class=\"list-group-item\" ng-click=\"Route(\'main.report.surveyreport\')\" ui-sref=\"main.report.surveyreport\">Survey Report</li>\r\n                <!--<li ui-sref-active=\"active\" class=\"list-group-item\" ng-click=\"Route(\'main.report.weeklyreport\')\" ui-sref=\"main.report.weeklyreport\">Weekly Report</li>-->\r\n                <li ui-sref-active=\"active\" class=\"list-group-item\" ng-click=\"Route(\'main.report.locationreport\')\" ui-sref=\"main.report.locationreport\">Location Report</li>\r\n                <!--<li ui-sref-active=\"active\" class=\"list-group-item\" ng-click=\"Route(\'main.report.notereport\')\" ui-sref=\"main.report.notereport\">Notes Report</li>-->\r\n            </ul>\r\n        </div>\r\n        <div class=\"col-md-10\">\r\n            <div class=\"row\">\r\n                <div class=\"col-md-12\">\r\n                    <div ui-view></div>\r\n                </div>\r\n                <!--<div class=\"col-md-2\" style=\"padding-right:20px;\">\r\n                    <div class=\"panel panel-primary\" ng-show=\"SelectedCompany.Id !== undefined\">\r\n                        <div class=\"panel-heading\">\r\n                            <h3 class=\"panel-title\">Selected Company</h3>\r\n                        </div>\r\n                        <div class=\"panel-body\">\r\n                            {{SelectedCompany.Name}}\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"panel panel-primary\" ng-show=\"SelectedSurvey.Id !== undefined\">\r\n                        <div class=\"panel-heading\">\r\n                            <h3 class=\"panel-title\">Selected Survey</h3>\r\n                        </div>\r\n                        <div class=\"panel-body\">\r\n                            {{SelectedSurvey.Name}}\r\n                        </div>\r\n                    </div>\r\n                </div>-->\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n");
$templateCache.put("ApplicationComponents/Reporting/Survey/SurveyReport.html","<div ng-controller=\"SurveyReportController\">\r\n    <button class=\"btn btn-primary btn-sm pull-right\" ng-click=\"Download()\">Download</button>\r\n    Start Date:\r\n    <md-datepicker ng-model=\"StartDate\" md-placeholder=\"Enter date\" md-min-date=\"MinDate\" md-max-date=\"MaxDate\" ng-change=\"DateChange()\"></md-datepicker>\r\n    End Date:\r\n    <md-datepicker ng-model=\"EndDate\" md-placeholder=\"Enter date\" md-min-date=\"MinDate\" md-max-date=\"MaxDate\" ng-change=\"DateChange()\"></md-datepicker>\r\n    <div class=\"grid\" ui-grid-infinite-scroll ui-grid=\"gridOptions\"></div>\r\n</div>");
$templateCache.put("ApplicationComponents/Reporting/Weekly/WeeklyReport.html","<div ng-controller=\"WeeklyReportController\">\r\n    StartDate: {{StartDate}}<br />\r\n    EndDate: {{EndDate}}<br />\r\n    <div class=\"grid\" ui-grid-exporter ui-grid=\"gridOptions\"></div>\r\n</div>");
$templateCache.put("ApplicationComponents/Administrator/Admin/Views/Admin.html","<div ng-controller=\"AdminController\">\r\n    <div class=\"row\">\r\n        <div class=\"col-md-2\">\r\n            <ul class=\"list-group\" style=\"color:black;\">\r\n                <li ui-sref-active=\"active\" class=\"list-group-item\" ng-click=\"Route(\'main.admin.company.addedit\')\" ui-sref=\"main.admin.company.addedit\">Companies</li>\r\n                <li ui-sref-active=\"active\" class=\"list-group-item\" ng-click=\"Route(\'main.admin.customer.addedit\')\" ui-sref=\"main.admin.customer.addedit\">Customers</li>\r\n                <li ui-sref-active=\"active\" class=\"list-group-item\" ng-click=\"Route(\'main.admin.location.addedit\')\" ui-sref=\"main.admin.location.addedit\">Locations</li>\r\n                <li ui-sref-active=\"active\" class=\"list-group-item\" ng-click=\"Route(\'main.admin.product.addedit\')\" ui-sref=\"main.admin.product.addedit\">Products</li>\r\n                <li ui-sref-active=\"active\" class=\"list-group-item\" ng-click=\"Route(\'main.admin.question.addedit\')\" ui-sref=\"main.admin.question.addedit\">Questions</li>\r\n                <li ui-sref-active=\"active\" class=\"list-group-item\" ng-click=\"Route(\'main.admin.userrole.addedit\')\" ui-sref=\"main.admin.userrole.addedit\">Users</li>\r\n                <li ui-sref-active=\"active\" class=\"list-group-item\" ng-click=\"Route(\'main.admin.survey.addedit\')\" ui-sref=\"main.admin.survey.addedit\">Surveys</li>\r\n                <li ui-sref-active=\"active\" class=\"list-group-item\" ng-click=\"Route(\'main.admin.surveycustomerlocation.addedit\')\" ui-sref=\"main.admin.surveycustomerlocation.addedit\">Survey Customers and Locations</a></li>\r\n                <li ui-sref-active=\"active\" class=\"list-group-item\" ng-click=\"Route(\'main.admin.surveyproductquestion.addedit\')\" ui-sref=\"main.admin.surveyproductquestion.addedit\">Survey Products and Questions</></li>\r\n            </ul>\r\n        </div>\r\n        <div class=\"col-md-10\">\r\n            <div class=\"row\">\r\n                <div class=\"col-md-10\">\r\n                    <div ui-view></div>\r\n                </div>\r\n                <div class=\"col-md-2\" style=\"padding-right:20px;\">\r\n                    <div class=\"panel panel-primary\">\r\n                        <div class=\"panel-heading\">\r\n                            <h3 class=\"panel-title\">Selected Company</h3>\r\n                        </div>\r\n                        <div class=\"panel-body\">\r\n                            {{SelectedCompany.Name}}\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"panel panel-primary\">\r\n                        <div class=\"panel-heading\">\r\n                            <h3 class=\"panel-title\">Selected Survey</h3>\r\n                        </div>\r\n                        <div class=\"panel-body\">\r\n                            {{SelectedSurvey.Name}}\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n");
$templateCache.put("ApplicationComponents/Administrator/Company/Views/Company.html","<div ng-controller=\"CompanyController\">\r\n    <h3>Company</h3>\r\n    <div class=\"row\">\r\n        <div class=\"col-md-12\">\r\n            <table>\r\n                <thead>\r\n                    <tr>\r\n                        <th></th>\r\n                        <th></th>\r\n                        <th></th>\r\n                        <th>&nbsp;Company Name</th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody ng-repeat=\"item in items\">\r\n                    <tr>\r\n                        <td><button class=\"btn btn-primary btn-sm\" ng-click=\"Select(item.Id)\">Select</button></td>\r\n                        <td><button class=\"btn btn-primary btn-sm\" ng-click=\"Edit(item.Id)\">Edit</button></td>\r\n                        <td><button class=\"btn btn-danger btn-sm\" ng-click=\"Delete(item.Id)\">Delete</button></td>\r\n                        <td>&nbsp;{{item.Name}}</td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n        <hr />\r\n        <div class=\"col-md-12\">\r\n            <div ui-view></div>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("ApplicationComponents/Administrator/Company/Views/CompanyAddEdit.html","<div ng-controller=\"CompanyAddEditController\">\r\n    <h3>Company Detail</h3>\r\n    <div class=\"col-md-4\">\r\n        <div ng-form=\"form\">\r\n            <fieldset class=\"form-group\">\r\n                <label>Company Name</label>\r\n                <input type=\"text\" class=\"form-control\" ng-model=\"item.Name\" required focus-if  />\r\n                <br />\r\n                <button class=\"btn btn-primary pull-right\" ng-click=\"Save()\" ng-disabled=\"!form.$valid\">Save</button>\r\n            </fieldset>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("ApplicationComponents/Administrator/Customer/Views/Customer.html","<div ng-controller=\"CustomerController\">\r\n    <h3>Customer</h3>\r\n    <div class=\"row\">\r\n        <div class=\"col-md-12\">\r\n            <div class=\"grid\" ui-grid=\"gridOptions\"></div>\r\n        </div>\r\n        <hr />\r\n        <div class=\"col-md-12\">\r\n            <div ui-view></div>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("ApplicationComponents/Administrator/Customer/Views/CustomerAddEdit.html","<div ng-controller=\"CustomerAddEditController\">\r\n    <h3>Customer Detail</h3>\r\n    <div class=\"col-md-4\">\r\n        <div ng-form=\"form\">\r\n            <fieldset class=\"form-group\">\r\n                <label>Customer Name</label>\r\n                <input type=\"text\" class=\"form-control\" ng-model=\"item.Name\" required focus-if  />\r\n                <br />\r\n                <md-switch class=\"md-primary\" aria-label=\"Send Report\" ng-model=\"item.IsSendReport\">\r\n                    <b>Send Report</b>           \r\n                </md-switch>\r\n                <br/>\r\n                <button class=\"btn btn-primary pull-right\" ng-click=\"Save()\" ng-disabled=\"!form.$valid\">Save</button>\r\n            </fieldset>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("ApplicationComponents/Administrator/Location/Views/Location.html","<div ng-controller=\"LocationController\">\r\n    <h3>Location</h3>\r\n    <div class=\"row\">\r\n        <div class=\"col-md-12\">\r\n            <div class=\"grid\" ui-grid=\"gridOptions\"></div>\r\n        </div>\r\n        <hr />\r\n        <div class=\"col-md-12\">\r\n            <div ui-view></div>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("ApplicationComponents/Administrator/Location/Views/LocationAddEdit.html","<div ng-controller=\"LocationAddEditController\">\r\n    <h3>Location Detail</h3>\r\n    <div class=\"col-md-4\">\r\n        <div ng-form=\"form\">\r\n            <fieldset class=\"form-group\">\r\n                <label>Location Name</label>\r\n                <input type=\"text\" class=\"form-control\" ng-model=\"item.Name\" maxlength=\"100\" required focus-if  />\r\n                <label>Store</label>\r\n                <input type=\"text\" class=\"form-control\" ng-model=\"item.Store\" maxlength=\"100\" />\r\n                <label>Address</label>\r\n                <!--<input type=\"text\" class=\"form-control\" ng-model=\"item.Address\" maxlength=\"100\" ng-model-options=\"{ debounce: 1000 }\" ng-change=\"AddressChange()\" />-->\r\n                <input type=\"text\" \r\n                       class=\"form-control\" \r\n                       typeahead-no-results=\"noResultsAddress\" \r\n                       ng-model=\"item.Address\" \r\n                       uib-typeahead=\"item.formatted_address for item in ChangeAddress($viewValue)\"\r\n                       ng-model-options=\"{ debounce: { \'default\': 1000, \'blur\': 0 } }\"\r\n                       typeahead-on-select=\"SelectAddress($item, $model, $label)\" required />\r\n                <div ng-show=\"noResultsAddress\">\r\n                    No Results Found!\r\n                </div>\r\n                <label>Area Manager</label>\r\n                <input type=\"text\" class=\"form-control\" ng-model=\"item.AreaManager\" maxlength=\"100\" />\r\n                <br />\r\n                <button class=\"btn btn-primary pull-right\" ng-click=\"Save()\" ng-disabled=\"!form.$valid\">Save</button>\r\n            </fieldset>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("ApplicationComponents/Administrator/Product/Views/Product.html","<div ng-controller=\"ProductController\">\r\n    <h3>Product</h3>\r\n    <div class=\"row\">\r\n        <div class=\"col-md-12\">\r\n            <div class=\"grid\" ui-grid=\"gridOptions\"></div>\r\n        </div>\r\n        <hr />\r\n        <div class=\"col-md-12\">\r\n            <div ui-view></div>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("ApplicationComponents/Administrator/Product/Views/ProductAddEdit.html","<div ng-controller=\"ProductAddEditController\">\r\n    <h3>Product Detail</h3>\r\n    <div class=\"col-md-4\">\r\n        <div ng-form=\"form\">\r\n            <fieldset class=\"form-group\">\r\n                <label>Product Name</label>\r\n                <input type=\"text\" class=\"form-control\" ng-model=\"item.Name\" required focus-if  />\r\n                <br />\r\n                <button class=\"btn btn-primary pull-right\" ng-click=\"Save()\" ng-disabled=\"!form.$valid\">Save</button>\r\n            </fieldset>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("ApplicationComponents/Administrator/Question/Views/Question.html","<div ng-controller=\"QuestionController\">\r\n    <h3>Question</h3>\r\n    <div class=\"row\">\r\n        <div class=\"col-md-12\">\r\n            <div class=\"grid\" ui-grid=\"gridOptions\"></div>\r\n        </div>\r\n        <hr />\r\n        <div class=\"col-md-12\">\r\n            <div ui-view></div>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("ApplicationComponents/Administrator/Question/Views/QuestionAddEdit.html","<div ng-controller=\"QuestionAddEditController\">\r\n    <h3>Question Detail</h3>\r\n    <div class=\"col-md-4\">\r\n        <div ng-form=\"form\">\r\n            <fieldset class=\"form-group\">\r\n                <label>Question Name</label>\r\n                <input type=\"text\" class=\"form-control\" ng-model=\"item.Name\" required focus-if  />\r\n                <br />\r\n                <button class=\"btn btn-primary pull-right\" ng-click=\"Save()\" ng-disabled=\"!form.$valid\">Save</button>\r\n            </fieldset>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("ApplicationComponents/Administrator/SurveyCustomerLocation/Views/SurveyCustomerLocation.html","<div ng-controller=\"SurveyCustomerLocationController\">\r\n    <h3>Survey Customer Location</h3>\r\n    <div class=\"row\">\r\n        <div class=\"col-md-12\">\r\n            <div class=\"grid\" ui-grid=\"gridOptions\"></div>\r\n        </div>\r\n        <hr />\r\n        <div class=\"col-md-12\">\r\n            <div ui-view></div>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("ApplicationComponents/Administrator/SurveyCustomerLocation/Views/SurveyCustomerLocationAddEdit.html","<div ng-controller=\"SurveyCustomerLocationAddEditController\">\r\n    <h3>Survey Customer Location Detail</h3>\r\n    <div class=\"col-md-4\">\r\n        <div ng-form=\"form\">\r\n            <fieldset class=\"form-group\">\r\n                <label>Customer</label>\r\n                <input type=\"text\" class=\"form-control\" typeahead-no-results=\"noResultsCustomers\" ng-model=\"item.Customer.Name\" uib-typeahead=\"item.Name for item in SearchCustomers($viewValue)\" \r\n                       ng-model-options=\"{ debounce: { \'default\': 500, \'blur\': 0 } }\"\r\n                       typeahead-on-select=\"SelectCustomer($item, $model, $label)\" required focus-if />\r\n                <div ng-show=\"noResultsCustomers\">\r\n                    No Results Found!\r\n                </div>\r\n                <label>Location</label>\r\n                <input type=\"text\" class=\"form-control\" typeahead-no-results=\"noResultsLocation\" ng-model=\"item.Location.Name\" uib-typeahead=\"item.Name for item in SearchLocations($viewValue)\" \r\n                       ng-model-options=\"{ debounce: { \'default\': 500, \'blur\': 0 } }\"\r\n                       typeahead-on-select=\"SelectLocation($item, $model, $label)\" required />\r\n                <div ng-show=\"noResultsLocation\">\r\n                    No Results Found!\r\n                </div>\r\n                <br />\r\n                <button class=\"btn btn-primary pull-right\" ng-click=\"Save()\" ng-disabled=\"!form.$valid\">Save</button>\r\n            </fieldset>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("ApplicationComponents/Administrator/Survey/Views/Survey.html","<div ng-controller=\"SurveyController\">\r\n    <h3>Survey</h3>\r\n    <div class=\"row\">\r\n        <div class=\"col-md-12\">\r\n            <table>\r\n                <thead>\r\n                    <tr>\r\n                        <th></th>\r\n                        <th></th>\r\n                        <th></th>\r\n                        <th>&nbsp;Survey Name</th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody ng-repeat=\"item in items\">\r\n                    <tr>\r\n                        <td><button class=\"btn btn-primary btn-sm\" ng-click=\"Select(item.Id)\">Select</button></td>\r\n                        <td><button class=\"btn btn-primary btn-sm\" ng-click=\"Edit(item.Id)\">Edit</button></td>\r\n                        <td><button class=\"btn btn-danger btn-sm\" ng-click=\"Delete(item.Id)\">Delete</button></td>\r\n                        <td>&nbsp;{{item.Name}}</td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n        <hr />\r\n        <div class=\"col-md-12\">\r\n            <div ui-view></div>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("ApplicationComponents/Administrator/Survey/Views/SurveyAddEdit.html","<div ng-controller=\"SurveyAddEditController\">\r\n    <h3>Survey Detail</h3>\r\n    <div class=\"col-md-4\">\r\n        <div ng-form=\"form\">\r\n            <fieldset class=\"form-group\">\r\n                <label>Survey Name</label>\r\n                <input type=\"text\" class=\"form-control\" ng-model=\"item.Name\" required focus-if  />\r\n                <br />\r\n                <button class=\"btn btn-primary pull-right\" ng-click=\"Save()\" ng-disabled=\"!form.$valid\">Save</button>\r\n            </fieldset>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("ApplicationComponents/Administrator/SurveyProductQuestion/Views/SurveyProductQuestion.html","<div ng-controller=\"SurveyProductQuestionController\">\r\n    <h3>Survey Product Question</h3>\r\n    <div class=\"row\">\r\n        <div class=\"col-md-12\">\r\n            <div class=\"grid\" ui-grid=\"gridOptions\"></div>\r\n        </div>\r\n        <hr />\r\n        <div class=\"col-md-12\">\r\n            <div ui-view></div>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("ApplicationComponents/Administrator/SurveyProductQuestion/Views/SurveyProductQuestionAddEdit.html","<div ng-controller=\"SurveyProductQuestionAddEditController\">\r\n    <h3>Survey Product Question Detail</h3>\r\n    <div class=\"col-md-4\">\r\n        <div ng-form=\"form\">\r\n            <fieldset class=\"form-group\">\r\n                <label>Product</label>\r\n                <input type=\"text\" class=\"form-control\" typeahead-no-results=\"noResultsProduct\" ng-model=\"item.Product.Name\" uib-typeahead=\"item.Name for item in SearchProducts($viewValue)\"\r\n                       ng-model-options=\"{ debounce: { \'default\': 500, \'blur\': 0 } }\"\r\n                       typeahead-on-select=\"SelectProduct($item, $model, $label)\" required focus-if  />\r\n                <div ng-show=\"noResultsProduct\">\r\n                    No Results Found!\r\n                </div>\r\n                <label>Question</label>\r\n                <input type=\"text\" class=\"form-control\" typeahead-no-results=\"noResultsQuestion\" ng-model=\"item.Question.Name\" uib-typeahead=\"item.Name for item in SearchQuestions($viewValue)\"\r\n                       ng-model-options=\"{ debounce: { \'default\': 500, \'blur\': 0 } }\"\r\n                       typeahead-on-select=\"SelectQuestion($item, $model, $label)\" required />\r\n                <div ng-show=\"noResultsQuestion\">\r\n                    No Results Found!\r\n                </div>\r\n                <br />\r\n                <button class=\"btn btn-primary pull-right\" ng-click=\"Save()\" ng-disabled=\"!form.$valid\">Save</button>\r\n            </fieldset>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("ApplicationComponents/Administrator/UserRole/Views/UserRole.html","<div ng-controller=\"UserRoleController\">\r\n    <h3>User Role</h3>\r\n    <div class=\"row\">\r\n        <div class=\"col-md-12\">           \r\n            <div class=\"grid\" ui-grid=\"gridOptions\"></div>\r\n        </div>\r\n        <hr />\r\n        <div class=\"col-md-12\">\r\n            <div ui-view></div>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("ApplicationComponents/Administrator/UserRole/Views/UserRoleAddEdit.html","<div ng-controller=\"UserRoleAddEditController\">\r\n    <h3>User Role Detail</h3>\r\n    <div class=\"col-md-4\">\r\n        <div ng-form=\"form\">\r\n            <fieldset class=\"form-group\">\r\n                <label>User Name</label>\r\n                <input required type=\"text\" class=\"form-control\" ng-model=\"item.User.UserName\" focus-if />\r\n                <label>Role</label>\r\n                <select required class=\"form-control\" ng-model=\"item.Role\" ng-options=\"x.Name for x in Roles\"></select>\r\n                <label>Customer</label>\r\n                <select class=\"form-control\" ng-model=\"item.Customer\" ng-options=\"x.Name for x in Customers\"></select>\r\n                <br />\r\n                <button class=\"btn btn-primary pull-right\" ng-click=\"Save()\" ng-disabled=\"!form.$valid\">Save</button>\r\n            </fieldset>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("ApplicationComponents/Reporting/Modal/Image/ImageModal.html","\r\n<div class=\"modal-header\">\r\n    <h3 class=\"modal-title\" id=\"modal-title\">{{title}}</h3>\r\n</div>\r\n<div class=\"modal-body\" id=\"modal-body\">\r\n    <div class=\"text-center\">\r\n        <img ng-src=\"{{image}}\" ng-show=\"Image !== null\" alt=\"No Image Found\" style=\"max-width:400px; max-height:400px;\" />\r\n    </div>\r\n</div>\r\n<div class=\"modal-footer\">\r\n    <!--<button class=\"btn btn-primary\" type=\"button\" ng-click=\"$scope.ok()\">OK</button>-->\r\n    <button class=\"btn btn-primary\" type=\"button\" ng-click=\"$scope.cancel()\">Close</button>\r\n</div>");
$templateCache.put("ApplicationComponents/Reporting/Modal/Note/NoteModal.html","\r\n<div class=\"modal-header\">\r\n    <h3 class=\"modal-title\" id=\"modal-title\">Note</h3>\r\n</div>\r\n<div class=\"modal-body text-center\" id=\"modal-body\">\r\n    <textarea style=\"width:100%; height:50vh;\">{{note}}</textarea>\r\n</div>\r\n<div class=\"modal-footer\">\r\n    <!--<button class=\"btn btn-primary\" type=\"button\" ng-click=\"$scope.ok()\">OK</button>-->\r\n    <button class=\"btn btn-primary\" type=\"button\" ng-click=\"cancel()\">Close</button>\r\n</div>\r\n");
$templateCache.put("ApplicationComponents/Reporting/Survey/CellTemplates/AfterImage.html","<div class=\"ui-grid-cell-contents text-center\" title=\"TOOLTIP\">\r\n    <i class=\"fa fa-file-image-o\" aria-hidden=\"true\" ng-click=\"grid.appScope.ViewImage(row.entity.Id, \'After Image\')\" ng-show=\"row.entity.IsAfterImage\"></i>\r\n</div>");
$templateCache.put("ApplicationComponents/Reporting/Survey/CellTemplates/BeforeImage.html","<div class=\"ui-grid-cell-contents text-center\" title=\"TOOLTIP\">\r\n    <i class=\"fa fa-file-image-o\" aria-hidden=\"true\" ng-click=\"grid.appScope.ViewImage(row.entity.Id, \'Before Image\')\" ng-show=\"row.entity.IsBeforeImage\"></i>\r\n</div>");
$templateCache.put("ApplicationComponents/Reporting/Survey/CellTemplates/EditDelete.html","<div>\r\n    <span class=\"btn btn-primary btn-sm\" ng-click=\"grid.appScope.Edit(row.entity)\">Edit</span>\r\n    <span class=\"btn btn-danger btn-sm\" ng-click=\"grid.appScope.Delete(row.entity.Id)\">Delete</span>\r\n</div>");
$templateCache.put("ApplicationComponents/Reporting/Survey/CellTemplates/Notes.html","<div class=\"ui-grid-cell-contents text-center\" title=\"TOOLTIP\">\r\n    <i class=\"fa fa-sticky-note\" aria-hidden=\"true\" ng-click=\"grid.appScope.ViewNote(row.entity.Id)\"></i>\r\n</div>");}]);