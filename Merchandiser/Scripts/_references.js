/// <autosync enabled="true" />
/// <reference path="../app/applicationcomponents/administrator/admin/controllers/admincontroller.js" />
/// <reference path="../app/applicationcomponents/administrator/company/controllers/companyaddeditcontroller.js" />
/// <reference path="../app/applicationcomponents/administrator/company/controllers/companycontroller.js" />
/// <reference path="../app/applicationcomponents/administrator/customer/controllers/customeraddeditcontroller.js" />
/// <reference path="../app/applicationcomponents/administrator/customer/controllers/customercontroller.js" />
/// <reference path="../app/applicationcomponents/administrator/location/controllers/locationaddeditcontroller.js" />
/// <reference path="../app/applicationcomponents/administrator/location/controllers/locationcontroller.js" />
/// <reference path="../app/applicationcomponents/administrator/product/controllers/productaddeditcontroller.js" />
/// <reference path="../app/applicationcomponents/administrator/product/controllers/productcontroller.js" />
/// <reference path="../app/applicationcomponents/administrator/productcategory/controllers/productcategoryaddeditcontroller.js" />
/// <reference path="../app/applicationcomponents/administrator/productcategory/controllers/productcategorycontroller.js" />
/// <reference path="../app/applicationcomponents/administrator/question/controllers/questionaddeditcontroller.js" />
/// <reference path="../app/applicationcomponents/administrator/question/controllers/questioncontroller.js" />
/// <reference path="../app/applicationcomponents/administrator/survey/controllers/surveyaddeditcontroller.js" />
/// <reference path="../app/applicationcomponents/administrator/survey/controllers/surveycontroller.js" />
/// <reference path="../app/applicationcomponents/administrator/surveycustomerlocation/controllers/surveycustomerlocationaddeditcontroller.js" />
/// <reference path="../app/applicationcomponents/administrator/surveycustomerlocation/controllers/surveycustomerlocationcontroller.js" />
/// <reference path="../app/applicationcomponents/administrator/surveycustomerlocationproductquestion/controllers/surveycustomerlocationproductquestionaddeditcontroller.js" />
/// <reference path="../app/applicationcomponents/administrator/surveycustomerlocationproductquestion/controllers/surveycustomerlocationproductquestioncontroller.js" />
/// <reference path="../app/applicationcomponents/administrator/surveyproductquestion/controllers/surveyproductquestionaddeditcontroller.js" />
/// <reference path="../app/applicationcomponents/administrator/surveyproductquestion/controllers/surveyproductquestioncontroller.js" />
/// <reference path="../app/applicationcomponents/administrator/userrole/controllers/userroleaddeditcontroller.js" />
/// <reference path="../app/applicationcomponents/administrator/userrole/controllers/userrolecontroller.js" />
/// <reference path="../app/applicationcomponents/app.js" />
/// <reference path="../app/applicationcomponents/dataentry/selectcompany/selectcompanycontroller.js" />
/// <reference path="../app/applicationcomponents/dataentry/selectcustomer/selectcustomercontroller.js" />
/// <reference path="../app/applicationcomponents/dataentry/selectlocation/selectlocationcontroller.js" />
/// <reference path="../app/applicationcomponents/dataentry/selectsurvey/selectsurveycontroller.js" />
/// <reference path="../app/applicationcomponents/dataentry/survey/merchandisesurveycontroller.js" />
/// <reference path="../app/applicationcomponents/main/controllers/maincontroller.js" />
/// <reference path="../app/applicationcomponents/reporting/location/locationreportcontroller.js" />
/// <reference path="../app/applicationcomponents/reporting/modal/image/imagemodalcontroller.js" />
/// <reference path="../app/applicationcomponents/reporting/modal/note/notemodalcontroller.js" />
/// <reference path="../app/applicationcomponents/reporting/report/reportcontroller.js" />
/// <reference path="../app/applicationcomponents/reporting/survey/surveyreportcontroller.js" />
/// <reference path="../app/applicationcomponents/reporting/surveyheader/surveyheaderreportcontroller.js" />
/// <reference path="../app/applicationservices/applicationservices.js" />
/// <reference path="../app/applicationservices/selection/selectionapplicationservice.js" />
/// <reference path="../app/databaseservices/breeze/breezeservice.js" />
/// <reference path="../app/databaseservices/breeze/metadata.js" />
/// <reference path="../app/databaseservices/company/companyservice.js" />
/// <reference path="../app/databaseservices/companyuser/companyuserservice.js" />
/// <reference path="../app/databaseservices/customer/customerservice.js" />
/// <reference path="../app/databaseservices/databaseservices.js" />
/// <reference path="../app/databaseservices/download/downloadservice.js" />
/// <reference path="../app/databaseservices/image/imageservice.js" />
/// <reference path="../app/databaseservices/location/locationservice.js" />
/// <reference path="../app/databaseservices/product/productservice.js" />
/// <reference path="../app/databaseservices/productcategory/productservice.js" />
/// <reference path="../app/databaseservices/question/questionservice.js" />
/// <reference path="../app/databaseservices/report/reportservice.js" />
/// <reference path="../app/databaseservices/role/roleservice.js" />
/// <reference path="../app/databaseservices/survey/surveyservice.js" />
/// <reference path="../app/databaseservices/surveycustomerlocation/surveycustomerlocationservice.js" />
/// <reference path="../app/databaseservices/surveycustomerlocationproductquestion/surveycustomerlocationservice.js" />
/// <reference path="../app/databaseservices/surveydetail/surveydetailservice.js" />
/// <reference path="../app/databaseservices/surveyheader/surveyheaderservice.js" />
/// <reference path="../app/databaseservices/surveyproductquestion/surveyproductquestionservice.js" />
/// <reference path="../app/databaseservices/user/userservice.js" />
/// <reference path="../app/databaseservices/userrole/userroleservice.js" />
/// <reference path="../app/directives/affixresizer.js" />
/// <reference path="../app/directives/afterimage.js" />
/// <reference path="../app/directives/beforeimage.js" />
/// <reference path="../app/directives/directives.js" />
/// <reference path="../bower_components/angular/angular.js" />
/// <reference path="../bower_components/angular-animate/angular-animate.js" />
/// <reference path="../bower_components/angular-block-ui/dist/angular-block-ui.js" />
/// <reference path="../bower_components/angular-bootstrap/ui-bootstrap-tpls.js" />
/// <reference path="../bower_components/angular-input-masks/angular-input-masks-standalone.js" />
/// <reference path="../bower_components/angular-moment/angular-moment.js" />
/// <reference path="../bower_components/angular-resource/angular-resource.js" />
/// <reference path="../bower_components/angular-route/angular-route.js" />
/// <reference path="../bower_components/angular-sanitize/angular-sanitize.js" />
/// <reference path="../bower_components/angular-touch/angular-touch.js" />
/// <reference path="../bower_components/angular-ui-grid/ui-grid.js" />
/// <reference path="../bower_components/bootstrap/dist/js/bootstrap.js" />
/// <reference path="../bower_components/breeze-client/breeze.js" />
/// <reference path="../bower_components/jquery/dist/jquery.js" />
/// <reference path="../bower_components/moment/moment.js" />
/// <reference path="../bower_components/pdfmake/build/pdfmake.js" />
/// <reference path="../bower_components/pdfmake/build/vfs_fonts.js" />
/// <reference path="../bower_components/toastr/toastr.js" />
/// <reference path="../gulpfile.js" />
/// <reference path="../public/assets/js/app.js" />
/// <reference path="../public/assets/js/templates.js" />
/// <reference path="../public/assets/libs/vendor.js" />
/// <reference path="bootstrap.js" />
/// <reference path="Dependencies/angularjs/1.4.5/angular.js" />
/// <reference path="Dependencies/angularjs/1.5.0-beta.2/angular-route.js" />
/// <reference path="Dependencies/angular-ui-bootstrap/0.14.3/ui-bootstrap.js" />
/// <reference path="Dependencies/angular-ui-grid/3.0.7/ui-grid.js" />
/// <reference path="dependencies/angular-ui-router/0.2.18/angular-ui-router.js" />
/// <reference path="Dependencies/breezejs/1.5.5/breeze.js" />
/// <reference path="Dependencies/breezejs/adapters/breeze.bridge.angular.js" />
/// <reference path="Dependencies/jquery/2.2.1/jquery.js" />
/// <reference path="Dependencies/momentjs/2.10.6/moment.js" />
/// <reference path="dependencies/ngmap/googlemapapi.js" />
/// <reference path="dependencies/ngmap/ng-map.js" />
/// <reference path="jquery.validate.js" />
/// <reference path="jquery.validate.unobtrusive.js" />
/// <reference path="jquery-1.10.2.js" />
/// <reference path="modernizr-2.6.2.js" />
/// <reference path="respond.js" />
