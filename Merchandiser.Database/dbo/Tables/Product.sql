CREATE TABLE [dbo].[Product] (
    [Id]         UNIQUEIDENTIFIER NOT NULL,
    [CompanyId]  UNIQUEIDENTIFIER NOT NULL,
    [Name]       NVARCHAR (100)   NOT NULL,
    [Modified]   DATETIME         NULL,
    [ModifiedBy] NVARCHAR (128)   NULL,
    [Created]    DATETIME         NOT NULL,
    [CreatedBy]  NVARCHAR (128)   NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Product_Company] FOREIGN KEY ([CompanyId]) REFERENCES [dbo].[Company] ([Id])
);



