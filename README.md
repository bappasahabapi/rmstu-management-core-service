# RMSTU Management Core Service [Micro-Service]
This guide will walk you through the process of setting up the RMSTU Management Core Service Starter project. By following these steps, you will clone the project, install dependencies, and configure Prisma for database management. Let's get started man 😄!

-    basic CRUD is done included filtering and pagination.



#### 🪸 Branches

-   20 👉 [Offered Course Section](https://github.com/bappasahabapi/rmstu-management-core-service/tree/rmstu/20/c4/offered-course-section) 
-   19 👉 [Offered Course](https://github.com/bappasahabapi/rmstu-management-core-service/commits/rmstu/19/c4/offered-course) 
-   18 👉 [Handle Prisma Validation Erros](https://github.com/bappasahabapi/rmstu-management-core-service/commits/rmstu/18/c4/handle-prisma-error) 
---
-   17 🌵 [**Core-3**](https://github.com/bappasahabapi/rmstu-management-core-service/commits/rmstu/17m37/core-3) 
-   16 👉 [Semester Registration](https://github.com/bappasahabapi/rmstu-management-core-service/commits/rmstu/16/c3/semester-registration) 
-   15 👉 [Course assign or remove for specific faculty](https://github.com/bappasahabapi/rmstu-management-core-service/commits/rmstu/15/c3/assign-remove-course-from-faculty) 
-   14 👉 [Faculty assign or remove for specific course](https://github.com/bappasahabapi/rmstu-management-core-service/tree/rmstu/14/c3/Assign-faculty) 
---
-   13 🌵 [**Core-2**](https://github.com/bappasahabapi/rmstu-management-core-service/tree/rmstu/13m36/core-2) 
-   12 👉 [Course ](https://github.com/bappasahabapi/rmstu-management-core-service/tree/rmstu/c2/12/course) 
-   11 👉 [Building & Room  ](https://github.com/bappasahabapi/rmstu-management-core-service/tree/rmstu/c2/11/building-room) 
-   10 👉 [Access Token Permission role ](https://github.com/bappasahabapi/rmstu-management-core-service/tree/rmstu/c2/10/add-AccessTokenPermission) 
-   09 👉 [Modify Code ](https://github.com/bappasahabapi/rmstu-management-core-service/tree/rmstu/c2/09/modifyCode) 
--- 
-   08 🌵 [**Core-1**](https://github.com/bappasahabapi/rmstu-management-core-service/commits/rmstu/c1/08m35)
-   07 👉 [academic-student-crud](https://github.com/bappasahabapi/rmstu-management-core-service/commits/rmstu/c1/07/student-crud)
-   06 👉 [faculty-crud](https://github.com/bappasahabapi/rmstu-management-core-service/commits/rmstu/c1/06/faculty-crud)
-   05 👉 [academic-department-crud](https://github.com/bappasahabapi/rmstu-management-core-service/commits/rmstu/c1/05/academic-department-crud)
-   04 👉 [academic-faculty-crud](https://github.com/bappasahabapi/rmstu-management-core-service/commits/rmstu/c1/04/academic-faculty-crud)
-   03 👉 [academic-semester-crud](https://github.com/bappasahabapi/rmstu-management-core-service/tree/rmstu/c1/03/academic-semester-crud)
-   01 👉 [rmstu/c1/starter](https://github.com/bappasahabapi/rmstu-management-core-service/tree/rmstu/c1/start)
-   00 👉 [main](https://github.com/bappasahabapi/rmstu-management-core-service.git)




###    📊 Core-4
![My Image](./ER-Diagram/c4.png)

###    📊 Core-3
![My Image](./ER-Diagram/c3.png)

###    📊 Core-2
![My Image](./ER-Diagram/c2.png)


###    📊 Core-1
![My Image](./ER-Diagram/c1.png)





## Installation Steps
---
### Follow these steps to clone and set up starter project:

1. **Clone the project:** Open your terminal or command prompt and run the following command to clone the project repository:

```bash
https://github.com/bappasahabapi/rmstu-management-core-service.git
```

2. **Navigate into the project directory:**  Use the cd command to navigate into the project directory:

```bash
cd rmstu-management-core-service
```

3. **Install project dependencies:** Next, install the project dependencies by running the following command:

```bash
yarn install
```

4. **Configure Prisma and the database connection:**

- Add Prisma as a development dependency by running the following command:
```bash
yarn add prisma --save-dev
```

- Set up your Prisma project by creating the Prisma schema file using the following command:
```bash
npx prisma init
```

- Open the prisma/schema.prisma file and configure your database connection details.

```bash
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

- Create a .env file in the project root directory and set the DATABASE_URL environment variable. Replace the placeholders with your database connection details:
```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA"
```

5. **Creating the database schema**[in `schema.prisma` file]
1. **Migrate the database schema:** Use the following command to create and apply the initial database schema:

```bash
npx prisma migrate dev --name init
```
This command creates a new migration file based on your schema changes and applies it to your database.

6. **Install Prisma Client:** Install the Prisma Client library by running the following command:
```bash
yarn add @prisma/client
```

This command installs the Prisma Client, which provides an interface to interact with your database.

That's it! You have successfully set up the RMSTU Management Core Service Starter project. You can now start exploring and working with the codebase. Refer to the project documentation or README for further instructions on how to run and use the core service.

Happy coding!
Any help contact me 👉 [Gmail](bappasaha161@gmail.com)