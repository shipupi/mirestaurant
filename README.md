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
- Seed 
```
psql toptal -f persistence/migrations/seed.sql
```
- Create prisma schema
```
npx prisma db pull
```
- Generate prisma client
```
npx prisma generate
```

- Generate JWT secret
```
node generate_secret.js
```
And copy the output in the .env file