IF EXISTS (SELECT name FROM sys.databases WHERE name = 'HandyHood')
BEGIN
    -- Drop the database if it exists
    DROP DATABASE HandyHood;
END
ELSE
BEGIN
    -- Create the database if it doesn't exist
    CREATE DATABASE HandyHood;
END;


-- Create Community Table

CREATE TABLE Community (
CommunityID INT IDENTITY(1,1) PRIMARY KEY,
Name VARCHAR(50) NOT NULL
);

-- Create Location Table

CREATE TABLE Location (
LocationID INT IDENTITY(1,1) PRIMARY KEY,
CommunityID INT NOT NULL,
Address VARCHAR(50) NOT NULL,
FOREIGN KEY (CommunityID) REFERENCES Community(CommunityID)
);

-- Create User Table

CREATE TABLE UserAccount (
UserID INT IDENTITY(1,1) PRIMARY KEY,
Username VARCHAR(50) NOT NULL UNIQUE,
Email VARCHAR(50) NOT NULL UNIQUE,
Password VARBINARY(MAX) NOT NULL
);

-- Create Profile Table

CREATE TABLE Profile (ProfileID INT IDENTITY(1,1) PRIMARY KEY,
UserID INT NOT NULL UNIQUE,
Name VARCHAR(50) NOT NULL,
DateOfBirth DATE NOT NULL,
Age AS (DATEDIFF(YEAR, DateOfBirth, GETDATE()) - 
    CASE
        WHEN MONTH(DateOfBirth) > MONTH(GETDATE()) 
            OR (MONTH(DateOfBirth) = MONTH(GETDATE()) AND DAY(DateOfBirth) > DAY(GETDATE()))
        THEN 1
        ELSE 0
    END),
Phone VARCHAR(15) CHECK (Phone LIKE '[0-9]%'),
Address VARCHAR(50),
FOREIGN KEY (UserID) REFERENCES UserAccount(UserID)
);

-- Create Skill Table

CREATE TABLE Skill (
SkillID INT IDENTITY(1,1) PRIMARY KEY,
Skill VARCHAR(50) NOT NULL UNIQUE
);

-- Create User_Skill Table

CREATE TABLE User_Skill (
UserSkillID INT IDENTITY(1,1) PRIMARY KEY,
UserID INT NOT NULL,
SkillID INT NOT NULL,FOREIGN KEY (UserID) REFERENCES UserAccount(UserID),
FOREIGN KEY (SkillID) REFERENCES Skill(SkillID)
);

-- Create Task Table

CREATE TABLE Task (
    TaskID INT IDENTITY(1,1) PRIMARY KEY,
    CreatorUserID INT NOT NULL,
    LocationID INT NOT NULL,
    Title VARCHAR(50) NOT NULL,
    Description VARCHAR(200),
    Status VARCHAR(50) NOT NULL CHECK (Status IN ('Pending', 'In Progress', 'Completed')),
    RequiredSkillID INT, 
    FOREIGN KEY (RequiredSkillID) REFERENCES Skill(SkillID),
    FOREIGN KEY (CreatorUserID) REFERENCES UserAccount(UserID),
    FOREIGN KEY (LocationID) REFERENCES Location(LocationID)
);

-- Create Schedule Table

CREATE TABLE Schedule (
    ScheduleID INT IDENTITY(1,1) PRIMARY KEY,
    VolunteerUserID INT NOT NULL,
    TaskID INT NOT NULL,
    Date DATE NOT NULL,
    Time TIME NOT NULL,
    FOREIGN KEY (VolunteerUserID) REFERENCES UserAccount(UserID),
    FOREIGN KEY (TaskID) REFERENCES Task(TaskID)
);

-- Create Feedback Table

CREATE TABLE Feedback (
FeedbackID INT IDENTITY(1,1) PRIMARY KEY,
UserID INT NOT NULL,
TaskID INT NOT NULL,
RatingReview VARCHAR(50) NOT NULL CHECK (RatingReview IN ('Excellent', 'Good',
'Average', 'Poor')),
FOREIGN KEY (UserID) REFERENCES UserAccount(UserID),
FOREIGN KEY (TaskID) REFERENCES Task(TaskID)
);

-- Create Message Table

CREATE TABLE Message (
MessageID INT IDENTITY(1,1) PRIMARY KEY,
SenderID INT NOT NULL,
ReceiverID INT NOT NULL,
Content VARCHAR(200) NOT NULL,
FOREIGN KEY (SenderID) REFERENCES UserAccount(UserID),
FOREIGN KEY (ReceiverID) REFERENCES UserAccount(UserID)
);

-- Create Notification Table

CREATE TABLE Notification (
    NotificationID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT NOT NULL,
    TaskID INT NOT NULL, -- Added to associate notification with a task
    Notification VARCHAR(255) NOT NULL,
    Date DATE NOT NULL,
    Time TIME NOT NULL,
    Status VARCHAR(50) NOT NULL CHECK (Status IN ('Unread', 'Read')),
    FOREIGN KEY (UserID) REFERENCES UserAccount(UserID),
    FOREIGN KEY (TaskID) REFERENCES Task(TaskID) -- Foreign key added
);
