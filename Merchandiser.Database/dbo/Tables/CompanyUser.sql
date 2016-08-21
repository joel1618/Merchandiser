CREATE TABLE [dbo].[CompanyUser] (
    [Id]         UNIQUEIDENTIFIER NOT NULL,
    [CompanyId]  UNIQUEIDENTIFIER NOT NULL,
    [UserId]     NVARCHAR (128)   NOT NULL,
    [CreatedBy]  NVARCHAR (128)   NOT NULL,
    [Created]    DATETIME         NOT NULL,
    [ModifiedBy] NVARCHAR (128)   NULL,
    [Modified]   DATETIME         NULL,
    CONSTRAINT [PK_CompanyUser] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_CompanyUser_AspNetUsers] FOREIGN KEY ([UserId]) REFERENCES [dbo].[AspNetUsers] ([Id]),
    CONSTRAINT [FK_CompanyUser_Company] FOREIGN KEY ([CompanyId]) REFERENCES [dbo].[Company] ([Id])
);

