CREATE TABLE [dbo].[SurveyProductQuestion] (
    [Id]         UNIQUEIDENTIFIER NOT NULL,
    [CompanyId]  UNIQUEIDENTIFIER NOT NULL,
    [SurveyId]   UNIQUEIDENTIFIER NOT NULL,
    [ProductId]  UNIQUEIDENTIFIER NOT NULL,
    [QuestionId] UNIQUEIDENTIFIER NOT NULL,
    [Modified]   DATETIME         NULL,
    [ModifiedBy] NVARCHAR (128)   NULL,
    [Created]    DATETIME         NOT NULL,
    [CreatedBy]  NVARCHAR (128)   NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_SurveyProductQuestion_Company] FOREIGN KEY ([CompanyId]) REFERENCES [dbo].[Company] ([Id]),
    CONSTRAINT [FK_SurveyProductQuestion_Product] FOREIGN KEY ([ProductId]) REFERENCES [dbo].[Product] ([Id]),
    CONSTRAINT [FK_SurveyProductQuestion_Question] FOREIGN KEY ([QuestionId]) REFERENCES [dbo].[Question] ([Id]),
    CONSTRAINT [FK_SurveyProductQuestion_Survey] FOREIGN KEY ([SurveyId]) REFERENCES [dbo].[Survey] ([Id])
);

