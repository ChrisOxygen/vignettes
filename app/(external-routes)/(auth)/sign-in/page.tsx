import { SignInForm } from "@/features/auth/components/SignInForm";
import { Suspense } from "react";

function UserSignInPage() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <SignInForm />
      </Suspense>
    </div>
  );
}

export default UserSignInPage;
