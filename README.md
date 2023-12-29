# To-Do-App


Introducing Task Flow: Your Effortless To-Do Management Web Application

Welcome to Task Flow, the ultimate solution for streamlined task management designed to make your life easier and more organized. Task Flow is not just a to-do list; it's your personal productivity companion, accessible from anywhere, whether you're at your computer or on the go with your mobile device.

Key Features:

    Seamless Google Account Integration:
    Log in effortlessly using your Google account. Task Flow leverages the power of Google authentication, ensuring a secure and convenient login experience.

    Intuitive Task Creation:
    Add tasks with ease, providing detailed descriptions and setting deadlines to keep your schedule on track. Task Flow empowers you to capture and organize your thoughts efficiently.

    Flexible Task Management:
    Delete tasks from your to-do list effortlessly, adapting to changes in your priorities and schedule. Enjoy the freedom to customize your task list based on your evolving needs.

    Visualize Progress with Color Coding:
    Stay informed at a glance with color-coded tasks. Easily distinguish between completed tasks and those still on your to-do list. Task Flow brings clarity to your progress.

    Effortless Accessibility:
    Task Flow is designed for convenience. Whether you're at your PC or on your mobile device, access your to-do list from anywhere with ease. Stay in control of your tasks, no matter where life takes you.

    Organize Tasks for Today and Beyond:
    Sort and filter tasks to find what matters most. Task Flow allows you to categorize tasks based on completion status, view today's tasks, and access a comprehensive list of all your tasks.

    Responsive Design for Any Device:
    Task Flow is responsive and user-friendly, providing a seamless experience across various devices. Log in and manage your to-do list whether you're at home, at the office, or on the road.

Task Flow is more than just a to-do application; it's a dynamic tool designed to adapt to your unique workflow. Embrace the efficiency and simplicity of Task Flow to conquer your to-do list and achieve your goals effortlessly.

Sign up today and experience the convenience of Task Flow – your go-to solution for effortless to-do management.

To-Do App Backend

This is the backend component of a To-Do App, providing services to manage tasks. The application is built using the Spring Framework (version 5.3.30) and utilizes Hibernate Validator for bean validation. The database used is PostgreSQL, and Hibernate is employed as the native database framework. HikariCP is used for connection pooling, and Jackson Databind serves as the message converter.
Prerequisites

    Java Development Kit (JDK) 8 or later
    PostgreSQL database
    Apache Tomcat server
    Maven

Setup

    Clone the repository:

    bash

git clone <repository-url>
cd todo-app-backend

Database Configuration:

    Create a PostgreSQL database for the application.
    Update the src/main/resources/hibernate.cfg.xml file with your database configurations.
Tomcat Configuration:

    Ensure that Apache Tomcat is installed.
    Deploy the application on Tomcat by copying the generated WAR file to the webapps directory of Tomcat.

Build and Run:

    Build the application using Maven:

    bash

    mvn clean package

    Deploy the generated WAR file to Tomcat.

Access the Application:

The application will be available at:

bash

    http://localhost:8080/api/v1/tasks

API Endpoints
Create Task

http

POST /api/v1/tasks

Create a new task.

Request:

json

{
"deadline": "2023-12-31",
"email": "user@example.com",
"status": false,
"description": "Task description"
}

Response:

http

201 Created

json

{
"taskId": 1,
"deadline": "2023-12-31",
"email": "user@example.com",
"status": false,
"description": "Task description"
}

Delete Task

http

DELETE /api/v1/tasks/{taskid}

Delete an existing task by ID.

Response:

http

204 No Content

Update Task

http

PATCH /api/v1/tasks/{taskid}

Update an existing task by ID.

Request:

json

{
"deadline": "2023-12-31",
"email": "user@example.com",
"status": true,
"description": "Updated task description"
}

Response:

http

204 No Content

Get All Tasks by Email

http

GET /api/v1/tasks?email=user@example.com

Get a list of tasks for a specific email.

Response:

http

200 OK

json

[
{
"taskId": 1,
"deadline": "2023-12-31",
"email": "user@example.com",
"status": false,
"description": "Task description"
},
{
"taskId": 2,
"deadline": "2023-12-31",
"email": "user@example.com",
"status": true,
"description": "Updated task description"
}
]

Get Task by ID

http

GET /api/v1/tasks/{taskid}

Get details of a task by ID.

Response:

http

200 OK

json

{
"taskId": 1,
"deadline": "2023-12-31",
"email": "user@example.com",
"status": false,
"description": "Task description"
}

Additional Configuration

    Hibernate Configuration:

    Update the src/main/resources/hibernate.cfg.xml file with your Hibernate configurations, especially if using a different database dialect.

    Connection Pooling:

    Fine-tune HikariCP settings 

## Version
0.1.0

### License
Copyright &copy; 2023. All Rights Reserved <br>
This Project is Licensed under [MITLicense](License.txt)

