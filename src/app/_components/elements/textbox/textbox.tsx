"use client";

import EditComp from "../../edit_comp/edit_comp";

import * as React from "react";
import { TCompProps } from "../types";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { TFieldFunctions } from "../input_comp/type";
import { TProperty } from "@/app/types";
import * as Sheet from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

type TSheetProps = {
  isSheetOpen: boolean;
  setSheetOpen: (value: boolean) => void;
  item: TCompProps["item"];
  FieldFunctions: TFieldFunctions;
  FieldProperties: TProperty;
  updateProperties: () => void;
};

const TextboxSheet = ({
  isSheetOpen,
  setSheetOpen,
  item,
  FieldFunctions,
  FieldProperties,
  updateProperties,
}: TSheetProps) => {
  const {
    setHideLabel,
    setHideDescription,
    setLabel,
    setDescription,
    setIsRequired,
    setIsDisabled,
    setPlaceholder,
    setDefaultValue,
  } = FieldFunctions;

  const {
    isLabelHidden,
    isDescriptionHidden,
    label,
    description,
    required,
    disabled,
    placeholder,
    defaultValue,
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
                      <p className="text-sm font-medium">Disable textbox</p>
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
                  <div className="grid w-full items-center gap-2 relative">
                    <Label className="text-neutral-600" htmlFor="placeholder">
                      Placeholder
                    </Label>
                    <Input
                      type="text"
                      id="placeholder"
                      placeholder="Placeholder"
                      value={placeholder}
                      onChange={(e) => setPlaceholder(e.target.value)}
                    />
                  </div>
                  <div className="grid w-full items-center gap-2 relative">
                    <Label className="text-neutral-600" htmlFor="field_label">
                      Default value
                    </Label>
                    <Textarea
                      id="field_label"
                      placeholder="Default value"
                      value={defaultValue}
                      onChange={(e) => setDefaultValue(e.target.value)}
                    />
                  </div>
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

const TextboxComp = ({
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
    isLabelHidden,
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
    setValidations: () => null,
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
  };

  React.useEffect(() => {
    updateChanges();
  }, [item]);

  return (
    <>
      <EditComp
        deleteField={deleteField}
        id={item.id}
        isSheetOpen={isSheetOpen}
        setSheetOpen={setSheetOpen}
        isPreview={false}
      >
        <div className="grid w-full max-w-sm items-center gap-2 relative mb-6">
          {!isLabelHidden && (
            <Label className="text-neutral-600">
              {label}
              {isRequired ? <span className="text-red-500">*</span> : null}
            </Label>
          )}
          <Textarea
            placeholder={placeholder}
            disabled={isDisabled}
            value={defaultValue}
          />
          {!isDescriptionHidden && !isPreview && (
            <small className="text-muted-foreground">{description}</small>
          )}
        </div>
      </EditComp>

      <TextboxSheet
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

export default TextboxComp;
