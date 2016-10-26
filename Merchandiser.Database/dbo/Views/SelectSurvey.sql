CREATE VIEW [dbo].[SelectSurvey] AS 
SELECT 
SurveyCLPQ.LocationId AS 'Id', 
MAX(Survey.Name) AS 'Name',
MAX(SurveyHeader.Created) AS 'SurveyCreated'
FROM SurveyCustomerLocationProductQuestion SurveyCLPQ
LEFT JOIN dbo.Survey
ON SurveyCLPQ.SurveyId = Survey.Id
LEFT JOIN dbo.SurveyHeader
ON SurveyHeader.Id = SurveyCLPQ.SurveyId
AND SurveyHeader.LocationId = SurveyCLPQ.LocationId
AND SurveyHeader.CustomerId = SurveyCLPQ.CustomerId
AND SurveyHeader.Created > CONVERT(DateTime, DATEDIFF(DAY, 1, GETUTCDATE()))
GROUP BY SurveyCLPQ.LocationId