# Hadath: Event Planner 

Hadath is a web application for event management, developed as part of the RT4 university project. The platform streamlines event organization, registration, and payment processes.

##  Features

- **User Management**
  - Secure authentication and authorization
  - Detailed user profile management

- **Event Capabilities**
  - Intuitive event creation and management
  - Seamless event registration
  - Dynamic ticket generation
  - Integrated online payment processing

- **Advanced Functionalities**
  - Real-time event check-in system
  - Comprehensive event statistics and analytics
  - Interactive charts for event insights

##  Technologies Used

### Frontend
![Angular](https://img.shields.io/badge/Angular-16.2.16-red)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-purple)
- Angular
- Bootstrap
- FontAwesome
- QR Code Generator

### Backend
![NestJS](https://img.shields.io/badge/NestJS-10.4-red)
![MySQL](https://img.shields.io/badge/MySQL-blue)
- NestJS
- TypeORM
- MySQL
- Passport.js (Authentication)

### Payment Integration
- Flouci API for secure online transactions

##  Installation

### Prerequisites
- Node.js (v20.15.0)
- npm (10.7.0)
- MySQL

### Setup Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/alikallel/ProjetWebRT4.git
   cd ProjetWebRT4/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables

Create a `.env` file in the backend directory with the following configurations:

```env
# Database Configuration
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=eventplanner

# Authentication
JWT_SECRET=your_jwt_secret

# Flouci Payment Integration
FLOUCI_SECRET=your_flouci_secret
FLOUCI_TOKEN=your_flouci_token
FLOUCI_ID=your_flouci_id
FLOUCI_URL=https://developers.flouci.com/api/generate_payment
FLOUCI_SUCCESS_URL=http://localhost:4200/payment/success
FLOUCI_FAIL_URL=http://localhost:4200/payment/fail
FLOUCI_VERIFY_URL=https://developers.flouci.com/api/verify_payment/
```


**Note:** This project is developed for academic purposes and is not intended for commercial use.

