"use client";
import { authClient } from "@/lib/auth-client";
import { Button } from "@quibly/ui/components/button";

export default function Page() {
  const session = authClient.useSession();
  console.log(session);
  return (
    <div className="flex min-h-svh items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Quibly</h1>
        <Button size="sm">Button</Button>
      </div>
    </div>
  );
}
