# API

## Installation and running
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

## Endpoints

### Users

- /users
    - GET: returns all users (requires admin privilege)
    - POST: creates a user. Example body:
    ```
    {
        "name": "foo",
        "email": "foo@bar.com",
        "password": "MySecret123!"
    }
    ```
- /users/:user-id
    - GET returns user information (requires admin privilege)
    - DELETE deletes user (requires admin privilege)
    - PATCH updates user information (requires admin privilege). Example body:
    ```
    {
        "name": "newName",
        "is_admin": true
    }
    ```
### Restaurants

- /restaurants
    - GET: returns all restaurants
    - POST: creates a restaurant. Example body:
    ```
    {
        "name": "Red Lobster",
    }
    ```
- /restaurants/:restaurant-id
    - GET returns restaurant information. Includes latest, highest and lowest review. Includes all reviews if admin
    - DELETE deletes restaurant (requires admin privilege)
    - PUT updates restaurant information (requires admin privilege). Example body:
    ```
    {
        "name": "newName",
    }
    ```

###  Reviews

- /reviews
    - GET: returns all reviews
    - POST: creates a review. Requires auth. Example body:
    ```
    {
        "restaurant_id": 1,
        "comment": "Very good restaurant,
        "rating": 4
    }
    ```
- /reviews/:review-id
    - GET returns review information. (requires admin privilege)
    - DELETE deletes review (requires admin privilege)
    - PATCH updates review information (requires admin privilege). Example body:
    ```
    {
        "rating": 5,
    }
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