"use client";
import { userLogout } from "@/actions/auth";
import { Button } from "@quibly/ui/components/button";
import { LogOut } from "lucide-react";
import { useTransition } from "react";

const LogoutButton = () => {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      disabled={isPending}
      onClick={() => startTransition(() => userLogout())}
      variant="ghost"
      className="w-full justify-start"
    >
      <LogOut />
      Log out
    </Button>
  );
};

export default LogoutButton;
