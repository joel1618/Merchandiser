

CREATE VIEW [dbo].[vwBuildSurvey] AS

select 
Customer.CompanyId as 'CompanyId', 
Customer.Id as 'CustomerId', 
Customer.Name as 'CustomerName',
NULL as 'LocationId',
NULL as 'LocationName',
NULL as 'ProductId',
NULL as 'ProductName',
NULL as 'QuestionId',
NULL as 'QuestionName',
SurveyCustomerLocationProductQuestion.SurveyId as 'SurveyId'
from Customer
left join SurveyCustomerLocationProductQuestion 
on SurveyCustomerLocationProductQuestion.CustomerId = Customer.Id
--where Customer.CompanyId = '883DA634-C32A-4994-8299-8602B881D601'
group by Customer.CompanyId, Customer.Id, Customer.Name, SurveyCustomerLocationProductQuestion.SurveyId

UNION

select 
Location.CompanyId as 'CompanyId', 
NULL as 'CustomerId',
NULL as 'CustomerName',
Location.Id as 'LocationId', 
Location.Name as 'LocationName',
NULL as 'ProductId',
NULL as 'ProductName',
NULL as 'QuestionId',
NULL as 'QuestionName',
SurveyCustomerLocationProductQuestion.SurveyId as 'SurveyId'
from Location
left join SurveyCustomerLocationProductQuestion 
on SurveyCustomerLocationProductQuestion.LocationId = Location.Id
--where Location.CompanyId = '883DA634-C32A-4994-8299-8602B881D601'
group by Location.CompanyId, Location.Id, Location.Name, SurveyCustomerLocationProductQuestion.SurveyId

UNION

select 
Product.CompanyId as 'CompanyId', 
NULL as 'CustomerId',
NULL as 'CustomerName',
NULL as 'LocationId', 
NULL as 'LocationName',
Product.Id as 'ProductId',
Product.Name as 'ProductName',
NULL as 'QuestionId',
NULL as 'QuestionName',
SurveyCustomerLocationProductQuestion.SurveyId as 'SurveyId'
from Product
left join SurveyCustomerLocationProductQuestion 
on SurveyCustomerLocationProductQuestion.ProductId = Product.Id
--where Location.CompanyId = '883DA634-C32A-4994-8299-8602B881D601'
group by Product.CompanyId, Product.Id, Product.Name, SurveyCustomerLocationProductQuestion.SurveyId

UNION

select 
Question.CompanyId as 'CompanyId', 
NULL as 'CustomerId',
NULL as 'CustomerName',
NULL as 'LocationId', 
NULL as 'LocationName',
NULL as 'ProductId',
NULL as 'ProductName',
Question.Id as 'QuestionId',
Question.Name as 'QuestionName',
SurveyCustomerLocationProductQuestion.SurveyId as 'SurveyId'
from Question
left join SurveyCustomerLocationProductQuestion 
on SurveyCustomerLocationProductQuestion.QuestionId = Question.Id
--where Location.CompanyId = '883DA634-C32A-4994-8299-8602B881D601'
group by Question.CompanyId, Question.Id, Question.Name, SurveyCustomerLocationProductQuestion.SurveyId