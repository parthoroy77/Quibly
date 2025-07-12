import GoBack from "@/components/ui/go-back";

const Header = ({ title }: { title: string }) => {
  return (
    <div className="flex px-4 py-3 items-center justify-between sticky top-0 z-10 bg-background">
      <GoBack />
      <h3 className="font-semibold">{title}</h3>
      <div></div>
    </div>
  );
};

export default Header;
