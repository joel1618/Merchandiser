CREATE TABLE [dbo].[ProductTypeDetail] (
    [Id]                  INT            IDENTITY (1, 1) NOT NULL,
    [CompanyId]           INT            NOT NULL,
    [ProductTypeHeaderId] INT            NOT NULL,
    [Name]                NVARCHAR (100) NOT NULL,
    [ModifiedBy]          NVARCHAR (128) NULL,
    [Modified]            DATETIME       NULL,
    [CreatedBy]           NVARCHAR (128) NOT NULL,
    [Created]             DATETIME       NOT NULL,
    CONSTRAINT [PK_ProductTypeDetail] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_ProductTypeDetail_Company] FOREIGN KEY ([CompanyId]) REFERENCES [dbo].[Company] ([Id]),
    CONSTRAINT [FK_ProductTypeDetail_ProductTypeHeader] FOREIGN KEY ([ProductTypeHeaderId]) REFERENCES [dbo].[ProductTypeHeader] ([Id])
);



