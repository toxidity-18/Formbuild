"use client";

import EditComp from "../../edit_comp/edit_comp";
import * as Sheet from "@/components/ui/sheet";

import * as React from "react";
import { TCompProps } from "../types";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TFieldFunctions } from "../input_comp/type";
import { TProperty } from "@/app/types";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SheetProps = {
  isSheetOpen: boolean;
  setSheetOpen: (value: boolean) => void;
  item: TCompProps["item"];
  FieldFunctions: TFieldFunctions;
  FieldProperties: TProperty;
  updateProperties: () => void;
};

const CheckBoxSheet = ({
  isSheetOpen,
  setSheetOpen,
  FieldFunctions,
  FieldProperties,
  item,
  updateProperties,
}: SheetProps) => {
  const {
    setHideLabel,
    setHideDescription,
    setLabel,
    setDescription,
    setIsRequired,
    setIsDisabled,
  } = FieldFunctions;

  const {
    isLabelHidden,
    isDescriptionHidden,
    label,
    description,
    required,
    disabled,
  } = FieldProperties;

  return (
    <Sheet.Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
      <Sheet.SheetContent className="border-none p-2 shadow-none h-full  !max-w-xl">
        <Sheet.SheetTitle></Sheet.SheetTitle>
        <ScrollArea className="w-full max-h-full h-full bg-white shadow-xl rounded overflow-hidden border border-neutral-300 ">
          <div className="w-full min-h-full h-full bg-white p-4 rounded overflow-hidden">
            <div className="flex flex-col pt-6">
              <div className="flex flex-col gap-4">
                {/* property switches */}
                <div className="flex flex-col gap-2">
                  <div className="p-3 border rounded-md flex items-center justify-between">
                    <div className="flex flex-col gap-2">
                      <p className="text-sm font-medium">Hide label</p>
                      <p className="text-xs text-neutral-600">
                        Hide the field's label.
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={isLabelHidden}
                          onCheckedChange={() => {
                            setHideLabel();
                          }}
                          id="required"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-3 border rounded-md flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium">
                        Hide description message
                      </p>
                      <p className="text-xs text-neutral-600">
                        Hide the field's description message.
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={isDescriptionHidden}
                          onCheckedChange={() => {
                            setHideDescription();
                          }}
                          id="required"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border rounded-md flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium">Disable checkbox</p>
                      <p className="text-xs text-neutral-600">
                        Disable the field and make it inaccessible.
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={disabled}
                          onCheckedChange={() => {
                            setIsDisabled();
                          }}
                          id="required"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="my-4" />

                {/* inputs  */}
                <div className="flex flex-col gap-4">
                  {!FieldProperties.isLabelHidden && (
                    <div className="grid w-full items-center gap-2 relative">
                      <Label className="text-neutral-600" htmlFor="field_label">
                        Field label
                      </Label>
                      <Input
                        type="text"
                        id="field_label"
                        placeholder="Field Label"
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                      />
                    </div>
                  )}

                  {!isDescriptionHidden && (
                    <div className="grid w-full items-center gap-2 relative">
                      <Label className="text-neutral-600" htmlFor="field_label">
                        Description
                      </Label>
                      <Textarea
                        id="field_label"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  )}
                </div>
                <hr className="my-4" />

                <div className="grid gap-2">
                  <div className="p-3 border rounded-md flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium">Field is required</p>
                      <p className="text-xs text-neutral-600">
                        {" "}
                        Input has to be entered for one to submit form.
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={required}
                          onCheckedChange={() => setIsRequired()}
                          id="required"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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

const CheckboxComp = ({
  item,
  deleteField,
  updateProperty,
  isPreview = false,
}: TCompProps) => {
  const [isSheetOpen, setSheetOpen] = React.useState(false);
  const toggleSheet = () => {
    setSheetOpen((prev) => !prev);
    updateChanges();
  };
  // initialize states;
  const [isLabelHidden, setHideLabel] = React.useState(item.isLabelHidden);
  const [isDescriptionHidden, setHideDescription] = React.useState(
    item.isDescriptionHidden
  );
  const [label, setLabel] = React.useState(item.label);
  const [description, setDescription] = React.useState(item.description);
  const [isRequired, setIsRequired] = React.useState(item.required);
  const [isDisabled, setIsDisabled] = React.useState(item.disabled);

  // properties
  const FieldProperties = {
    id: item.id,
    type: item.type,
    disabled: isDisabled,
    label,
    description,
    required: isRequired,
    isDescriptionHidden,
    isLabelHidden,
  };

  // field functions
  const FieldFunctions = {
    setHideLabel: () => setHideLabel(!isLabelHidden),
    setHideDescription: () => setHideDescription(!isDescriptionHidden),
    setLabel,
    setDescription,
    setIsRequired: () => setIsRequired(!isRequired),
    setIsDisabled: () => setIsDisabled(!isDisabled),
    setHidePlaceholder: () => null,
    setDefaultValue: () => null,
    setPlaceholder: () => null,
    setValidations: () => null,
  };
  // rerender component when the item changes

  const updateChanges = () => {
    setHideLabel(item.isLabelHidden);
    setHideDescription(item.isDescriptionHidden);
    setLabel(item.label);
    setDescription(item.description);
    setIsRequired(item.required);
    setIsDisabled(item.disabled);
  };

  React.useEffect(() => {
    updateChanges();
  }, [item]);

  return (
    <>
      <EditComp
        deleteField={deleteField}
        id={item.id}
        setSheetOpen={setSheetOpen}
        isPreview={isPreview}
        isSheetOpen={isSheetOpen}
      >
        <div className="items-top flex space-x-2 pb-4">
          <Checkbox
            required={isRequired}
            disabled={isDisabled}
            id={`checkbox-${item.id}`}
          />
          <div className="grid gap-1.5 leading-none">
            {!isLabelHidden && (
              <label
                htmlFor={`checkbox-${item.id}`}
                className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", isDescriptionHidden && "translate-y-[1px]")}
              >
                {label}
                {isRequired ? <span className="text-red-500 ml-1">*</span> : null}
              </label>
            )}
            {!isDescriptionHidden && (
              <p className="text-sm text-muted-foreground">{description} </p>
            )}{" "}
          </div>
        </div>
      </EditComp>
      <CheckBoxSheet
        isSheetOpen={isSheetOpen}
        setSheetOpen={toggleSheet}
        FieldProperties={FieldProperties}
        updateProperties={() => updateProperty(FieldProperties)}
        FieldFunctions={FieldFunctions}
        item={item}
      />
    </>
  );
};

export default CheckboxComp;
