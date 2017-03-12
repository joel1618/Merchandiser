CREATE TABLE [dbo].[Customer] (
    [Id]           INT            IDENTITY (1, 1) NOT NULL,
    [CompanyId]    INT            NOT NULL,
    [Name]         NVARCHAR (100) NOT NULL,
    [IsSendReport] BIT            NOT NULL,
    [SendReport]   DATETIME       NULL,
    [Modified]     DATETIME       NULL,
    [ModifiedBy]   NVARCHAR (128) NULL,
    [Created]      DATETIME       NOT NULL,
    [CreatedBy]    NVARCHAR (128) NOT NULL,
    CONSTRAINT [PK__Customer__3214EC078C966E58] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Customer_Company] FOREIGN KEY ([CompanyId]) REFERENCES [dbo].[Company] ([Id])
);











