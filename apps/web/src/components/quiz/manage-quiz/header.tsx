import GoBack from "@/components/ui/go-back";
import { Button } from "@quibly/ui/components/button";
import { SaveAll } from "lucide-react";

const Header = ({ title }: { title: string }) => {
  return (
    <div className="flex px-4 py-3 items-center justify-between sticky top-0 z-10 bg-background">
      <GoBack />
      <h3 className="font-semibold">{title}</h3>
      <div>
        <Button>
          <SaveAll />
          Save
        </Button>
      </div>
    </div>
  );
};

export default Header;
