CREATE TABLE [dbo].[Question] (
    [Id]          UNIQUEIDENTIFIER NOT NULL,
    [CompanyId]   UNIQUEIDENTIFIER NOT NULL,
    [Name]        NVARCHAR (100)   NOT NULL,
    [IsRequired]  BIT              NOT NULL,
    [IsTrueFalse] BIT              CONSTRAINT [DF_Question_IsTrueFalse] DEFAULT ((0)) NOT NULL,
    [Modified]    DATETIME         NULL,
    [ModifiedBy]  NVARCHAR (128)   NULL,
    [Created]     DATETIME         NOT NULL,
    [CreatedBy]   NVARCHAR (128)   NOT NULL,
    CONSTRAINT [PK__Question__3214EC07ED421494] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Question_Company] FOREIGN KEY ([CompanyId]) REFERENCES [dbo].[Company] ([Id])
);







