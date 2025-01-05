# Flexor API

Flexor API is the backend server for a Reddit-like social media platform. This API provides endpoints for managing users, realms, posts, and interactions within the application.

## Front End
Source code for the front-end app using the API can be found here: https://github.com/HarryAhnHS/flexor-front-end

## Features
- User authentication and session management.
- CRUD operations for realms, posts, comments, likes, commentLikes etc.
- API designed to support a responsive and interactive front-end application.

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/HarryAhnHS/flexor-api.git
cd flexor-api
```

### 2. Install Dependencies

Install the required dependencies by running:

```bash
npm install
# or
yarn install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory of the project and add the following variables. Adjust the values according to your environment:

```
DATABASE_URL=<your_postgresql_database_url>
PORT=<server_port>
JWT_SECRET=<your_jwt_secret>
```

For example:

```
DATABASE_URL=postgres://user:password@localhost:5432/flexor
PORT=5000
JWT_SECRET=supersecretkey
```

### 4. Run the Application Locally

Start the development server:

```bash
npm start
# or
yarn start
```

The server will be available at `http://localhost:<PORT>` (default: `http://localhost:5000`).

### 5. Run Database Migrations

This project uses Prisma ORM. To ensure your database schema is up-to-date, run:

```bash
npm run migrate
# or
yarn migrate
```

## API Endpoints
Below is a list of key API endpoints:

### Authentication
| Method | Endpoint         | Description                  |
|--------|------------------|------------------------------|
| POST   | `/auth/register` | Register a new user          |
| POST   | `/auth/login`    | Log in and receive a JWT     |
| GET    | `/auth/logout`   | Log out the current user     |

### User Management
| Method | Endpoint         | Description                           |
|--------|------------------|---------------------------------------|
| GET    | `/users/:id`     | Fetch details of a specific user      |
| PUT    | `/users/:id`     | Update details of a specific user     |
| DELETE | `/users/:id`     | Delete a specific user account        |

### Realms
| Method | Endpoint         | Description                           |
|--------|------------------|---------------------------------------|
| GET    | `/realms`        | Fetch all available realms            |
| POST   | `/realms`        | Create a new realm                    |
| GET    | `/realms/:id`    | Fetch details of a specific realm     |
| PUT    | `/realms/:id`    | Update a specific realm               |
| DELETE | `/realms/:id`    | Delete a specific realm               |

### Posts
| Method | Endpoint         | Description                           |
|--------|------------------|---------------------------------------|
| GET    | `/posts`         | Fetch all posts                       |
| POST   | `/posts`         | Create a new post                     |
| GET    | `/posts/:id`     | Fetch details of a specific post      |
| PUT    | `/posts/:id`     | Update a specific post                |
| DELETE | `/posts/:id`     | Delete a specific post                |

### Comments
| Method | Endpoint                     | Description                           |
|--------|------------------------------|---------------------------------------|
| POST   | `/posts/:id/comments`        | Add a comment to a post               |
| GET    | `/posts/:id/comments`        | Fetch comments for a specific post    |
| PUT    | `/comments/:id`              | Update a specific comment             |
| DELETE | `/comments/:id`              | Delete a specific comment             |

### Likes
| Method | Endpoint                     | Description                           |
|--------|------------------------------|---------------------------------------|
| POST   | `/posts/:id/like`            | Like a specific post                  |
| DELETE | `/posts/:id/like`            | Unlike a specific post                |
| POST   | `/comments/:id/like`         | Like a specific comment               |
| DELETE | `/comments/:id/like`         | Unlike a specific comment             |

## Folder Structure

```
flexor-api/
├── migrations/     # Database migrations
├── src/            # Source code
│   ├── controllers/ # Route handlers
│   ├── models/      # Database models
│   ├── routes/      # API routes
│   ├── middleware/  # Middleware functions
│   └── utils/       # Utility functions
├── .env.example    # Example environment variables
├── package.json    # Project metadata and dependencies
└── README.md       # Project documentation
```

## Contributing
If you would like to contribute to this project:

1. Fork the repository.
2. Create a new branch for your feature/bugfix.
3. Commit your changes and open a pull request.

