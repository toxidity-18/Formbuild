import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import JSONPreview from "./json-preview";
import { TFormData } from "@/app/types";
import FormPreview from "./form-preview";
import CodePreview from "./code-preview";

type TPreviewProps = {
  formData: TFormData;
  children: React.ReactNode;
};
const Previewbox = ({ formData, children }: TPreviewProps) => {
  return (
    <div className="h-full w-full">
      <Tabs defaultValue="preview" className="w-full">
        <TabsList className=" grid grid-cols-3">
          <TabsTrigger
            className="data-[state=active]:bg-white hover:bg-neutral-100 transition-all !text-neutral-800"
            value="preview"
          >
            Preview
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-white hover:bg-neutral-100 transition-all !text-neutral-800"
            value="json"
          >
            JSON
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-white hover:bg-neutral-100 transition-all !text-neutral-800"
            value="code"
          >
            code
          </TabsTrigger>
        </TabsList>
        <TabsContent value="preview">{children}</TabsContent>
        <TabsContent value="json" className="w-full h-full">
          <JSONPreview formData={formData} />
        </TabsContent>
        <TabsContent value="code">
          <CodePreview formData={formData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Previewbox;
