import { getSession } from "@/actions/auth";
import { Button } from "@quibly/ui/components/button";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getSession();
  if (!session.isAuthenticated) {
    redirect("/login");
  }
  return (
    <div className="flex min-h-svh items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Quibly</h1>
        <Button size="sm">Button</Button>
      </div>
    </div>
  );
}
