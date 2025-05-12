# Big Stacks Banking Site

A modern full-stack banking application prototype built with Next.js, offering secure user authentication, account management, and transaction tracking with an intuitive UI.

![Big Stacks Banking](https://chas-banking-site.vercel.app/hero-1.png)

## 🚀 Features

- **Secure Authentication**: User registration and login with bcrypt password hashing
- **Account Dashboard**: View balance and transaction history
- **Money Management**: Deposit and transfer funds
- **Transaction History**: Visual representation of balance over time
- **Responsive Design**: Fully responsive UI that works on all device sizes
- **Dark/Light Mode**: Theme toggle with system preference support

## 💻 Tech Stack

- **Frontend**:
  - [Next.js](https://nextjs.org/)
  - [React](https://reactjs.org/)
  - [TailwindCSS](https://tailwindcss.com/)
  - [Shadcn UI](https://ui.shadcn.com/)
  - [Recharts](https://recharts.org/) for data visualization
- **Backend**:
  - Next.js API Routes
  - PostgreSQL (Supabase)
  - bcrypt for password hashing

## 📊 Database Structure

The application uses a PostgreSQL database with the following structure:

- **Users**: Store user credentials and profile information
- **Accounts**: Link to users and store account balances
- **Transactions**: Record all financial transactions with timestamps
- **Sessions**: Manage active user sessions

[Live Demo](https://chas-banking-site.vercel.app/)
