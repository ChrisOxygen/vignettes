# Copilot Instructions for Vignettes

Next.js 15 visa/immigration form management system with Supabase Auth, Prisma ORM, and TanStack Query. Features dynamic multi-step forms, role-based access (USER/ADMIN), email verification, and field-level commenting for admin-user collaboration.

## Critical Architecture Decisions

### 1. Supabase Client Selection (MOST COMMON ERROR)

**Always use the correct client for your context** - mixing clients breaks authentication:

```typescript
// Server Components/Actions - MUST await cookies
import { createClient } from "@/utils/supabase/server";
const supabase = await createClient(); // Note the await!

// Client Components - No await, uses browser storage
import { createClient } from "@/utils/supabase/client";
const supabase = createClient(); // No await here

// Middleware - Direct createServerClient usage
import { createServerClient } from "@supabase/ssr";
```

### 2. Dynamic Form System Architecture

Forms are NOT individually coded - they're generated from configurations:

- **Config location**: `features/user/form/constants/form-configs.ts` maps `FormType` enum to field definitions
- **Schema generation**: `utils/schema-generator.ts` creates Zod schemas at runtime from configs
- **Self-initializing context**: `FormProvider` watches URL params, normalizes kebab-case → SCREAMING_SNAKE_CASE, queries existing data
- **URL pattern**: `/app/form/applicant-info` → FormType.APPLICANT_INFO → loads config → generates schema

**To add a form field**: Edit field config in `constants/form-configs.ts`, restart dev server. No manual Zod schema creation needed.

### 3. Middleware Route Protection Flow

`utils/supabase/middleware.ts` enforces business logic via route classification:

1. Classify route type: `auth|admin|user|onboarding|verification|public`
2. Check session + user metadata (role, status, hasBasicApplicantData)
3. Enforce rules:
   - `PENDING_VERIFICATION` → `/welcome-and-verify` (except auth/public routes)
   - Missing `hasBasicApplicantData` → `/onboarding` (USER role only)
   - ADMIN accessing /app routes → redirect to `/admin`
   - USER accessing /admin routes → redirect to `/app`
4. Return redirect with copied session cookies (critical for SSR)

**Never bypass middleware** - it syncs Supabase auth with Prisma user state.

## Essential Workflows

### Server Actions Pattern

All server actions follow this structure:

```typescript
"use server"; // Required at top of file

import { ApiResponse } from "@/features/shared/types/api";
import { prisma } from "@/prisma/prisma";

export const _actionName = async (input: ZInput): Promise<ApiResponse> => {
  try {
    // 1. Validate with Zod schema
    const validated = schema.parse(input);

    // 2. Use Prisma transaction for multi-table operations
    await prisma.$transaction(async (tx) => {
      // Operations here rollback on error
    });

    return { success: true, message: "Success", data };
  } catch (error) {
    return handleFeatureSpecificError(error); // Feature-specific error handlers
  }
};
```

**Key rules**:

- Actions in `features/*/actions/`, always return `ApiResponse<T>`
- Use Prisma transactions when touching multiple tables (e.g., creating user + verification token)
- Error handlers in `features/*/utils/errorHandlers.ts`

### TanStack Query Hook Pattern

Hooks wrap server actions for client components:

```typescript
export function useCreateUser(options?: UseCreateUserOptions) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: ZUserCreationData) => {
      const result = await _createUser(data); // Server action
      if (!result.success) throw new Error(result.message);
      return result;
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["users"] }); // Auto-refresh
      options?.onSuccess?.(result);
    },
    onError: (error: Error) => options?.onError?.(error.message),
  });

  return { mutate, isPending, isError, error, isSuccess, data };
}
```

**Pattern**: Create hook in `features/*/hooks/`, export from `index.ts`, use in components.

### Prisma Schema Conventions

When modifying `prisma/schema.prisma`:

- **UUIDs only**: `@id @default(uuid()) @db.Uuid`
- **Explicit PostgreSQL types**: `@db.Timestamptz`, `@db.VarChar(255)`, `@db.Text`
- **Always timestamps**: `createdAt DateTime @default(now()) @db.Timestamptz`, `updatedAt DateTime @updatedAt @db.Timestamptz`
- **Index foreign keys**: `@@index([userId])`, `@@index([submissionId])`
- **Cascade deletes**: `onDelete: Cascade` for dependent records (tokens, submissions)
- **Table naming**: Use `@@map("snake_case_table_name")`

After schema changes: `npx prisma migrate dev --name descriptive_name` then `npx prisma generate`.

## Development Commands

```bash
npm run dev                         # Dev server (localhost:3000)
npm run email                       # Preview email templates (localhost:3600)
npx prisma studio                   # Database GUI - use this to inspect data
npx prisma migrate dev --name xyz   # Create migration + apply + generate client
npx prisma generate                 # Regenerate client after schema edits
```

**Build command** (`npm run build`) automatically runs `prisma generate` - see `package.json`.

## Feature-Based Organization

Each feature follows this structure:

```
features/[feature-name]/
  actions/          # Server actions ("use server")
  components/       # React components
  hooks/            # TanStack Query wrappers
  utils/            # Helpers, error handlers
  validators/       # Zod schemas
  constants/        # Config objects
  context/          # React Context (if needed)
  types/            # TypeScript types
```

**Example**: `features/auth/` contains user creation, email verification, password reset. `features/user/form/` contains entire dynamic form system.

## Naming Conventions

- **Database**: `snake_case` (Prisma `@@map` directive)
- **TypeScript**: `camelCase` (variables, functions), `PascalCase` (components, types)
- **URLs**: `kebab-case` (route params: `/app/form/applicant-info`)
- **Enums**: `SCREAMING_SNAKE_CASE` (`FormType.APPLICANT_INFO`, `UserRole.ADMIN`)
- **Zod schema to type**: `type ZUserData = z.infer<typeof userSchema>` (always infer from schema)

## Key Files to Reference

- **`utils/supabase/middleware.ts`**: Complete route protection logic (200+ lines)
- **`features/user/form/constants/form-configs.ts`**: Central form field configuration mapping
- **`features/user/form/context/FormProviders.tsx`**: Self-initializing form context with URL watching
- **`prisma/schema.prisma`**: Database schema with all models, enums, and relationships
- **`features/auth/actions/index.ts`**: User creation with Supabase + Prisma transaction pattern
- **`features/shared/types/api.ts`**: ApiResponse interface used by ALL server actions

## Common Pitfalls

1. **Mixing Supabase clients**: Server client in client component = auth failure. Check imports.
2. **Forgetting `await createClient()`**: Server client requires await (Next.js 15 cookies API).
3. **Not using transactions**: Creating related records without `prisma.$transaction` risks partial writes.
4. **Direct Zod schema creation**: Forms auto-generate schemas from configs - edit configs instead.
5. **Ignoring middleware redirects**: Must copy session cookies when creating redirect responses.
6. **Missing "use server" directive**: Server actions won't work without it at file top.

## Form Submission Flow

1. User edits form → react-hook-form tracks changes
2. Save Draft → `FormSubmission` created/updated with `status: DRAFT`, `formData` as JSON
3. Submit → status becomes `SUBMITTED`
4. Admin reviews → adds `FieldComment` records with `fieldPath` (e.g., "passportNumber")
5. Admin requests changes → sets `commentType: CHANGE_REQUEST`
6. User needs edits on locked form → creates `EDIT_REQUEST` comment with `editRequestStatus: PENDING`
7. Admin approves → sets `editRequestStatus: APPROVED`, form unlocks
8. Form status flows: `DRAFT` → `SUBMITTED` → `UNDER_REVIEW` → `CHANGES_REQUESTED` | `APPROVED` | `REJECTED`

Comments support threading via `parentCommentId` and field-level targeting via `fieldPath` (null = form-level comment).

## Route Groups

- **`app/(external-routes)/`**: Public pages (landing, auth, assessments) - no authentication
- **`app/(protected-routes)/`**: Authenticated areas (user forms, admin panel, onboarding)
- Both share `app/layout.tsx` with global providers (AuthProvider, TanstackQueryProvider, Toaster)

Middleware classifies routes automatically based on path patterns - see `ROUTE_CONFIG` in `utils/supabase/middleware.ts`.

## Adding New Features

1. Create `features/[name]/` directory following structure above
2. Add server actions in `actions/` with "use server" directive
3. Create TanStack Query hooks in `hooks/` wrapping actions
4. Build UI components in `components/`
5. Add routes in `app/(protected-routes)/` or `app/(external-routes)/`
6. Update `ROUTE_CONFIG` in middleware if custom auth logic needed

Export hooks/components via `index.ts` barrel files for clean imports.
