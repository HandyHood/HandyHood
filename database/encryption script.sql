
CREATE PROCEDURE AddUser
    @Username VARCHAR(50),
    @Email VARCHAR(50),
    @Password NVARCHAR(MAX),
    @Name VARCHAR(50),
    @DateOfBirth DATE,
    @Phone VARCHAR(15),
    @Address VARCHAR(50)
AS
BEGIN
	BEGIN TRY
        BEGIN TRANSACTION;
    -- Insert the new user with encrypted password
    INSERT INTO UserAccount (Username, Email, Password)
    VALUES (
        @Username,
        @Email,
        EncryptByPassPhrase('SecretKey', LTRIM(RTRIM(CAST(@Password AS NVARCHAR(MAX))))) -- Encrypt the password
    );
	DECLARE @NewUserID INT= SCOPE_IDENTITY();

	INSERT INTO Profile (UserID, Name, DateOfBirth, Phone, Address)
    VALUES (
        @NewUserID,
        @Name,
        @DateOfBirth,
        @Phone,
        @Address
    );
    COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    ROLLBACK TRANSACTION;

        -- Handle errors and rethrow them for debugging or logging purposes
    THROW;
END CATCH;
END;

EXEC AddUser
    @Username = 'Test12345', 
    @Email = 'test12345@example.com', 
    @Password = 'mySecurePassword123', 
    @Name = 'test Doe', 
    @DateOfBirth = '1990-01-01', 
    @Phone = '1234567880', 
    @Address = '124 Elm Street';


SELECT UserID, Username, Password FROM UserAccount;

SELECT 
    Username,Email,
    CONVERT(NVARCHAR(MAX), DecryptByPassPhrase('SecretKey', Password)) AS DecryptedPassword
FROM 
    UserAccount;
