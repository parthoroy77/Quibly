import { Separator } from "@quibly/ui/components/separator";
import { Inbox } from "lucide-react";
import { redirect } from "next/navigation";
import SendNewEmail from "./components/send-new-email";

type Props = {
  searchParams: Promise<{ email: string }>;
};

const VerificationRequestPage = async ({ searchParams }: Props) => {
  const email = (await searchParams).email;
  if (!email) {
    redirect("/register");
  }
  return (
    <section className="flex h-dvh items-center justify-center">
      <div className="py-10 px-4 md:max-w-xl w-full space-y-4 flex flex-col justify-center items-center border bg-background rounded-3xl">
        <Inbox size={48} />
        <h5 className="font-medium">Check Your inbox</h5>
        <p className="text-sm md:text-base text-center md:w-md">
          We'v sent you an email to <span className="font-instrumental-serif text-primary font-bold">{email}</span>.
          Please click the link in the email to activate your account.
        </p>
        <Separator className="mx-auto lg:w-[70%]" />
        <h6 className="text-xs">You didn't receive an email or your link expired</h6>
        <SendNewEmail email={email} />
      </div>
    </section>
  );
};

export default VerificationRequestPage;
