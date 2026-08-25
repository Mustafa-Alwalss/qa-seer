<p align="center">
  <img width="512" height="512" alt="Logo" src="https://github.com/user-attachments/assets/b229ab22-387e-48f0-a8a0-d07633166e6c" />
</p>

# Qa-seer | قصير 

A Web application that shortens URLs and directs users to the right destination.

## Front-end stack
- React with Vite
- Typescript 
- Bootstrap
- Axios 


## Back-end stack
- Java
- Spring Boot
- PostgresSQL

## Docker
There are four containers in this project: two for the database (PostgreSQL and pgAdmin) and two for the front-end and back-end.

## How it works
The user can use the front-end or call the API directly. The back-end first validates the URL to make sure it's well-formed, then generates a unique `shortCode` that can be used to redirect the user to the original URL. Each shortened URL has a user-selected expiry (in minutes or days); the back-end saves URLs in the database and periodically checks for expired ones, marking them inactive.


## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file


*In the root project*

### For Postgres

`DB_USER`

`DB_PASSWORD`

`DB_NAME`

### For pgadmin
`PGADMIN_EMAIL`

`PGADMIN_PASSWORD`

### For Back-end (Spring Boot)
`CORS_ORIGIN`

### For Front-end 
you have to create another `.env` file inside the front-end folder

`VITE_API_BASE_URL`
## API endpoints

#### Create short URL

```http
  POST /api/urls/
```
request body example
```json 
{
  "originalUrl": "https://example.com",
  "isItInMinutes": false,
  "amount": 7
}
```


#### lookup

```http
  GET /api/urls/{shortCode}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `shortCode`      | `string` | The short code that was created|

#### Redirect

```http
 GET /goto/{shortCode}
```

## Screenshots 

<img width="2560" height="1600" alt="Screenshot 2026-07-16 at 19-54-12 قصير" src="https://github.com/user-attachments/assets/edef8584-bb82-4e1c-b9a7-cda153cdbd02" />

<img width="1758" height="596" alt="Screenshot_20260716_202726" src="https://github.com/user-attachments/assets/47734a1f-f002-4946-ad7d-cf82f4cd1bed" />

<img width="2560" height="1447" alt="Screenshot 2026-07-16 at 19-56-23 قصير" src="https://github.com/user-attachments/assets/60f9f8e9-8132-4df3-b41a-5d3be2bf185d" />

<img width="2560" height="1600" alt="Screenshot_20260716_202314" src="https://github.com/user-attachments/assets/0e4ddb06-b83f-4a33-b7a8-7cc753ce7d72" />

<img width="2560" height="1552" alt="Screenshot_20260716_202425" src="https://github.com/user-attachments/assets/c6b565da-e378-4100-bd03-4e33fce5dd45" />

<img width="2560" height="1552" alt="Screenshot_20260716_202509" src="https://github.com/user-attachments/assets/38469433-6140-43d5-b3f4-1d03be590928" />



