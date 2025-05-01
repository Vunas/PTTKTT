# PTTKTT
# 🍔 FastFood Store Management System

A web-based management system for fast food stores built with **Spring Boot** (backend) and **ReactJS** (frontend). This project helps manage ingredients, products, orders, inventory, employees, customers and accounts efficiently.

## 🛠️ Technologies Used

### Backend (Java - Spring Boot)
- Spring Boot
- Spring Data JPA
- Spring Security 
- MySQL
- Maven

### Frontend (ReactJS)
- ReactJS
- Axios
- React Router DOM
- TailwindCSS  
- Material UI 

## ⚙️ Key Features

- 🧑‍💼 User account management 
- 📦 Ingredients and Product management
- 🛒 Order and order detail management
- 📊 Invoice and order statistics
- 🏢  Supplier & Warehouse Managemen
- 🏬 Inventory, import/export ingredient tracking
- 👨‍🍳 Cooking process management
- 🧾 Invoice generation and printing

## 🚀 Getting Started

### 1. Backend
```bash
cd be
./mvnw spring-boot:run
```

Configure database connection in `application.properties`.

### 2. Frontend (Admin)
```bash
cd admin
npm install
npm start
```

### 3. Frontend (Customer)
```bash
cd customer
npm install
npm start
```

The React app will run on `http://localhost:5173 ` and `http://localhost:5174`

## 🗃️ Database Overview

### 💾 Database Setup
This project uses **MySQL** or **XAMPP** for database management.

1. Create a database named **`fastfood`** in MySQL.
2. Import the file **`database.sql`** into the database before running the application.

💡 **Note:** Ensure that MySQL is running and the database connection is correctly configured in the application settings.

## ✅ Project Status

- [x] Database design
- [x] Spring Boot REST API
- [x] ReactJS admin interface
- [x] ReactJS customer interface
- [ ] Authentication & Authorization
- [ ] Testing and deployment

## 📸 Screenshots 


---

 add