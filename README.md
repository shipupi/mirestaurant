# Installation

## API

- Set .env  file with DATABASE_URL, make a copy from .env.example. Database URL should look like this:
```
DATABASE_URL="postgresql://user:pass@database_host:database_port/db_name"
```
- Run migration with:
```
psql toptal -f restaurants/api/persistence/migrations/create_tables.sql
```
- Create prisma schema
```
npx prisma db pull
```
- Generate prisma client
```
npx prisma generate
```