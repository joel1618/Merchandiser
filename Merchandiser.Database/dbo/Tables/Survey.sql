CREATE TABLE [dbo].[Survey] (
    [Id]             INT            IDENTITY (1, 1) NOT NULL,
    [CompanyId]      INT            NOT NULL,
    [Name]           NVARCHAR (100) NOT NULL,
    [IsNoteRequired] BIT            NOT NULL,
    [IsCreate]       BIT            CONSTRAINT [DF_Survey_IsCreate] DEFAULT ((0)) NOT NULL,
    [IsCreateDays]   INT            NULL,
    [IsEdit]         BIT            NOT NULL,
    [IsEditDays]     INT            NULL,
    [IsDelete]       BIT            NOT NULL,
    [IsDeleteDays]   INT            NULL,
    [Modified]       DATETIME       NULL,
    [ModifiedBy]     NVARCHAR (128) NULL,
    [Created]        DATETIME       NOT NULL,
    [CreatedBy]      NVARCHAR (128) NOT NULL,
    CONSTRAINT [PK__Survey__3214EC078D4EFFA4] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Survey_Company] FOREIGN KEY ([CompanyId]) REFERENCES [dbo].[Company] ([Id])
);













