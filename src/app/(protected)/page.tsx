import { AppSidebar } from "@/components/app-sidebar";
import { cookies } from "next/headers";
import React from "react";

const page = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  console.log("asasa", accessToken);
  if (!accessToken) {
    return <div>Please login to view this page</div>;
  }
  return (
    <div>
      <AppSidebar>{children}</AppSidebar>
    </div>
  );
};

export default page;
