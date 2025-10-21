# Copilot Instructions for Vignettes

## Project Overview

A Next.js 15 visa/immigration form management system with Supabase Auth, Prisma ORM, and TanStack Query. Features multi-step form workflows, role-based access control, and admin/user collaboration through field-level commenting.

## Architecture Patterns

### Route Structure - Next.js Route Groups

- **`(external-routes)`**: Public/unauthenticated pages (auth flows, landing pages)
- **`(protected-routes)`**: Authenticated user areas (app, onboarding, verification)
- Both route groups share `/app` root layout but have different authentication requirements
- Middleware (`middleware.ts`) handles route protection and redirects based on user role/status

### Authentication Flow

1. **Supabase Auth** manages sessions via cookies (SSR-safe with `@supabase/ssr`)
2. **Three client types** for different contexts:
   - `utils/supabase/server.ts` - Server Components/Actions (awaited cookies)
   - `utils/supabase/client.ts` - Client Components (browser storage)
   - `utils/supabase/middleware.ts` - Edge middleware (route protection)
3. **Custom Prisma User model** extends Supabase auth with roles (`USER|ADMIN`) and status (`PENDING_VERIFICATION|ACTIVE|SUSPENDED|DEACTIVATED`)
4. **Email verification** required before account activation - uses token-based flow

### State Management Architecture

- **TanStack Query** (`@tanstack/react-query`) for server state (API calls, caching)
- **React Context + useReducer** for complex client state (see `features/onboarding/context`, `features/user/form/context`)
- **Custom hooks pattern**: Each feature exports specialized hooks (e.g., `useCreateUser`, `useFormSubmission`)
- Example: `features/auth/hooks/useCreateUserWithCredentials.ts` wraps mutation logic with callbacks

### Form System - Dynamic Schema Generation

Located in `features/user/form/`:

- **`constants/index.ts`**: `FIELD_CONFIGS` object defines all form fields declaratively
- **`utils/schema-generator.ts`**: Generates Zod schemas from `FIELD_CONFIGS` at runtime
- **`utils/default-values.ts`**: Auto-generates form defaults from same config
- **FormProvider context**: Self-initializing provider that:
  - Extracts `formType` from URL params using `useParams`
  - Normalizes kebab-case to SCREAMING_SNAKE_CASE (`applicant-info` → `APPLICANT_INFO`)
  - Automatically loads existing form data from database on initialization
  - Form components call `initializeForm()` in `useEffect` on mount
- **URL pattern**: `/app/form/[formType]` where formType is kebab-case (e.g., `applicant-info`)
- **Form initialization pattern**:

  ```tsx
  const { form, initializeForm, isInitialized } = useFormProvider();

  React.useEffect(() => {
    if (!isInitialized) {
      initializeForm();
    }
  }, [isInitialized, initializeForm]);
  ```

### Prisma Schema Conventions

- **UUIDs** for all primary keys (`@id @default(uuid()) @db.Uuid`)
- **Explicit types**: Use PostgreSQL-specific types (`@db.Timestamptz`, `@db.VarChar(255)`)
- **Timestamps**: Always include `createdAt` and `updatedAt` with `@db.Timestamptz`
- **Enums**: Define in schema (e.g., `FormType`, `FormStatus`, `UserRole`, `AccountStatus`)
- **Indexes**: Add for foreign keys and frequently queried fields (`@@index([userId])`)
- **Cascade deletes**: Use `onDelete: Cascade` for dependent records

## Critical Workflows

### Development Commands

```bash
npm run dev                        # Start dev server (localhost:3000)
npm run email                      # React Email preview server (localhost:3600)
npx prisma studio                  # Database GUI
npx prisma migrate dev --name xyz  # Create and apply migration
npx prisma generate                # Regenerate Prisma Client after schema changes
```

### Server Actions Pattern

- All server actions in `features/*/actions/` with `"use server"` directive
- **Return type**: Always use `ApiResponse` from `@/features/shared/types/api`
- **Error handling**: Feature-specific error handlers (see `features/auth/utils/errorHandlers.ts`)
- **Validation**: Zod schemas defined in `features/*/validators/`
- **Example structure**:
  ```typescript
  export const _createUser = async (
    input: ZUserCreationData
  ): Promise<ApiResponse> => {
    try {
      const validated = userCreationSchema.parse(input);
      // ... logic
      return { success: true, data, message: "Success" };
    } catch (error) {
      return handleUserCreationError(error);
    }
  };
  ```

### Middleware Route Protection Logic

File: `utils/supabase/middleware.ts`

- Classifies routes by type: `auth`, `admin`, `user`, `onboarding`, `verification`, `public`
- Enforces business rules:
  - `PENDING_VERIFICATION` users → `/welcome-and-verify`
  - Users without `basicApplicantData` → `/onboarding`
  - `ADMIN` role → `/admin` routes only
  - `USER` role → `/app` routes only
- Returns appropriate redirects with copied session cookies

### Form Submission Workflow

1. User fills dynamic form (react-hook-form + Zod validation)
2. Data saved as DRAFT in `FormSubmission` table (JSON field stores form data)
3. Admin reviews, adds `FieldComment` records (supports threading via `parentCommentId`)
4. Status transitions: `DRAFT` → `SUBMITTED` → `UNDER_REVIEW` → `CHANGES_REQUESTED` | `APPROVED` | `REJECTED`
5. Comments panel (`features/user/form/components/comments`) shows field-level feedback

## Component Organization

### Feature-Based Structure

Each feature in `features/` follows this pattern:

```
features/[feature-name]/
  actions/          # Server actions ("use server")
  components/       # React components (forms, UI)
  hooks/            # Custom hooks (TanStack Query wrappers)
  utils/            # Helper functions
  validators/       # Zod schemas
  constants/        # Configuration objects
  context/          # React Context providers (if needed)
  types/            # TypeScript interfaces
```

### Shared Resources

- **`shared/components/`**: Reusable UI (shadcn/ui components in `ui/` subdirectory)
- **`shared/providers/`**: Global providers (AuthProvider, TanstackQueryProvider)
- **`shared/types/`**: Cross-feature TypeScript types

### Email Templates

- **React Email** components in `emails/` directory
- Preview during dev: `npm run email` (port 3600)
- Rendering: Use `@react-email/render` in server actions
- Example: `emails/VerifyEmail.tsx` used in `features/auth/actions/email.actions.ts`

## Key Conventions

### TypeScript Types

- **Zod schemas first**: Define validation, then infer types: `type ZUserCreationData = z.infer<typeof userCreationSchema>`
- **Prisma types**: Import from `@prisma/client` (e.g., `FormType`, `User`, `UserRole`)
- **API responses**: Always typed as `ApiResponse` with `success`, `data`, `message`, `errorCode?`

### Client/Server Boundaries

- **"use client"** required for: hooks, context, event handlers, browser APIs
- **"use server"** required for: mutations, database access, Supabase server client
- **Supabase client selection**:
  - Server Components → `utils/supabase/server.ts`
  - Client Components → `utils/supabase/client.ts`
  - Middleware → `utils/supabase/middleware.ts`

### Form Field Naming

- **Database**: `snake_case` (Prisma `@@map` directive)
- **TypeScript/Forms**: `camelCase` (Zod schemas, react-hook-form)
- **URLs**: `kebab-case` (route params like `[formType]`)
- **Enums**: `SCREAMING_SNAKE_CASE` (Prisma enums, constants)

## Important Files

- **`middleware.ts`**: Entry point for auth/route protection
- **`prisma/schema.prisma`**: Database schema (run `prisma generate` after edits)
- **`features/user/form/constants/index.ts`**: Single source of truth for all form fields
- **`utils/supabase/*.ts`**: Supabase client factories - use correct one for context
- **`shared/providers/index.tsx`**: Root provider composition
- **`app/layout.tsx`**: Root layout with font optimization and global providers

## Common Tasks

### Adding a New Form Field

1. Add field config to `FIELD_CONFIGS` in `features/user/form/constants/index.ts`
2. Schema/validation auto-generates - no manual Zod needed
3. Update Prisma schema if persisting to dedicated column (vs JSON)
4. Restart dev server to pick up changes

### Creating a New Feature

1. Create directory in `features/[feature-name]/`
2. Follow feature structure pattern (actions, components, hooks, etc.)
3. Export hooks/components via `index.ts` barrel files
4. Register routes in `app/(protected-routes)/` or `app/(external-routes)/`

### Adding a Protected Route

1. Create route in `app/(protected-routes)/`
2. Update `ROUTE_CONFIG` in `utils/supabase/middleware.ts` if custom logic needed
3. Middleware automatically protects routes in `(protected-routes)` group
