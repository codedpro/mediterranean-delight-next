# Mediterranean Delight Restaurant Website

A modern, full-stack restaurant website built with Next.js, MongoDB, and NextAuth.js. This project features a complete restaurant management system including menu management, reservations, and user authentication.

## Features

- 🍽️ **Menu Management**
  - Browse menu items by categories
  - Detailed item descriptions and images
  - Real-time availability updates

- 📅 **Reservation System**
  - Online table reservations
  - Email notifications for reservation status
  - User dashboard for managing reservations

- 👤 **User Authentication**
  - Secure login and registration
  - Google OAuth integration
  - User profiles and order history

- 💳 **Payment Integration**
  - Stripe payment processing
  - Secure checkout system
  - Order tracking

## Tech Stack

- **Frontend**
  - Next.js 14
  - TypeScript
  - Tailwind CSS
  - React Hook Form
  - Zod Validation

- **Backend**
  - Next.js API Routes
  - MongoDB with Prisma
  - NextAuth.js
  - Nodemailer for emails

- **Authentication**
  - NextAuth.js
  - Google OAuth
  - JWT tokens

- **Database**
  - MongoDB Atlas
  - Prisma ORM

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account
- Google OAuth credentials (optional)
- Stripe account (optional)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/roddazad/mediterranean-delight-next.git
   cd mediterranean-delight-next
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Fill in your environment variables:
     - MongoDB connection string
     - NextAuth secret
     - Google OAuth credentials (if using)
     - Stripe keys (if using)

4. Set up the database:
   ```bash
   npx prisma generate
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL="your-mongodb-connection-string"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"

# Google OAuth (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Stripe (optional)
STRIPE_PUBLIC_KEY="your-stripe-public-key"
STRIPE_SECRET_KEY="your-stripe-secret-key"
STRIPE_WEBHOOK_SECRET="your-stripe-webhook-secret"
```

## Project Structure

```
mediterranean-delight-next/
├── prisma/              # Database schema and migrations
├── public/             # Static assets
├── src/
│   ├── app/           # Next.js app router pages
│   ├── components/    # React components
│   ├── lib/          # Utility functions and configurations
│   └── data/         # Static data and constants
├── .env.example      # Example environment variables
└── package.json      # Project dependencies
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Next.js team for the amazing framework
- Prisma team for the excellent ORM
- MongoDB Atlas for the database hosting
- All contributors and supporters of the project
