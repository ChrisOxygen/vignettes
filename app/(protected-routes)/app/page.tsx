"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

function UserDashboard() {
  const router = useRouter();

  useEffect(() => {
    router.push("/app/form/applicant-info");
  }, [router]);

  return null;
}

export default UserDashboard;
