# File-Management-Web-Application
This is a file management web application developed using ASP.NET Core Web API as backend and Angular as frontend. Using this web app, we can register user, login, and perform file management operations like upload, download, delete. Also, there is a profile page in which you can view your profile. Please refer to the README file.

Main features:
--> User registration
--> User login
--> If user is a normal user:
    --> Can upload files
    --> Can see the list of their files
    --> Can delete and downlaod files
    --> Can view their profile
--> If user is an admin:
    --> Can upload files
    --> Can see the list of all files uploaded by all users
    --> Has an option to see the profile of user who uploaded the files
    --> Can delete and download all files
    --> Can view their profile
    --> Can see the list of all users
    --> Can delete users
--> Logout is handled properly


Backend
--> Visual Studio
--> SQL server
--> SQL server management studio
--> Please change the connection string for database in the appsettings.json file according to yours

Frontend
--> Visual Studio Code
--> run using this command: ng serve -o


First run the backend from Visual Studio and using command prompt or terminal, run the frontend using the given command above.
