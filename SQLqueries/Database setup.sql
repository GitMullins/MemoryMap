--CREATE DATABASE [MemoryMap]


IF not exists (SELECT * FROM sys.tables WHERE [name] = 'User')
	BEGIN
	CREATE TABLE [User]
	(
		[Email] NVARCHAR(255) not null,
		[FirebaseUid] NVARCHAR (255) not null,
	)
	END
ELSE
	PRINT 'User table already exists'

IF not exists (SELECT * FROM sys.tables WHERE [name] = 'Picture')
	BEGIN
	CREATE TABLE [Picture]
	(
		[UserId] NVARCHAR(255) not null,
		[Image] VARBINARY(MAX),
		[Country] NVARCHAR (255) not null,
		[Date] DateTime,
		[Description] NVARCHAR (255),
		[Longitude] DECIMAL(38) not null,
		[Latitude] DECIMAL(38) not null,
	)
	END
ELSE
	PRINT 'Picture table already exists'


  insert into [Picture] ([Image], [UserId], [Country], [Longitude], [Latitude])
  select BulkColumn, '071AFFE1-2B95-4D97-A97A-7132A4B7C9AC' as UserId, 'Austria' as Country, 47.798460 as Longitude, 13.041640 as Latitude
  from Openrowset( Bulk 'C:\Users\test\Desktop\MemoryMapPics\AUSTRIA - MozartHouse.jpg', Single_Blob) as [Image]
