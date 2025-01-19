# Geno.AI - AI-Powered Content Creation Platform

## Overview

Geno.AI is a powerful content creation platform that leverages artificial intelligence to generate high-quality images and articles. Built with Next.js 14, TypeScript, and modern web technologies, it provides a seamless experience for creating professional content quickly and efficiently.

## Prerequisites

- Node.js 18.x or higher
- PostgreSQL 14.x or higher
- OpenAI API key or Cloudflare Workers API key
- Resend API key (for email)
- Cloudinary API key and secret (for image storage)

## Features

- **AI Image Generation**: Create stunning, unique images from text descriptions
- **AI Article Generation**: Generate SEO-optimized articles on any topic
- **Modern UI**: Clean, responsive interface built with Tailwind CSS and Ant Design
- **Authentication**: Secure user authentication system
- **Database Integration**: Prisma ORM with PostgreSQL database
- **API Integration**: OpenAI integration for AI capabilities

## Environment Setup

1. Create a `.env` (follow .env.template) file in the root directory with the following variables:

   ```env
   # Database
   SERVER_DATABASE_URL="postgresql://user:password@localhost:5432/genodb"

   # Authentication
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"

   # OpenAI
   SERVER_OPENAI_API_KEY="your-openai-key"

   # Cloudflare
   SERVER_CLOUDFLARE_API_KEY=your-cloudflare-api-key
   SERVER_CLOUDFLARE_ACCOUNT_ID=your-cloudflare-account-id

   # Email
   SERVER_EMAIL_RESEND_API_KEY=re_JLMbpb1r_AKaTGUcRmUVoNLrtrLbC7B71
   SERVER_EMAIL_SENDER_ADDRESS=raquel.dickinson66@ethereal.email
   SERVER_EMAIL_SENDER_PASSWORD=ctGKdb2gzWYpessyGp
   SERVER_EMAIL_HOST=smtp.ethereal.email
   SERVER_EMAIL_PORT=587

   # AWS
   AWS_ACCESS_KEY_ID="your-aws-key"
   AWS_SECRET_ACCESS_KEY="your-aws-secret"
   AWS_REGION="your-region"
   AWS_BUCKET_NAME="your-bucket"

   # Cloudinary
   SERVER_CLOUDINARY_API_KEY=your-cloudinary-api-key
   SERVER_CLOUDINARY_API_SECRET=your-cloudinary-api-secret

   ```

## Installation & Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Initialize and migrate the database:

   ```bash
   npm run crud:sync
   npm run database:sync:dev
   ```

3. Initialize and migrate the database:

   ```bash
   npm run database:migration:generate
   npx prisma generate
   npx prisma migrate dev
   ```

4. Seed the database (optional):

   ```bash
   npx prisma db seed
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build production version
- `npm start`: Start production server
- `npm run lint`: Run ESLint
- `npm run format`: Format code with Prettier
- `npm test`: Run tests
- `npm run migrate`: Run database migrations
- `npm run studio`: Open Prisma Studio

### Creating Migrations

1. Make changes to your Prisma schema in `prisma/schema.prisma`
2. Create a migration:
   ```bash
   npx prisma migrate dev --name description_of_changes
   ```
