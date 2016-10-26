CREATE TABLE [dbo].[Company] (
    [Id]         UNIQUEIDENTIFIER NOT NULL,
    [Name]       NVARCHAR (100)   NOT NULL,
    [Modified]   DATETIME         NULL,
    [ModifiedBy] NVARCHAR (128)   NULL,
    [Created]    DATETIME         NOT NULL,
    [CreatedBy]  NVARCHAR (128)   NOT NULL,
    CONSTRAINT [PK__Company__3214EC0776D1896A] PRIMARY KEY CLUSTERED ([Id] ASC)
);











