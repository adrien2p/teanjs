## Configuration

### Install postgres and create the database

```text
$ brew install postgresql
$ pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start
```

*then create the first DB which will be the entry point for the following configuration*

```text
$ createdb platform-prototype
```

#### Create the databases (LOCAL and TEST)

```text
$ psql -d platformprototype -c "DROP USER IF EXISTS platform-prototype-user;"
$ psql -d platformprototype -c "CREATE USER platformprototypeuser WITH PASSWORD 'password';"
$ psql -d platformprototype -c 'ALTER USER platformprototypeuser WITH SUPERUSER;'

$ psql -d platformprototype -c 'DROP DATABASE IF EXISTS platformprototype;'
$ psql -d platformprototype -c 'CREATE DATABASE platformprototype;'
$ psql -d platformprototype -c 'DROP DATABASE IF EXISTS platformprototypetest;'
$ psql -d platformprototype -c 'CREATE DATABASE platformprototypetest;'
```

### Run your server and work with it

#### Run client only

```typescript
$ npm run start:client
```

#### Run server only

```typescript
$ npm run start:server
````

#### Run SSR

```typescript
$ npm run start:ssr
```