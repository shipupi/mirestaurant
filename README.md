# API

- Create .env.prod and .env.test files with DATABASE_URL, make a copy from .env.example as reference. Database URL should look like this:
```
DATABASE_URL="postgresql://user:pass@database_host:database_port/db_name"
```
- Run migration with:
```
psql DB_NAME -f restaurants/api/persistence/migrations/create_tables.sql
```
- Seed 
```
psql DB_NAME -f restaurants/api/persistence/migrations/seed.sql
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
And copy the output in the .env.prod file

- Start server
```
npm start
```



# WebApp

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```