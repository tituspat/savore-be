# **README.md**

## **Savore Bistro Restaurant Backend API**

### Overview

This is a RESTful API for a restaurant backend, built using Node.js, Express.js, and PostgreSQL. The API provides endpoints for managing menu items, including creating, reading, updating, and deleting (CRUD) operations.

### Features

- **Menu Item Management**: Create, read, update, and delete menu items.
- **Validation**: Validate menu item data to ensure consistency and accuracy.
- **Error Handling**: Handle errors and exceptions to provide a robust API.

### Endpoints

- **GET /api/menu**: Retrieve all menu items.
- **GET /api/menu/category/:category**: Retrieve menu items by category (Meals, Drinks, Snacks).
- **GET /api/menu/:id**: Retrieve a single menu item by ID.
- **POST /api/menu**: Create a new menu item.
- **PUT /api/menu/:id**: Update a menu item.
- **DELETE /api/menu/:id**: Delete a menu item.

### Requirements

- Node.js (version 14 or higher)
- PostgreSQL (version 13 or higher)
- Express.js (version 4 or higher)
- Knex.js (version 3 or higher)
- Cors (version 2 or higher)
- Dotenv (version 16 or higher)

### Installation

1.  Clone the repository: `git clone https://github.com/your-username/savore-bistro.git`
2.  Install dependencies: `npm install`
3.  Create a PostgreSQL database and update the `knexfile.js` with your database credentials.
4.  Run the migrations: `npx knex migrate:latest`
5.  Run the seeds: `npx knex seed:run`

### Running the API

1.  Start the API: `npm start`
2.  Use a tool like Postman or cURL to test the API endpoints.

### Contributing

Contributions are welcome! Please submit a pull request with your changes.

### License

This project is licensed under the ISC License.

### Authors

- [Your Name](https://github.com/your-username)

### Acknowledgments

- [Express.js](https://expressjs.com/)
- [Knex.js](https://knexjs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Cors](https://www.npmjs.com/package/cors)
- [Dotenv](https://www.npmjs.com/package/dotenv)
