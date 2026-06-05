# The-Turtle-Hermit-Store
The Turtle Hermit Store is an e-commerce application for martial arts gear. The idea comes from my own style and from one of my favorite anime series from childhood, Dragon Ball. I wanted to create a store that does not only feel like a regular webshop, but also carries a sense of martial arts, discipline and playfulness.

In the application, users can browse products, filter by category, add products to the cart and change the quantity. They can also continue to checkout and complete a simulated purchase. Users can register and log in, but it is also possible to shop as a guest.

The frontend is built with React, and the backend is built with Node.js and Express. The database is connected to MongoDB, where products, users and orders are handled. The design is inspired by a painting I have at home, and I have tried to keep that same feeling throughout the whole application.

The comments are in english and in swedish.

Frontend:
- React
- Vite
- React Router
- Context API
- CSS

Backend:
- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcrypt

Test account:
email: user@test.com
password: user

To run it follow this steps:

git clone <https://github.com/Nando040/The-Turtle-Hermit-Store.git>

cd The-Turtle-Hermit-Store

open two terminals:
terminal 1:
cd Client
npm install
npm run dev

terminal 2:
cd Server
npm install
npm run dev

If you want to insert your own items:

cd Server
npm run seed

And write your prefered items in data/products.js

This application needs an .env-file I built the backend that requires a
MongoDV connection string:
CONNECTION_STRING=...

A JWT secret token:
ACCESS_TOKEN_SECRET=..

And yout PORT:
PORT=..

You should insert this three in your .env-file.

Backend:
For the backend I used the tech our teacher showed us, Node.js and Express i used "express-async-handler" to facilitate the error-handling(try/catch blocks).
For the database, I use MongoDB together with Mongoose for the models. I chose this because our teacher showed us how to work with MongoDB, and it felt like a good fit for this type of project.
The API handles products, users and orders, and the backend is structured with routes, controllers and models. Some routes are protected with JWT. I chose JWT because I wanted to simulate a more realistic login system, similar to how bigger webshops handle user accounts.
Passwords are hashed with bcrypt before they are saved in the database. This was also something we learned from our teacher, and I wanted to apply it in my own backend.

The-Turtle-Hermit-Store/
├── Client/
│   ├── public/
│   │   └── images/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── pages/
│       └── services/
│
├── Server/
│   ├── config/
│   ├── controllers/
│   ├── data/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seed/
│   └── server.js
│
└── README.md

API-routes/endpoints to test:
Users:
POST /api/users/register
POST /api/users/login
GET /api/users/current

Products:
GET /api/products
GET /api/products/:id
GET /api/products/category/:category
POST /api/products

Orders:
POST /api/orders
GET /api/orders
GET /api/orders/:id

Some of the routes requires authorization: Bearer token

Figma:https://www.figma.com/design/rDIN6aABPiT1NxkuRsZf7h/The-Turtle-Hermit-Store?node-id=0-1&t=RcjfulgCnEEik2jf-1
