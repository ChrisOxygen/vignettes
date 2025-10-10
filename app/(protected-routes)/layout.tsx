import React from "react";

function ProtectedRoutesLayout({ children }: { children: React.ReactNode }) {
  return <main className="grid">{children}</main>;
}

export default ProtectedRoutesLayout;
