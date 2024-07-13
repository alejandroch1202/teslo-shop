<p align="center">
  <a href="https://nextjs.org" target="blank"><img src="https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_light_background.png" alt="Next Logo" width="150" /></a>
</p>

# Teslo Shop

1. Clone the repository

2. Create a copy of the `.env.example` file and name it `.env`, then change the environment variables.

3. Install dependencies

```
yarn
```

4.  Start the development database

```
docker-compose up -d
```

5. Run Prisma migrations

```
npx prisma migrate dev
```

6. Execute the seed

```
yarn seed
```

7. Run the project in development mode

```
yarn dev
```
