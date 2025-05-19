# Mediterranean Delight 🍽️

**Mediterranean Delight** is a full-featured restaurant website showcasing authentic Mediterranean cuisine. Built with Next.js 15, it offers an interactive menu, reservation system, and online ordering capabilities, providing a seamless experience for customers.

🌐 Live Preview: [mediterranean-delight-next.vercel.app](https://mediterranean-delight-next.vercel.app/)

---

## 🚀 Features

- **Interactive Menu**: Browse signature dishes with detailed descriptions and pricing.
- **Reservation System**: Book tables directly through the website.
- **Online Ordering**: Secure checkout powered by Stripe.
- **Authentication**: User login and registration with NextAuth.
- **Responsive Design**: Optimized for all devices.
- **SEO Friendly**: Enhanced visibility on search engines.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15.3.1
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Database ORM**: Prisma 6.6.0
- **Authentication**: NextAuth
- **Payment Processing**: Stripe
- **Form Handling**: React Hook Form, Zod, @hookform/resolvers
- **Email Services**: Nodemailer
- **Date Utilities**: date-fns

---

## 📦 Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/codedpro/mediterranean-delight-next.git
   cd mediterranean-delight-next
   ```

2. **Install dependencies**:

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**:

   Create a `.env.local` file and add the necessary environment variables as specified in `.env.example`.

4. **Generate Prisma client**:

   ```bash
   npx prisma generate
   ```

5. **Run the development server**:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```bash
├── components/        # Reusable UI components
├── pages/             # Next.js pages
├── prisma/            # Prisma schema and migrations
├── public/            # Static assets
├── styles/            # Global styles and Tailwind configurations
├── utils/             # Utility functions
├── types/             # TypeScript type definitions
├── .env.example       # Example environment variables
├── tailwind.config.js # Tailwind CSS configuration
└── package.json       # Project metadata and scripts
```

---

## 🧪 Scripts

- `npm run dev` – Start the development server
- `npm run build` – Build for production
- `npm run start` – Start the production server
- `npm run lint` – Run ESLint to analyze code quality

---

## 🙌 Acknowledgments

- [Next.js](https://nextjs.org/) – The React Framework
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework
- [Prisma](https://www.prisma.io/) – Next-generation ORM
- [Stripe](https://stripe.com/) – Payment processing platform
- [NextAuth](https://next-auth.js.org/) – Authentication for Next.js
- [React Hook Form](https://react-hook-form.com/) – Form state management
- [Zod](https://zod.dev/) – TypeScript-first schema validation

