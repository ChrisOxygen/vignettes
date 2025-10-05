import React from "react";
import { Spinner } from "./ui/spinner";

function FullScreenLoader() {
  return (
    <div className="min-h-screen h-screen grid place-items-center w-full bg-background">
      <Spinner size="2xl" variant="default" />
    </div>
  );
}

export default FullScreenLoader;
