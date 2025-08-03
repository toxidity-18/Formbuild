// Input elements
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Form elements
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

// Menu elements
import * as DropdownMenu from "@/components/ui/dropdown-menu";
import { CaretSortIcon } from "@radix-ui/react-icons";

// Collapsible elements
import * as Collapsible from "@/components/ui/collapsible";
import { TProperty, TValidation } from "@/app/types";
import { TFieldFunctions } from "./type";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Info, Trash } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import HoverCardWrapper from "../../hovercard-wrapper";

const textFieldValidations = [
  {
    name: "Minimum length",
    errorMessage: "",
    metric: "",
  },
  {
    name: "Maximum length",
    errorMessage: "",
    metric: "",
  },
  {
    name: "Contains",
    errorMessage: "",
    metric: "",
  },
  {
    name: "Ends with",
    errorMessage: "",
    metric: "",
  },
  {
    name: "Starts with",
    errorMessage: "",
    metric: "",
  },
  // {
  //   name: "Regex",
  //   errorMessage: "",
  //   metric: "",
  // },
  {
    name: "Length",
    errorMessage: "",
    metric: "",
  },
];

const numberFieldValidations = [
  {
    name: "Greater than",
    errorMessage: "",
    metric: "",
  },
  {
    name: "Greater than or equal to",
    errorMessage: "",
    metric: "",
  },
  {
    name: "Less than",
    errorMessage: "",
    metric: "",
  },
  {
    name: "Less than or equal to",
    errorMessage: "",
    metric: "",
  },
  {
    name: "Multiple of",
    errorMessage: "",
    metric: "",
  },
];

type TModelProps = {
  inputType: string;
  FieldFunctions: TFieldFunctions;
  FieldProperties: TProperty & { inputType: string };
};

type TValidationBoxProps = {
  validation: TValidation;
  updateValidation: (val: TValidation) => void;
  removeValidation: () => void;
  inputType: string;
};

const ValidationBox = ({
  validation,
  updateValidation,
  inputType,
  removeValidation,
}: TValidationBoxProps) => {
  const { name, errorMessage, metric } = validation;
  const [metricState, setMetric] = useState(metric);
  const [errorMsg, setErrorMsg] = useState(errorMessage);

  return (
    <div className="grid w-full items-center gap-2 relative">
      <Label className="text-neutral-600" htmlFor="max">
        {name}
      </Label>
      <div className="flex items-center gap-2">
        <Input
          type={inputType === "password" ? "text" : inputType}
          id="min"
          placeholder={name}
          value={metricState}
          onChange={(e) => {
            setMetric(e.target.value);
            if (inputType === "number") {
              validation.metric = Number(e.target.value);
            } else {
              validation.metric = e.target.value;
            }
          }}
        />
        <Button
          onClick={() => removeValidation()}
          variant={"outline"}
          size={"icon"}
          className="text-neutral-500 hover:text-black shrink-0"
        >
          <Trash size={16} />
        </Button>
      </div>
      <div>
        <Collapsible.Collapsible>
          <div className="flex items-center gap-2">
            <Collapsible.CollapsibleTrigger className="text-xs text-red-500 font-medium flex items-center gap-3">
              {name} error message
              <CaretSortIcon />
            </Collapsible.CollapsibleTrigger>
          </div>
          <Collapsible.CollapsibleContent className="pt-2">
            <Textarea
              placeholder="Enter error message"
              value={errorMsg}
              onChange={(e) => {
                setErrorMsg(e.target.value);
                validation.errorMessage = e.target.value;
              }}
            />
          </Collapsible.CollapsibleContent>
        </Collapsible.Collapsible>
      </div>
    </div>
  );
};

const ModelTab = ({ FieldFunctions, FieldProperties }: TModelProps) => {
  const {
    setHideLabel,
    setHidePlaceholder,
    setHideDescription,
    setLabel,
    setDefaultValue,
    setDescription,
    setPlaceholder,
    setIsRequired,
    setIsDisabled,
    setValidations,
  } = FieldFunctions;
  const {
    isLabelHidden,
    isPlaceholderHidden,
    isDescriptionHidden,
    label,
    description,
    defaultValue,
    placeholder,
    validations,
    required,
    disabled,
    inputType,
  } = FieldProperties;

  const activeValidations = inputType.includes("number")
    ? numberFieldValidations
    : textFieldValidations;

  return (
    <div className="flex flex-col pt-6">
      <div className="flex flex-col gap-4">
        {/* property switches */}
        <div className="flex flex-col gap-2">
          <div className="p-3 border rounded-md flex items-center justify-between">
            <div className="flex flex-col gap-1">
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
              <p className="text-sm font-medium">Hide description message</p>
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
              <p className="text-sm font-medium">Disable input</p>
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
            <Input
              type={inputType}
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
      </div>
      {/* validations */}
      <div>
        <h1 className="mt-10 mb-5 font-semibold">Validation</h1>
        <div className="w-full flex flex-col gap-4">
          {/* required button */}
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

          {/* Advanced validations */}
          <div className="flex items-center gap-3">
            <h1 className="font-semibold">Advanced validations</h1>
            <HoverCardWrapper
              description={
                <small>
                  If you do not provide a custom error message, Zod's default
                  error will be used. Refer to{" "}
                  <a
                    href="https://zod.dev/ERROR_HANDLING"
                    className="text-blue-500 underline"
                  >
                    Zod's docs
                  </a>{" "}
                  for default error values.
                </small>
              }
              side="top"
              className="p-3 leading-tight"
            >
              <Info size={13} />
            </HoverCardWrapper>
          </div>

          <DropdownMenu.DropdownMenu>
            <DropdownMenu.DropdownMenuTrigger asChild>
              <button className="p-2 border border-neutral-300 hover:border-black transition-all duration-100 rounded text-sm border-dashed">
                Add validation
              </button>
            </DropdownMenu.DropdownMenuTrigger>
            <DropdownMenu.DropdownMenuContent
              side="left"
              align="end"
              className="w-[300px]"
            >
              {activeValidations.map((val, index) => (
                <div
                  className="p-2 flex items-center gap-2 hover:bg-neutral-100 "
                  key={index}
                >
                  <Checkbox
                    onCheckedChange={() => setValidations(val)}
                    checked={validations?.some(
                      (validation) => validation.name === val.name
                    )}
                    id={`${val}-${index}`}
                    className="cursor-pointer"
                  />
                  <Label htmlFor={`${val}-${index}`} className="cursor-pointer">
                    {val.name}{" "}
                  </Label>
                </div>
              ))}
            </DropdownMenu.DropdownMenuContent>
          </DropdownMenu.DropdownMenu>
          {validations?.map((validation, index) => (
            <ValidationBox
              key={index}
              updateValidation={setValidations}
              validation={validation}
              inputType={inputType}
              removeValidation={() => setValidations(validation)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModelTab;
