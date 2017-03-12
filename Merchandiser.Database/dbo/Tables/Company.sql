CREATE TABLE [dbo].[Company] (
    [Id]         INT            IDENTITY (1, 1) NOT NULL,
    [Name]       NVARCHAR (100) NOT NULL,
    [Modified]   DATETIME       NULL,
    [ModifiedBy] NVARCHAR (128) NULL,
    [Created]    DATETIME       NOT NULL,
    [CreatedBy]  NVARCHAR (128) NOT NULL,
    CONSTRAINT [PK__Company__3214EC07DF0D48C0] PRIMARY KEY CLUSTERED ([Id] ASC)
);















