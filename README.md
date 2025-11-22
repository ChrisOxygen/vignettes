# Vignettes - Visa & Immigration Management Platform

> **Insights for Global Talents**  
> A comprehensive Next.js 15 application for managing visa and immigration forms, assessments, and documentation with role-based access control and real-time collaboration features.

🌐 **Live Site:** [https://www.insights4globaltalents.com](https://www.insights4globaltalents.com)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [Authentication Flow](#authentication-flow)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## 🎯 Overview

Vignettes is a modern visa and immigration form management system designed to streamline the visa application process for both applicants and administrators. The platform provides:

- **Multi-step visa application forms** with dynamic validation
- **Role-based access control** (Users & Admins)
- **Field-level commenting system** for admin-user collaboration
- **Email verification** and secure authentication
- **Assessment forms** for visa eligibility (EB-1A, EB-2 NIW, UK Global Talent)
- **Document management** and form status tracking
- **Partner institution directory** for study abroad programs
- **Responsive design** with modern UI/UX

### Target Audience

- **Applicants**: Individuals seeking student, work, business, or tourist visas
- **Immigration Consultants**: Professionals managing multiple client applications
- **Educational Institutions**: Partner schools and universities worldwide
- **Corporate Clients**: Companies facilitating employee relocations

---

## ✨ Key Features

### 🔐 Authentication & Authorization

- **Supabase Auth** with SSR-safe cookie management
- **Email verification** with token-based flow
- **Password reset** functionality with secure tokens
- **Role-based access** (USER/ADMIN with invitation codes for admins)
- **Account status management** (Active, Pending Verification, Suspended, Deactivated)

### 📝 Dynamic Form System

- **9 comprehensive form types**:
  - Applicant Information
  - Ex-Spouse Information
  - Family Members Information
  - Relatives Abroad Information
  - Work & Business Information
  - Education Information
  - Visa & Permits Information
  - Previous Travel Information
  - Security & Statutory Questions

- **Smart form features**:
  - Auto-save draft functionality
  - URL-based form type detection
  - Dynamic schema generation with Zod
  - Conditional field rendering
  - Multi-step navigation

### 💬 Collaboration Features

- **Field-level commenting** on form submissions
- **Comment threading** for structured discussions
- **Comment types**: General, Admin Feedback, Change Request, Edit Request, System
- **Edit request workflow** (Pending → Approved/Denied)
- **Pin important comments** for visibility
- **Resolve comments** to track issue resolution

### 📊 Assessment Forms

Pre-qualification assessments for:

- **EB-1A** (Extraordinary Ability - United States)
- **EB-2 NIW** (National Interest Waiver - United States)
- **UK Global Talent Visa**

### 🌍 Global Services

- **Business Plans and Travels**
- **Study Abroad** (100+ partner institutions across UK, US, Canada, Ireland)
- **Global Talent Mobility**
- **Tourism Visa Services**

### 📧 Email Integration

- **React Email** templates for professional communications
- **Resend API** for reliable email delivery
- Email types:
  - Welcome emails
  - Email verification
  - Password reset
  - Assessment submission confirmations
  - Contact form notifications

---

## 🛠 Tech Stack

### Frontend

- **Next.js 15.5.4** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Utility-first styling
- **shadcn/ui** - Component library (Radix UI primitives)
- **React Hook Form** - Form management with Zod validation
- **TanStack Query** - Server state management
- **date-fns** - Date manipulation
- **Lucide React** - Icon library

### Backend & Database

- **Supabase Auth** - Authentication provider
- **Prisma ORM 6.16.2** - Database toolkit
- **PostgreSQL** - Primary database
- **Server Actions** - Next.js server-side functions

### Email & Communications

- **React Email** - Email template components
- **Resend** - Email delivery service

### Developer Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting (via Tailwind CSS plugin)
- **Prisma Studio** - Database GUI

---

## 🏗 Architecture

### Route Structure

The application uses Next.js 15 Route Groups for logical separation:

#### External Routes `(external-routes)`

Public-facing pages accessible without authentication:

- Landing page (`/`)
- Authentication flows (`/sign-in`, `/sign-up`, `/admin-sign-up`, `/reset-password`)
- Marketing pages (`/about-us`, `/services`, `/contact`)
- Assessment pages (`/assessments/eb1a`, `/assessments/eb2-niw`, `/assessments/uk-global-talent`)
- Partner institutions (`/partner-institutions`)

#### Protected Routes `(protected-routes)`

Authenticated areas with role-based access:

- User dashboard (`/app`)
- Multi-step onboarding (`/onboarding`)
- Email verification (`/welcome-and-verify`)
- Form management (`/app/form/[formType]`)
- Account settings (`/app/account`)

### Middleware Protection

The `middleware.ts` file handles:

- Session validation
- Route protection based on authentication status
- Role-based redirects (USER → `/app`, ADMIN → `/admin`)
- Account status checks (PENDING_VERIFICATION → `/welcome-and-verify`)
- Onboarding completion validation

### State Management

- **TanStack Query**: Server state, API calls, and caching
- **React Context + useReducer**: Complex client state (onboarding, form management)
- **localStorage**: Form draft persistence
- **URL params**: Form type detection and navigation state

### Database Design

- **UUID primary keys** for all tables
- **PostgreSQL-specific types** (`@db.Uuid`, `@db.Timestamptz`, `@db.VarChar`)
- **Cascade deletes** for referential integrity
- **Indexed foreign keys** for query performance
- **Enum types** for status management
- **JSON fields** for flexible form data storage

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 20+** and npm
- **PostgreSQL database** (local or Supabase)
- **Supabase account** for authentication
- **Resend API key** for email functionality

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ChrisOxygen/vignettes.git
   cd vignettes
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Configure the following variables (see [Environment Variables](#environment-variables)):

4. **Set up the database**

   ```bash
   # Generate Prisma Client
   npx prisma generate

   # Run migrations
   npx prisma migrate dev --name initial_setup

   # (Optional) Seed the database
   npx prisma db seed
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open the application**

   Navigate to [http://localhost:3000](http://localhost:3000)

### Email Development

Preview and develop email templates:

```bash
npm run email
```

Access the email preview at [http://localhost:3600](http://localhost:3600)

---

## 📁 Project Structure

```
vignettes/
├── app/                              # Next.js App Router
│   ├── (external-routes)/            # Public pages
│   │   ├── (auth)/                   # Authentication pages
│   │   │   ├── sign-in/
│   │   │   ├── sign-up/
│   │   │   ├── admin-sign-up/
│   │   │   └── reset-password/
│   │   └── (pages)/                  # Marketing pages
│   │       ├── about-us/
│   │       ├── services/
│   │       ├── assessments/
│   │       ├── partner-institutions/
│   │       └── contact/
│   ├── (protected-routes)/           # Authenticated pages
│   │   ├── app/                      # User dashboard
│   │   │   ├── form/[formType]/     # Dynamic form routes
│   │   │   └── account/
│   │   ├── onboarding/               # Multi-step onboarding
│   │   └── welcome-and-verify/       # Email verification
│   ├── api/                          # API routes
│   │   └── verify-email/[token]/    # Email verification endpoint
│   ├── layout.tsx                    # Root layout
│   └── globals.css                   # Global styles
│
├── features/                         # Feature-based modules
│   ├── auth/                         # Authentication
│   │   ├── actions/                  # Server actions
│   │   ├── components/               # Auth forms
│   │   ├── hooks/                    # TanStack Query hooks
│   │   ├── utils/                    # Helper functions
│   │   └── validators/               # Zod schemas
│   ├── user/                         # User features
│   │   └── form/                     # Form system
│   │       ├── components/           # Form components
│   │       ├── constants/            # Field configurations
│   │       ├── context/              # Form provider
│   │       └── utils/                # Schema generator
│   ├── onboarding/                   # Onboarding flow
│   │   ├── components/
│   │   ├── context/                  # Onboarding state
│   │   ├── reducer/                  # State reducer
│   │   └── validators/
│   ├── external-view/                # Public pages
│   │   ├── components/               # Marketing components
│   │   └── constants/                # Static data
│   └── shared/                       # Shared utilities
│       └── types/                    # Common TypeScript types
│
├── shared/                           # Shared resources
│   ├── components/                   # Reusable components
│   │   └── ui/                       # shadcn/ui components
│   ├── providers/                    # Global providers
│   │   ├── AuthProvider.tsx
│   │   └── TanstackQueryProvider.tsx
│   ├── hooks/                        # Custom hooks
│   └── lib/                          # Utility functions
│
├── prisma/                           # Database
│   ├── schema.prisma                 # Prisma schema
│   ├── migrations/                   # Migration history
│   └── prisma.ts                     # Prisma client instance
│
├── emails/                           # Email templates
│   ├── components/                   # Email components
│   ├── templates/                    # Assessment templates
│   ├── styles/                       # Email styles
│   └── *.tsx                         # Email layouts
│
├── utils/                            # Global utilities
│   └── supabase/                     # Supabase clients
│       ├── server.ts                 # Server Component client
│       ├── client.ts                 # Client Component client
│       └── middleware.ts             # Middleware client
│
├── public/                           # Static assets
│   ├── assets/                       # Images, logos
│   └── static/                       # Other static files
│
├── middleware.ts                     # Route protection
├── next.config.ts                    # Next.js configuration
├── tailwind.config.ts                # Tailwind configuration
├── tsconfig.json                     # TypeScript configuration
└── package.json                      # Project dependencies
```

---

## 🗄 Database Schema

### Core Tables

#### Users

- `id` (UUID) - Primary key
- `email` (VARCHAR) - Unique email address
- `firstName`, `lastName`, `middleName` - User names
- `role` (ENUM) - USER | ADMIN
- `accountStatus` (ENUM) - PENDING_VERIFICATION | ACTIVE | SUSPENDED | DEACTIVATED

#### FormSubmission

- `id` (UUID) - Primary key
- `userId` (UUID) - Foreign key to User
- `formType` (ENUM) - One of 9 form types
- `status` (ENUM) - DRAFT | SUBMITTED | UNDER_REVIEW | CHANGES_REQUESTED | APPROVED | REJECTED
- `formData` (JSON) - Flexible form field storage

#### FieldComment

- `id` (UUID) - Primary key
- `submissionId` (UUID) - Foreign key to FormSubmission
- `fieldPath` (VARCHAR) - Field identifier (null for form-level comments)
- `commentType` (ENUM) - GENERAL | ADMIN_FEEDBACK | CHANGE_REQUEST | EDIT_REQUEST | SYSTEM
- `content` (TEXT) - Comment text
- `parentCommentId` (UUID) - For threaded discussions
- `authorId`, `authorName`, `authorRole` - Denormalized author info
- `editRequestStatus` (ENUM) - PENDING | APPROVED | DENIED | WITHDRAWN

### Supporting Tables

- **EmailVerificationToken** - Email verification workflow
- **PasswordResetToken** - Password reset workflow
- **BasicApplicantData** - Onboarding data
- **AdminInvitation** - Admin registration codes

### Enums

- **UserRole**: `USER`, `ADMIN`
- **AccountStatus**: `ACTIVE`, `SUSPENDED`, `PENDING_VERIFICATION`, `DEACTIVATED`
- **FormType**: 9 different form types (see Features section)
- **FormStatus**: `DRAFT`, `SUBMITTED`, `UNDER_REVIEW`, `CHANGES_REQUESTED`, `APPROVED`, `REJECTED`
- **CommentType**: `GENERAL`, `ADMIN_FEEDBACK`, `CHANGE_REQUEST`, `EDIT_REQUEST`, `SYSTEM`
- **EditRequestStatus**: `PENDING`, `APPROVED`, `DENIED`, `WITHDRAWN`

---

## 🔑 Authentication Flow

### User Registration

1. User submits sign-up form with email and password
2. System creates Supabase auth user
3. System creates database User record with `PENDING_VERIFICATION` status
4. System generates email verification token
5. Verification email sent via Resend
6. User clicks verification link
7. Token validated, user status updated to `ACTIVE`
8. User redirected to onboarding flow

### Admin Registration

1. Admin must have invitation code
2. System validates invitation code
3. Standard registration flow with `ADMIN` role
4. Invitation code marked as used

### Session Management

- **Server Components**: Use `utils/supabase/server.ts` (awaits cookies)
- **Client Components**: Use `utils/supabase/client.ts` (browser storage)
- **Middleware**: Uses `utils/supabase/middleware.ts` (edge runtime)

### Middleware Protection Logic

```
1. Parse request URL and classify route type
2. Get Supabase session from cookies
3. If no session:
   - Allow external routes
   - Redirect protected routes to /sign-in
4. If session exists:
   - Check account status:
     - PENDING_VERIFICATION → /welcome-and-verify
     - ACTIVE → Check onboarding completion
   - Check role:
     - USER → Allow /app/* routes
     - ADMIN → Allow /admin/* routes
   - Redirect to appropriate dashboard
```

---

## 🌍 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@host:6543/database?pgbouncer=true"
DIRECT_URL="postgresql://user:password@host:5432/database"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Email (Resend)
RESEND_API_KEY="re_your_api_key"
RESEND_FROM_EMAIL="noreply@yourdomain.com"

# Application
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_NAME="Vignettes"

# Admin Invitation (Optional)
ADMIN_INVITATION_EXPIRY_DAYS="7"
```

### Database URLs

- **DATABASE_URL**: Use connection pooler (port 6543) for serverless functions
- **DIRECT_URL**: Direct connection (port 5432) for migrations and Prisma Studio

### Supabase Setup

1. Create project at [supabase.com](https://supabase.com)
2. Navigate to Settings → API
3. Copy project URL and anon key
4. Generate service role key (for admin operations)

### Resend Setup

1. Sign up at [resend.com](https://resend.com)
2. Verify your domain
3. Generate API key
4. Configure sender email

---

## 📜 Available Scripts

```bash
# Development
npm run dev              # Start development server (port 3000)
npm run email            # Email template preview (port 3600)

# Production
npm run build            # Build for production (runs prisma generate first)
npm run start            # Start production server

# Database
npx prisma studio        # Open Prisma Studio GUI
npx prisma generate      # Regenerate Prisma Client
npx prisma migrate dev   # Create and apply migration
npx prisma migrate reset # Reset database (DEV ONLY)
npx prisma db push       # Push schema changes without migration

# Code Quality
npm run lint             # Run ESLint

# Testing
npm test                 # Run tests (if configured)
```

### Prisma Workflow

**After schema changes:**

```bash
npx prisma migrate dev --name descriptive_name
npx prisma generate
```

**View database:**

```bash
npx prisma studio
```

---

## 🚢 Deployment

### Vercel Deployment (Recommended)

1. **Push to GitHub**

   ```bash
   git push origin main
   ```

2. **Import to Vercel**
   - Connect GitHub repository
   - Configure environment variables
   - Deploy

3. **Configure Build Settings**
   - Build Command: `npm run build` (already includes `prisma generate`)
   - Output Directory: `.next`
   - Install Command: `npm install`

4. **Set Environment Variables**
   - Add all variables from `.env.local`
   - Update `NEXT_PUBLIC_APP_URL` to production URL
   - Ensure `DATABASE_URL` uses connection pooler

5. **Database Connection**
   - Use Supabase connection pooler URL for `DATABASE_URL`
   - Use direct connection URL for `DIRECT_URL`
   - Port 6543 for pooler, 5432 for direct

### Other Platforms

The application can be deployed to any platform supporting Next.js 15:

- **Netlify**: Follow Next.js deployment guide
- **Railway**: Auto-deployment from GitHub
- **AWS Amplify**: Configure build settings
- **Self-hosted**: Use `npm run build && npm start`

### Post-Deployment Checklist

- ✅ All environment variables configured
- ✅ Database migrations applied
- ✅ Email domain verified (Resend)
- ✅ Supabase redirect URLs updated
- ✅ Test authentication flow
- ✅ Test email delivery
- ✅ Verify form submissions
- ✅ Check admin dashboard access

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feat/your-feature-name
   ```
3. **Make your changes**
4. **Test thoroughly**
5. **Commit with conventional commits**
   ```bash
   git commit -m "feat(scope): description"
   ```
6. **Push and create PR**
   ```bash
   git push origin feat/your-feature-name
   ```

### Conventional Commits

Use the following prefixes:

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code formatting (no logic changes)
- `refactor:` Code restructuring
- `test:` Adding tests
- `chore:` Maintenance tasks
- `perf:` Performance improvements

### Code Standards

- **TypeScript**: Use strict typing, avoid `any`
- **Components**: Follow feature-based organization
- **Naming**: camelCase for variables, PascalCase for components
- **Server Actions**: Use `"use server"` directive and `ApiResponse` type
- **Validation**: Zod schemas for all user inputs
- **Database**: Follow Prisma conventions (UUID keys, explicit types)

---

## 📝 License

This project is proprietary software owned by **Insights for Global Talents**. All rights reserved.

Unauthorized copying, distribution, or modification is prohibited without explicit permission.

---

## 📞 Contact & Support

- **Website**: [https://www.insights4globaltalents.com](https://www.insights4globaltalents.com)
- **Email**: support@insights4globaltalents.com
- **Office**: TheBunker, 279 Herbert Macaulay Way, Alagomeji, Yaba, Nigeria
- **Phone**: +234 703 959 4474

---

## 🙏 Acknowledgments

- **Next.js Team** for the amazing React framework
- **Vercel** for hosting and deployment platform
- **Supabase** for authentication infrastructure
- **Prisma** for the excellent database toolkit
- **shadcn/ui** for the beautiful component library
- **Resend** for reliable email delivery

---

**Built with ❤️ for global talents seeking new opportunities**
