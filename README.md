# Social Media Content and Engagement Management System

A backend REST API for managing social media content, users, and comments.

This project was developed as an individual final project for ITEC 116 - IT Elective 4 (Systems Integration and Architecture 2) at Cavite State University.

## Project Overview

The Social Media Content and Engagement Management System (S-CEMS) is a backend system designed to help users manage social media content and engagement.

The system provides user authentication, post management, and comment management through RESTful API endpoints.

## Main Features

- User registration and login
- JWT authentication
- Password hashing using bcrypt
- Input validation
- Protected API routes
- User management
- Post management
- Comment management
- User-post relationships
- Post-comment relationships
- MySQL database integration
- RESTful API
- API testing using Postman

## Technology Stack

- NestJS
- TypeScript
- TypeORM
- MySQL
- JWT
- Passport
- bcrypt
- class-validator
- Postman
- Git and GitHub

## System Modules

### Authentication

- User registration
- User login
- JWT token generation
- Protected routes
- Password hashing

### Users

Users can be created, viewed, updated, and deleted.

### Posts

Users can create and manage social media posts.

### Comments

Users can create and manage comments associated with posts.

## REST API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login and receive a JWT |

### Users

| Method | Endpoint | Description |
|---|---|---|
| POST | `/users` | Create a user |
| GET | `/users` | Get all users |
| GET | `/users/:id` | Get a user |
| GET | `/users/:id/posts` | Get posts created by a user |
| PATCH | `/users/:id` | Update a user |
| DELETE | `/users/:id` | Delete a user |

### Posts

| Method | Endpoint | Description |
|---|---|---|
| POST | `/posts` | Create a post |
| GET | `/posts` | Get all posts |
| GET | `/posts/:id` | Get a post |
| GET | `/posts/user/:userId` | Get posts by user |
| PATCH | `/posts/:id` | Update a post |
| DELETE | `/posts/:id` | Delete a post |

### Comments

| Method | Endpoint | Description |
|---|---|---|
| POST | `/comments` | Create a comment |
| GET | `/comments` | Get all comments |
| GET | `/comments/:id` | Get a comment |
| GET | `/comments/post/:postId` | Get comments for a post |
| PATCH | `/comments/:id` | Update a comment |
| DELETE | `/comments/:id` | Delete a comment |

## Database

The system uses MySQL as its database and TypeORM as the ORM.

The main database entities are:

- Users
- Posts
- Comments

### Relationships

- One user can have many posts.
- One user can have many comments.
- One post can have many comments.
- Posts belong to a user.
- Comments belong to a user and a post.

## Authentication and Security

S-CEMS uses JWT-based authentication to protect API routes.

Passwords are hashed using bcrypt before being stored in the database.

Protected routes require a valid JWT access token through the Bearer Token authorization method.

Input validation is implemented using `class-validator` and NestJS `ValidationPipe`.

Sensitive configuration values such as database credentials and JWT secrets are stored in the `.env` file and excluded from Git using `.gitignore`.

## Installation

Clone the repository:

```bash
git clone https://github.com/stanlyandrei-dev/s-cems-api.git