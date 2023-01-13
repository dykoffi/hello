
# Moust documentation for begining

### Prerequises

- [Nodejs](https://nodejs.org/) >= 14.x
- [cqx](https://www.npmjs.com/package/cqx)
- [Git](https://git-scm.com/)
- [gh](https://cli.github.com/) (optional)
- [Docker](https://docs.docker.com/get-docker/)
- [Docker-compose](https://docs.docker.com/compose/)

### Databases supported

- [PostreSQL](https://www.prisma.io/docs/concepts/database-connectors/postgresql)
- [Microsoft SQL Server](https://www.prisma.io/docs/concepts/database-connectors/sql-server)
- [Mysql](https://www.prisma.io/docs/concepts/database-connectors/mysql)
- [Sqlite](https://www.prisma.io/docs/concepts/database-connectors/sqlite)
- [MongoDB](https://www.mongodb.com/)

### Documentation

- [Prisma](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference) For making good schema.
- [Swagger](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#schemaObject) For making good api's documentation.
- [Supertest](https://www.npmjs.com/package/supertest) For making Api test.
- [Express Js](https://expressjs.com/fr/4x/api.html)

### For Begining

1. Your dev database connection is define in **`.env`** file
2. Use ``yarn start:stack`` to run all stack the project needs to run (like database)
3. Define your model in **prisma/schema.prisma**
4. Use `yarn update` to update API and database structure following your model in schema.prisma file
5. Use `yarn start:dev` to run project in dev environment

### Manage versionning

1. Initialize the local repository `git init`
2. Define the main branch `git branch -M main`
3. Add files in `git add .`
4. Commit your code by using `git commit -am "First commit"`
5. Create git repository `gh repo create moust -r origin --public --push`
6. If you wnat you open the repository in the browser `gh browse`
