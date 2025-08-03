import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const DesignTab = () => {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col gap-6">
        <h1 className="mt-5 mb-4 font-semibold">Field properties</h1>
        <div className="grid w-full items-center gap-2 relative">
          <Label className="text-neutral-600" htmlFor="font-size">
            Label font size
          </Label>
          <Input type="number" id="font-size" placeholder="Label font size" />
        </div>
        <div className="grid w-full items-center gap-2 relative">
          <Label className="text-neutral-600" htmlFor="font-size">
            Label color
          </Label>
          <Input
            type="color"
            id="font-size"
            className="rounded"
            placeholder="Label font size"
          />
        </div>
        <div className="grid w-full items-center gap-2 relative">
          <Label className="text-neutral-600" htmlFor="font-size">
            Field text font size
          </Label>
          <Input
            type="number"
            id="font-size"
            className="rounded"
            placeholder="Label font size"
          />
        </div>
        <div className="grid w-full items-center gap-2 relative">
          <Label className="text-neutral-600" htmlFor="font-size">
            Field text color
          </Label>
          <Input
            type="color"
            id="font-size"
            className="rounded"
            placeholder="Label font size"
          />
        </div>
        <div className="grid w-full items-center gap-4 relative">
          <Label className="text-neutral-600" htmlFor="font-size">
            Border radius
          </Label>
          <Slider defaultValue={[1]} max={5} step={1} />
        </div>

        <h1 className="mt-5 mb-4 font-semibold">More properties</h1>
        <div className="grid grid-cols-2 gap-2">
          <div className="grid w-full items-center gap-2 relative">
            <Label className="text-neutral-600" htmlFor="font-size">
              Error text color
            </Label>
            <Input
              type="color"
              id="font-size"
              className="rounded h-12"
              placeholder="Label font size"
            />
          </div>
          <div className="grid w-full items-center gap-2 relative">
            <Label className="text-neutral-600" htmlFor="font-size">
              Background color
            </Label>
            <Input
              type="color"
              id="font-size"
              className="rounded h-12"
              placeholder="Label font size"
            />
          </div>
          <div className="grid w-full items-center gap-2 relative mt-2">
            <Label className="text-neutral-600" htmlFor="font-size">
              Border Color
            </Label>
            <Input
              type="color"
              id="font-size"
              className="rounded h-12"
              placeholder="Label font size"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignTab;
