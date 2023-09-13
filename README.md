# Wholesale Delivery Management App

The Wholesale Delivery Management App is designed to facilitate the efficient distribution of goods from wholesalers to retail vendors. It enables truck drivers to manage orders and track vendor-related information. The system is accessible by Admin and Truck Drivers (TD).

## Table of Contents

- [User Roles](#user-roles)
- [User Flow](#user-flow)
- [Backend Modules](#backend-modules)
- [General Features](#general-features)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)


## User Roles

- Admin: Responsible for system management and configuration.
- Truck Drivers (TD): Responsible for order management and delivery.

## User Flow

### Admin Workflow

1. **Login**: Admin can log in using their mobile number and password.
2. **Vendor Management**: Admin can create , read , update and delete Vendors.
3.  **Category Management**: Admin can create , read , update and delete product categories.
4.  **Product Management**: Admin can create , read , update and delete products.
5.  **Driver Management**: Admin can read , update and delete driver profile.
6.   **Order Management**: Admin can read , approve and cancel orders.

### Truck Driver (TD) Workflow

1. **Login**: TDs can log in using their mobile number and password.
2. **Choose Vendor**: TDs can select a vendor from a list.
3. **Choose Product**: TDs can select a product from a list.
4. **Profile Management**: TDs can view, update and delete profile.
5. **Cart Management**: TDs can add products (for retail vendors) to a cart with quantities and finalize the order.
6. **Order Management**: TDs can create or make, view, cancel orders.


## Backend Modules (REST API)

### Admin Management

- Admin Registration: Admin can register and access the system.

### Truck Driver Management

- Create, Read, Update, Delete (CRUD): Drivers can register and access the system. Driver and Admin can manage Truck Driver profiles, including name, mobile number, address, and driving license details.

### Vendor Management

- Create, Read, Update, Delete (CRUD): Admin can manage Vendor profiles, including name, location, contact information, email.

### Products Inventory Management

- Create, Read, Update, Delete (CRUD): Admin can manage the product inventory, including product name, price, category, and image.

### Orders Management

- Create, Read: Admin and TDs can manage orders. Each order contains:
  - Products: A list of products in the order.
  - Truck Driver: Foreign key of truck driver.
  - Vendor details: Foreign key of vendor.
  - Total bill amount.

## General Features

1. **Input Validation**: Implement robust input validation for all updates and create methods to prevent data errors and enhance security.

2. **Password Encryption**: Ensure that sensitive information, such as passwords, is securely stored by implementing strong encryption mechanisms.

3. **Authentication and Authorization**: Implement authentication and authorization mechanisms using JWT (JSON Web Tokens) to secure access to the application's endpoints and resources, ensuring that only authorized users can perform specific actions.


## Getting Started

Follow the instructions below to get started with the Wholesale Delivery Management App.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/pv-kiran/deliverymanagement-api.git

2. Change into the project directory :
   ```bash
   cd deliverymanagement-api

4. Install dependencies:
   ```bash
   npm install

## Environment Variables

To run this project, you will need to set up the following environment variables in a `.env` file located in the root directory of the project:

- **MONGO_URL**: Replace with your MongoDB connection URL.

- **SECRET_KEY**: Set a secret key for JWT token generation and validation.

- **CLOUDINARY_NAME**: Your Cloudinary account's cloud name.

- **CLOUDINARY_API_KEY**: Your Cloudinary account's API key.

- **CLOUDINARY_SECRET**: Your Cloudinary account's API secret.


## Usage

1. Start the application:
   ```bash
   npm start


