import GoBack from "@/components/ui/go-back";
import { UseFormReturn } from "@quibly/utils/hook-form";
import { CreateQuestionFormData } from "@quibly/utils/validations";
import GenerateQuestionModalForm from "../generate-question-modal-form";

const Header = ({ title, form }: { title: string; form: UseFormReturn<CreateQuestionFormData> }) => {
  return (
    <div className="flex px-4 py-3 items-center justify-between sticky top-0 z-10 bg-background">
      <GoBack />
      <h3 className="font-semibold">{title}</h3>
      <div>
        <GenerateQuestionModalForm builderForm={form} />
      </div>
    </div>
  );
};

export default Header;
