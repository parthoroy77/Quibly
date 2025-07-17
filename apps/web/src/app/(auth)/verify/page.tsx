import { auth } from "@/lib/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { notFound, redirect } from "next/navigation";
import VerifyView from "./components/verify-view";

type SearchParams = Promise<{ token: string | undefined }>;

const VerifyPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const token = (await searchParams).token;
  const session = await auth();

  if (session) {
    redirect(DEFAULT_LOGIN_REDIRECT);
  }

  if (!token) {
    notFound();
  }

  return (
    <section className="h-dvh w-full">
      <VerifyView token={token} />
    </section>
  );
};

export default VerifyPage;
