﻿CREATE VIEW [dbo].[SelectSurvey] AS 
SELECT 
SurveyCLPQ.SurveyId AS 'Id', 
SurveyCLPQ.CustomerId AS 'CustomerId',
SurveyCLPQ.CompanyId AS 'CompanyId',
SurveyCLPQ.LocationId AS 'LocationId',
MAX(Survey.Name) AS 'Name',
MAX(SurveyHeader.Created) AS 'SurveyCreated'
FROM SurveyCustomerLocationProductQuestion SurveyCLPQ
LEFT JOIN dbo.Survey
ON SurveyCLPQ.SurveyId = Survey.Id
LEFT JOIN dbo.SurveyHeader
ON SurveyHeader.SurveyId = SurveyCLPQ.SurveyId
AND SurveyHeader.LocationId = SurveyCLPQ.LocationId
AND SurveyHeader.CustomerId = SurveyCLPQ.CustomerId
AND SurveyHeader.Created > CONVERT(DATETIME, DATEDIFF(DAY, 1, GETUTCDATE()))
GROUP BY SurveyCLPQ.SurveyId, SurveyCLPQ.CustomerId, SurveyCLPQ.CompanyId, SurveyCLPQ.LocationId