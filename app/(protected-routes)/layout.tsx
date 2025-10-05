import React from "react";

function ProtectedRoutesLayout({ children }: { children: React.ReactNode }) {
  return <main className="">{children}</main>;
}

export default ProtectedRoutesLayout;
