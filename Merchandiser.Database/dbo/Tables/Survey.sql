CREATE TABLE [dbo].[Survey] (
    [Id]             UNIQUEIDENTIFIER NOT NULL,
    [CompanyId]      UNIQUEIDENTIFIER NOT NULL,
    [Name]           NVARCHAR (100)   NOT NULL,
    [IsNoteRequired] BIT              NOT NULL,
    [IsEdit]         BIT              NOT NULL,
    [IsEditDays]     INT              NULL,
    [IsDelete]       BIT              NOT NULL,
    [IsDeleteDays]   INT              NULL,
    [Modified]       DATETIME         NULL,
    [ModifiedBy]     NVARCHAR (128)   NULL,
    [Created]        DATETIME         NOT NULL,
    [CreatedBy]      NVARCHAR (128)   NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Survey_Company] FOREIGN KEY ([CompanyId]) REFERENCES [dbo].[Company] ([Id])
);









