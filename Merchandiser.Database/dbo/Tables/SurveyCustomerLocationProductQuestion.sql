CREATE TABLE [dbo].[SurveyCustomerLocationProductQuestion] (
    [Id]         INT            IDENTITY (1, 1) NOT NULL,
    [CompanyId]  INT            NOT NULL,
    [SurveyId]   INT            NOT NULL,
    [CustomerId] INT            NOT NULL,
    [LocationId] INT            NOT NULL,
    [ProductId]  INT            NOT NULL,
    [QuestionId] INT            NOT NULL,
    [RowOrder]   INT            NOT NULL,
    [Modified]   DATETIME       NULL,
    [ModifiedBy] NVARCHAR (128) NULL,
    [Created]    DATETIME       NOT NULL,
    [CreatedBy]  NVARCHAR (128) NOT NULL,
    CONSTRAINT [PK__SurveyCu__3214EC07539505C9] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_SurveyCustomerLocationProductQuestion_Company] FOREIGN KEY ([CompanyId]) REFERENCES [dbo].[Company] ([Id]),
    CONSTRAINT [FK_SurveyCustomerLocationProductQuestion_Customer] FOREIGN KEY ([CustomerId]) REFERENCES [dbo].[Customer] ([Id]),
    CONSTRAINT [FK_SurveyCustomerLocationProductQuestion_Location] FOREIGN KEY ([LocationId]) REFERENCES [dbo].[Location] ([Id]),
    CONSTRAINT [FK_SurveyCustomerLocationProductQuestion_Product] FOREIGN KEY ([ProductId]) REFERENCES [dbo].[Product] ([Id]),
    CONSTRAINT [FK_SurveyCustomerLocationProductQuestion_Question] FOREIGN KEY ([QuestionId]) REFERENCES [dbo].[Question] ([Id]),
    CONSTRAINT [FK_SurveyCustomerLocationProductQuestion_Survey] FOREIGN KEY ([SurveyId]) REFERENCES [dbo].[Survey] ([Id])
);










GO
CREATE UNIQUE NONCLUSTERED INDEX [IX_SurveyCustomerLocationProductQuestion]
    ON [dbo].[SurveyCustomerLocationProductQuestion]([CustomerId] ASC, [LocationId] ASC, [ProductId] ASC, [QuestionId] ASC, [CompanyId] ASC, [SurveyId] ASC);

