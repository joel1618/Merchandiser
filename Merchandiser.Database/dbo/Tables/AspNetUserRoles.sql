CREATE TABLE [dbo].[AspNetUserRoles] (
    [Id]         INT            NOT NULL,
    [UserId]     NVARCHAR (128) NOT NULL,
    [RoleId]     NVARCHAR (128) NOT NULL,
    [CompanyId]  INT            NOT NULL,
    [CustomerId] INT            NULL,
    CONSTRAINT [PK__AspNetUs__3214EC0722AD9CC9] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_AspNetUserRoles_Company] FOREIGN KEY ([CompanyId]) REFERENCES [dbo].[Company] ([Id]),
    CONSTRAINT [FK_AspNetUserRoles_Customer] FOREIGN KEY ([CustomerId]) REFERENCES [dbo].[Customer] ([Id]),
    CONSTRAINT [FK_dbo_AspNetUserRoles_dbo_AspNetRoles_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [dbo].[AspNetRoles] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_dbo_AspNetUserRoles_dbo_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [dbo].[AspNetUsers] ([Id]) ON DELETE CASCADE
);





