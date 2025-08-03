import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as Sheet from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import * as Tabs from "@/components/ui/tabs";

import { Edit, Trash } from "lucide-react";
import * as React from "react";
import ModelTab from "./model-tab";
import DesignTab from "./design-tab";
import { TCompProps } from "../types";
import EditComp from "../../edit_comp/edit_comp";
import { TProperty, TValidation } from "@/app/types";
import { TFieldFunctions } from "./type";

type TSheetProps = {
  isSheetOpen: boolean;
  setSheetOpen: (value: boolean) => void;
  item: TCompProps["item"];
  inputType: string;
  FieldFunctions: TFieldFunctions;
  FieldProperties: TProperty & { inputType: string };
  updateProperties: () => void;
};

const InputCompSheet = ({
  isSheetOpen,
  setSheetOpen,
  item,
  inputType,
  FieldFunctions,
  FieldProperties,
  updateProperties,
}: TSheetProps) => {
  return (
    <Sheet.Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
      <Sheet.SheetContent className="border-none p-2 shadow-none h-full  !max-w-xl">
        <Sheet.SheetTitle></Sheet.SheetTitle>
        <ScrollArea className="w-full max-h-full h-full bg-white shadow-xl rounded overflow-hidden border border-neutral-300 ">
          <div className="w-full min-h-full h-full bg-white p-4 rounded overflow-hidden">
            {/* ACTUAL TABS */}

            <Tabs.Tabs defaultValue="model" className="w-full">
              <Tabs.TabsList className="w-full b gap-3">
                <Tabs.TabsTrigger
                  className="w-full  data-[state=active]:bg-white hover:bg-neutral-100 transition-all !text-neutral-800"
                  value="model"
                >
                  Model
                </Tabs.TabsTrigger>
                {/* <Tabs.TabsTrigger
                  className="w-2/4  data-[state=active]:bg-white hover:bg-neutral-100 transition-all !text-neutral-800"
                  value="design"
                >
                  Design
                </Tabs.TabsTrigger> */}
              </Tabs.TabsList>

              <Tabs.TabsContent value="model">
                <ModelTab
                  inputType={inputType}
                  FieldFunctions={FieldFunctions}
                  FieldProperties={FieldProperties}
                />
              </Tabs.TabsContent>
              {/* <Tabs.TabsContent value="design">
                <DesignTab />
              </Tabs.TabsContent> */}
            </Tabs.Tabs>

            <Sheet.SheetFooter className="mt-4">
              <Sheet.SheetClose asChild>
                <Button onClick={() => updateProperties()} className="w-full">
                  Complete
                </Button>
              </Sheet.SheetClose>
            </Sheet.SheetFooter>
          </div>
        </ScrollArea>
      </Sheet.SheetContent>
    </Sheet.Sheet>
  );
};

const InputComp = ({
  item,
  deleteField,
  inputType,
  updateProperty,
  isPreview = false,
}: TCompProps & { inputType: string }) => {
  const [isSheetOpen, setSheetOpen] = React.useState(false);

  const toggleSheet = () => {
    setSheetOpen((prev) => !prev);
    updateChanges();
  };

  // states;
  const [isLabelHidden, setHideLabel] = React.useState(item.isLabelHidden);
  const [isPlaceholderHidden, setHidePlaceholder] = React.useState(
    item.isPlaceholderHidden
  );
  const [isDescriptionHidden, setHideDescription] = React.useState(
    item.isDescriptionHidden
  );
  const [label, setLabel] = React.useState(item.label);
  const [description, setDescription] = React.useState(item.description);
  const [defaultValue, setDefaultValue] = React.useState(item.defaultValue);
  const [placeholder, setPlaceholder] = React.useState(item.placeholder);
  const [isRequired, setIsRequired] = React.useState(item.required);
  const [isDisabled, setIsDisabled] = React.useState(item.disabled);

  const [validations, setValidationsState] = React.useState<
    TValidation[] | undefined
  >(item.validations);

  const FieldProperties = {
    id: item.id,
    type: item.type,
    disabled: isDisabled,
    label,
    description,
    defaultValue,
    placeholder,
    required: isRequired,
    isDescriptionHidden,
    isPlaceholderHidden,
    validations,
    isLabelHidden,
    inputType,
  };

  const FieldFunctions = {
    setHideLabel: () => setHideLabel(!isLabelHidden),
    setHidePlaceholder: () => setHidePlaceholder(!isPlaceholderHidden),
    setHideDescription: () => setHideDescription(!isDescriptionHidden),
    setLabel,
    setDefaultValue,
    setDescription,
    setPlaceholder,
    setIsRequired: () => setIsRequired(!isRequired),
    setIsDisabled: () => setIsDisabled(!isDisabled),

    setValidations: (val: TValidation) => {
      setValidationsState((prev) => {
        const existingValidations = prev ?? [];
        if (
          !existingValidations.some(
            (validation) => validation.name === val.name
          )
        ) {
          return [...existingValidations, val];
        }

        const filteredValidations = existingValidations.filter(
          (validation) => validation.name !== val.name
        );

        return filteredValidations;
      });
    },
  };

  // rerender component when the item changes

  const updateChanges = () => {
    setHideLabel(item.isLabelHidden);
    setHidePlaceholder(item.isPlaceholderHidden);
    setHideDescription(item.isDescriptionHidden);
    setLabel(item.label);
    setDefaultValue(item.defaultValue);
    setDescription(item.description);
    setPlaceholder(item.placeholder);
    setIsRequired(item.required);
    setIsDisabled(item.disabled);
    setValidationsState(item.validations);
  };

  React.useEffect(() => {
    updateChanges();
  }, [item]);

  return (
    <>
      <EditComp
        isSheetOpen={isSheetOpen}
        deleteField={deleteField}
        id={item.id}
        isPreview={isPreview}
        setSheetOpen={setSheetOpen}
      >
        <div className="grid w-full max-w-sm items-center gap-2 relative">
          {!isLabelHidden && !isPreview && (
            <Label htmlFor="input">
              {label}{" "}
              {isRequired ? <span className="text-red-500">*</span> : null}
            </Label>
          )}
          <div className="grid gap-1">
            <Input
              type={inputType}
              value={defaultValue}
              id="input"
              placeholder={placeholder}
              disabled={isDisabled}
              onChange={(e) => setDefaultValue(e.target.value)}
        
            />
            {!isDescriptionHidden && !isPreview && (
              <small className="text-muted-foreground">{description}</small>
            )}
            {/* <small className="text-red-600">This is an error message</small> */}
          </div>
        </div>
      </EditComp>

      <InputCompSheet
        item={item}
        inputType={inputType}
        isSheetOpen={isSheetOpen}
        setSheetOpen={toggleSheet}
        FieldProperties={FieldProperties}
        updateProperties={() => updateProperty(FieldProperties)}
        FieldFunctions={FieldFunctions}
      />
    </>
  );
};

export default InputComp;

/*
  implement custom required error messages
*/
