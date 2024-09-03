# WELCOME to Theme Park Directory
This program allows you to look at different rides at Theme Parks. You can make an account and leave reviews on each ride. You can even create new rides and new parks to add reviews to.

## Features

- **Parks Management**: Create and retrieve parks.
- **Rides Management**: Create and retrieve rides associated with parks.
- **Reviews Management**: Create, retrieve, update, and delete reviews associated with rides.
- **User Authentication**: User signup, login, and session management.

## app.py

This file implements a Flask-based RESTful API for managing theme parks, rides, and reviews. It provides endpoints for creating, retrieving, updating, and deleting parks, rides, and reviews, as well as handling user authentication through signup, login, logout, and session.

### Parks

- `GET /parks`: Retrieve all parks.
- `POST /parks`: Create a new park.

- `GET /parks/<int:id>`: Retrieve a park by its ID.

### Rides

- `GET /rides`: Retrieve all rides.
- `POST /rides`: Create a new ride.

- `GET /rides/<int:id>`: Retrieve a ride by its ID.

### Reviews

- `GET /reviews`: Retrieve all reviews.
- `POST /reviews`: Create a new review.

- `GET /reviews/<int:id>`: Retrieve a review by its ID.
- `PATCH /reviews/<int:id>`: Update an existing review.
- `DELETE /reviews/<int:id>`: Delete a review.

### User Authentication

- `POST /signup`: Create a new user account.
- `POST /login`: Login an existing user.
- `DELETE /logout`: Logout the current user.
- `GET /check_session`: Check if a user is logged in.

# models.py

This file defines SQLAlchemy models for a theme park management system, including Ride, Park, Review, and User models. Each model includes fields that represent its attributes and relationships, with Ride and Park linked in a one-to-many relationship, and Ride and Review similarly connected. The User model handles user authentication, using hashed passwords and a method for verifying them. The models also use serialization rules to control how data is exposed in API responses, ensuring that related objects are appropriately nested or excluded when serialized.

## Models

- **Park**: Represents a theme park, with attributes like `name` and `image`.
- **Ride**: Represents a ride within a park, with attributes like `name`, `image`, `description`, `height`, and `park_id`.
- **Review**: Represents a review of a ride, with attributes like `title`, `body`, `rating`, `username`, `ride_id`, and `user_id`.
- **User**: Represents a user, with attributes like `username` and `password_hash`.