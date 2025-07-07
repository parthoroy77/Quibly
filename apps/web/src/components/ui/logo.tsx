import CubeIcon from "@/assets/icon/cube-icon";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href={DEFAULT_LOGIN_REDIRECT}>
      <div className="flex items-center gap-2 justify-center">
        <div className="bg-background rounded-xl p-1 border">
          <CubeIcon className="shrink-0 size-7" />
        </div>

        <span className="text-2xl font-bold ">
          <span className="font-instrumental-sans">Q</span>
          <span className="font-instrumental-serif">uibly</span>
        </span>
      </div>
    </Link>
  );
};

export default Logo;
