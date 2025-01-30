# tire

### Description

tire is a time recording app that aims at pulling in its data from access control systems

Ti Re => Time Recording

### Features

- Pulling Data from an Access Control System, only Access Granted Events will be parsed
- Detection of faulty time entries
- Role based Visibility
- Display Personal Time Data
- Display All Time Data for Powerusers
- User synchronisation from an Access Control
- Reader synchronisation from an Access Control
- User management (email, cardno, roles)
- User self sign up, card numbers will have to be assigned manually in this case
- Correction time entries
- Creating Time Entries manually
- Health checks

### Prerequisites

- Docker environment
- ssl certificate and key
- A user with read rights in the ProWatch database(mostly called PWNT)
- A MSSQL database within reach (we recommend installing the tire-database on the same SQL-Server your PWNT-database is running on)
- A database including user with db_owner rights, you might want to call it "tire"

### Installation

This project is available as a docker compose config, to install it follow this procedure:

1. Adjust the Environmental variables in the docker-compose.yaml
2. Adjust the server name in ./tire/nginx.conf (both occurrences)
3. Replace the server name in ./tire/src/environments/environment.ts as the backend address
4. To run database migrations set the database parameters for the tire db in ./src/db/data-source.prod.ts
5. move the certificate into ./cert (alternatively use another folder and adjust in the docker-compose.yaml)
6. Generate and run migrations with typeorm:

```bash
npm run typeorm-ts -- migration:generate -d ./src/db/data-source.prod.ts ./migrations/initial

npm run typeorm-ts -- migration:run -d ./src/db/data-source.prod.ts

```

Make sure the migrations actually ran, please check if the tables have been created! If not you might want to specify the migrations folder directly and check your data-source.prod.ts file 6. Create the docker containers

```bash
docker compose up

```
