CREATE TABLE [dbo].[Question] (
    [Id]          INT            IDENTITY (1, 1) NOT NULL,
    [CompanyId]   INT            NOT NULL,
    [Name]        NVARCHAR (100) NOT NULL,
    [IsRequired]  BIT            NOT NULL,
    [IsTrueFalse] BIT            NOT NULL,
    [Modified]    DATETIME       NULL,
    [ModifiedBy]  NVARCHAR (128) NULL,
    [Created]     DATETIME       NOT NULL,
    [CreatedBy]   NVARCHAR (128) NOT NULL,
    CONSTRAINT [PK__Question__3214EC07A8E3488C] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Question_Company] FOREIGN KEY ([CompanyId]) REFERENCES [dbo].[Company] ([Id])
);











