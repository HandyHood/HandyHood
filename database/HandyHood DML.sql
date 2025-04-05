-- Insert into Community

INSERT INTO Community (Name) VALUES
('Maplewood Neighborhood'),
('Sunnydale Apartments'),
('Lakeside Community'),
('Oakridge Suburb'),
('Riverside Town'),
('Hillside Villas'),
('Elmwood Society'),
('Westside Homes'),
('Greenfield Estate'),
('Bluebell Colony');

-- Insert into Location

INSERT INTO Location (CommunityID, Address) VALUES
(1, '101 Maple St'),
(2, '202 Sunnydale Ave'),
(3, '303 Lakeside Rd'),
(4, '404 Oakridge Blvd'),(5, '505 Riverside Ln'),
(6, '606 Hillside Dr'),
(7, '707 Elmwood Cres'),
(8, '808 Westside Ct'),
(9, '909 Greenfield Pkwy'),
(10, '1001 Bluebell Way');

-- Insert into UserAccount

INSERT INTO UserAccount (Username, Email, Password) VALUES
('mike_johnson', 'mike@example.com', EncryptByPassPhrase('SecretKey', N'hashed_pw1')),
('susan_wilson', 'susan@example.com', EncryptByPassPhrase('SecretKey', N'hashed_pw2')),
('jake_perry', 'jake@example.com', EncryptByPassPhrase('SecretKey', N'hashed_pw3')),
('linda_roberts', 'linda@example.com', EncryptByPassPhrase('SecretKey', N'hashed_pw4')),
('tom_anderson', 'tom@example.com', EncryptByPassPhrase('SecretKey', N'hashed_pw5')),
('nancy_clark', 'nancy@example.com', EncryptByPassPhrase('SecretKey', N'hashed_pw6')),
('chris_evans', 'chris@example.com', EncryptByPassPhrase('SecretKey', N'hashed_pw7')),
('emma_davis', 'emma@example.com', EncryptByPassPhrase('SecretKey', N'hashed_pw8')),
('ryan_moore', 'ryan@example.com', EncryptByPassPhrase('SecretKey', N'hashed_pw9')),
('olivia_smith', 'olivia@example.com', EncryptByPassPhrase('SecretKey', N'hashed_pw10'));

-- Insert data without the Age column
INSERT INTO Profile (UserID, Name, DateOfBirth, Phone, Address) 
VALUES
(1, 'Mike Johnson', '1985-06-15', '1234567890', '101 Maple St'),
(2, 'Susan Wilson', '1990-09-25', '2345678901', '202 Sunnydale Ave'),
(3, 'Jake Perry', '1988-04-20', '3456789012', '303 Lakeside Rd'),
(4, 'Linda Roberts', '1992-12-05', '4567890123', '404 Oakridge Blvd'),
(5, 'Tom Anderson', '1980-11-10', '5678901234', '505 Riverside Ln'),
(6, 'Nancy Clark', '1995-07-30', '6789012345', '606 Hillside Dr'),
(7, 'Chris Evans', '1983-03-18', '7890123456', '707 Elmwood Cres'),
(8, 'Emma Davis', '1991-01-22', '8901234567', '808 Westside Ct'),
(9, 'Ryan Moore', '1987-05-28', '9012345678', '909 Greenfield Pkwy'),
(10, 'Olivia Smith', '1998-09-12', '0123456789', '1001 Bluebell Way');

-- Insert into Skill

INSERT INTO Skill (Skill) VALUES
('Plumbing Repairs'),
('Electrical Fixes'),
('Furniture Assembly'),
('Painting'),
('Gutter Cleaning'),
('Lawn Mowing'),
('Carpentry'),
('Fixing Leaky Faucets'),
('Patching Drywall'),
('Smart Home Setup');
-- Insert into User_Skill
INSERT INTO User_Skill (UserID, SkillID) VALUES
(1, 1), (2, 2), (3, 3), (4, 4), (5, 5), (6, 6), (7, 7), (8, 8), (9, 9), (10, 10);

-- Insert into Task

INSERT INTO Task (CreatorUserID, LocationID, Title, Description, Status, RequiredSkillID) VALUES
(1, 1, 'Fix Kitchen Sink Leak', 'Replace worn-out pipe under the sink', 'Pending',1),
(2, 2, 'Install Ceiling Fan', 'Replace old ceiling fan with a new one', 'In Progress',2),
(3, 3, 'Assemble Bookshelf', 'Put together an IKEA bookshelf', 'Completed',3),
(4, 4, 'Repaint Front Door', 'Apply a fresh coat of paint on the door', 'Pending',4),
(5, 5, 'Clean Roof Gutters', 'Remove debris and unclog gutters', 'In Progress',5),
(6, 6, 'Mow Front Lawn', 'Trim grass and clean up the yard', 'Completed',6),
(7, 7, 'Repair Wooden Fence', 'Fix broken panels on backyard fence', 'Pending',7),
(8, 8, 'Fix Dripping Faucet', 'Replace faucet washer to stop the leak', 'Completed',8),
(9, 9, 'Patch Wall Holes', 'Fill small holes in drywall with putty', 'In Progress',9),
(10, 10, 'Set Up Smart Thermostat', 'Install and configure a smart thermostat', 'Completed',10);

-- Insert into Schedule with correct column name (VolunteerUserID)

INSERT INTO Schedule (VolunteerUserID, TaskID, Date, Time) VALUES
(1, 1, '2025-03-10', '10:00:00'),
(2, 2, '2025-03-11', '12:00:00'),
(3, 3, '2025-03-12', '14:00:00'),
(4, 4, '2025-03-13', '16:00:00'),
(5, 5, '2025-03-14', '08:30:00'),
(6, 6, '2025-03-15', '09:00:00'),
(7, 7, '2025-03-16', '11:00:00'),
(8, 8, '2025-03-17', '15:30:00'),
(9, 9, '2025-03-18', '17:00:00'),
(10, 10, '2025-03-19', '19:00:00');

-- Insert into Feedback

INSERT INTO Feedback (UserID, TaskID, RatingReview) VALUES
(1, 1, 'Excellent'),
(2, 2, 'Excellent'),
(3, 3, 'Good'),
(4, 4, 'Average'),
(5, 5, 'Excellent'),
(6, 6, 'Good'),
(7, 7, 'Average'),
(8, 8, 'Excellent'),
(9, 9, 'Good'),
(10, 10, 'Excellent');

-- Insert into Message

INSERT INTO Message (SenderID, ReceiverID, Content) VALUES
(1, 2, 'Can you help me install a new light fixture?'),
(2, 3, 'Sure, I can stop by tomorrow afternoon.'),
(3, 4, 'Do you have an extra paint roller?'),
(4, 5, 'Yes, I can lend you one.'),
(5, 6, 'Thanks for fixing my fence!'),
(6, 7, 'Glad to help! Need anything else?'),
(7, 8, 'Are you available to mow the backyard too?'),
(8, 9, 'Yeah, I can come by this weekend.'),
(9, 10, 'Thanks for setting up my smart devices!'),
(10, 1, 'No problem! Let me know if you need any tweaks.');

-- Insert into Notification

INSERT INTO Notification (UserID, TaskID, Notification, Date, Time, Status) VALUES(1, 1, 'Your sink repair request has been accepted.', '2025-03-08', '09:00:00', 'Unread'),
(2, 2, 'New task assigned: Install ceiling fan.', '2025-03-09', '10:30:00', 'Unread'),
(3, 3, 'Bookshelf assembly scheduled for tomorrow.', '2025-03-10', '11:15:00', 'Unread'),
(4, 4, 'Reminder: Painting session starts at 4 PM.', '2025-03-11', '12:00:00', 'Unread'),
(5, 5, 'Gutter cleaning task is now in progress.', '2025-03-12', '13:45:00', 'Read'),
(6, 6, 'Lawn mowing task completed.', '2025-03-13', '14:30:00', 'Read'),
(7, 7, 'Fence repair scheduled for next week.', '2025-03-14', '15:00:00', 'Unread'),
(8, 8, 'Faucet fix is done. Leave a review!', '2025-03-15', '16:45:00', 'Read'),
(9, 9, 'Wall patching is underway.', '2025-03-16', '17:30:00', 'Unread'),
(10, 10, 'Smart thermostat setup completed.', '2025-03-17', '18:15:00', 'Read');

