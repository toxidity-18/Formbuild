import { TFormData, TProperty } from "@/app/types";

import Codeblock from "./Codeblock";

type TCodePreviewProps = {
  formData: TFormData;
};

const removeDuplicates = (data: any) => [...new Set(data)];

const formImports: Record<
  string,
  {
    component: string;
    primitives: string[];
  }
> = {
  input: {
    component: "input",
    primitives: ["Input"],
  },
  range: {
    component: "range",
    primitives: ["Range"],
  },
  text_box: {
    component: "text-area",
    primitives: ["Textarea"],
  },
  date_picker: {
    component: "calendar",
    primitives: ["Calendar"],
  },
  dropdown: {
    component: "dropdown",
    primitives: ["DropdownMenu"],
  },
  multichoice: {
    component: "radio-group",
    primitives: ["RadioGroup"],
  },
  checkbox: {
    component: "checkbox",
    primitives: ["Checkbox"],
  },
  switch: {
    component: "switch",
    primitives: ["Switch"],
  },
};

const getSourceCode = (formData: TFormData) => {
  const FormProperties = formData.properties;

  // Helper: Remove duplicate imports
  const elementImports = (() => {
    const formComponentsImport = `
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";`;

    const primitiveImports = FormProperties.map((prop) => {
      const element = formImports[prop.type];
      if (prop.type === "linebreak") return "";

      if (prop.type.includes("input")) {
        return `import { Input } from "@/components/ui/input";`;
      }
      if (prop.type === "text_box") {
        return `import { Textarea } from "@/components/ui/textarea";`;
      }
      if (prop.type === "checkbox") {
        return `import { Checkbox } from "@/components/ui/checkbox";`;
      }
    });

    const uniqueImports = removeDuplicates(primitiveImports)
      .filter(Boolean)
      .join("\n");

    return [formComponentsImport, uniqueImports].join("\n");
  })();

  const generateFormFields = () =>
    FormProperties.map((prop) => {
      const name = prop.label.toLowerCase().split(" ").join("");

      if (prop.type.includes("input")) {
        return `
          <FormField
            control={form.control}
            name="${name}"
            render={({ field }) => (
              <FormItem>
               ${
                 prop.isLabelHidden
                   ? ""
                   : `<FormLabel>${prop.label}</FormLabel>`
               }
                <FormControl>
                  <Input type='${prop.type.split("_")[0]}' placeholder="${
          prop.placeholder
        }" {...field} />
                </FormControl>
              ${
                prop.isDescriptionHidden
                  ? ""
                  : `  <FormDescription>
                  ${prop.description}
                </FormDescription>`
              }
                <FormMessage />
              </FormItem>
            )}
          />`;
      }
      if (prop.type === "checkbox") {
        return `
          <FormField
            control={form.control}
            name="${name}"
            render={({ field }) => (
              <FormItem
                className="flex items-start space-x-3 space-y-0 rounded-md border p-4"
              >
                <FormControl>
                  <Checkbox  checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="grid gap-1.5 leading-none">
                 ${
                   prop.isLabelHidden
                     ? ""
                     : `<FormLabel>
                    ${prop.label}
                    ${
                      prop.required &&
                      `<span className="ml-1 text-red-500">*</span>`
                    }
                  </FormLabel>`
                 }
                  <FormDescription>${prop.description}</FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />`;
      }
      if (prop.type === "text_box") {
        return `
        <FormField
          control={form.control}
          name="${name}"
          render={({ field }) => (
            <FormItem >
            ${
              !prop.isLabelHidden &&
              `<FormLabel>
                ${prop.label}
                ${prop.required && `<span className="text-red-500">*</span>`}
              </FormLabel>`
            }
            <FormControl>
              <Textarea placeholder="${prop.placeholder}" {...field}/>
            </FormControl>
            ${
              !prop.isDescriptionHidden &&
              `<FormDescription>${prop.description}</FormDescription>`
            }{" "}
            <FormMessage />
          </FormItem>
          )}
        />`;
      }
    })
      .join("")
      .trim();

  const formatProp = (val: string) => val.toLowerCase().split(" ").join("");

  const getZodValidation = (prop: TProperty) => {
    let isNumberType = prop.type.includes("number");
    const validations: string[] = [];

    if (prop.type !== "checkbox") {
      validations.push(isNumberType ? "z.coerce.number()" : "z.string()");
    } else {
      validations.push("z.boolean()");
    }

    if (prop.type.includes("email")) {
      validations.push("email()");
    }

    if (prop.type.includes("url")) {
      validations.push("url()");
    }

    prop.validations?.forEach(
      ({ name, metric, errorMessage = "Invalid input" }) => {
        const messageOption = errorMessage
          ? `, { message: "${errorMessage.trim()}" }`
          : "";

        switch (name) {
          case "Minimum length":
            validations.push(`min(${metric}${messageOption})`);
            break;
          case "Maximum length":
            validations.push(`max(${metric}${messageOption})`);
            break;
          case "Contains":
            validations.push(`includes("${metric}"${messageOption})`);
            break;
          case "Ends with":
            validations.push(`endsWith("${metric}"${messageOption})`);
            break;
          case "Length":
            validations.push(`length(${metric}${messageOption})`);
            break;
          case "Regex":
            validations.push(`regex(new RegExp("${metric}")${messageOption})`);
            break;
          case "Greater than":
            validations.push(`gt(${metric}${messageOption})`);
            break;
          case "Greater than or equal to":
            validations.push(`gte(${metric}${messageOption})`);
            break;
          case "Less than":
            validations.push(`lt(${metric}${messageOption})`);
            break;
          case "Less than or equal to":
            validations.push(`lte(${metric}${messageOption})`);
            break;
          case "Multiple of":
            validations.push(`multipleOf(${metric}${messageOption})`);
            break;
          default:
            break;
        }
      }
    );

    const validationChain = validations.join("\n        .");

    return `${formatProp(prop.label)}: ${validationChain}`;
  };

  const validations = FormProperties.map((prop) => getZodValidation(prop));
  const requiredFields = FormProperties.filter((prop) => prop.required);

  const formSchema = `
const formSchema = z
  .object({
      ${validations.join(",\n      ")}
  })
  .required({
    ${requiredFields
      .map((field) => `  ${formatProp(field.label)}: true`)
      .join(",\n    ")}
  })`;

  const defaultValues = removeDuplicates(
    FormProperties.filter((prop) => prop.defaultValue !== "").map((prop) => {
      const name = prop.label.toLowerCase().split(" ").join("");

      let defaultValue;

      if (prop.type.includes("number")) {
        defaultValue = prop.defaultValue;
      } else if (prop.type === "checkbox") {
        defaultValue = `${prop.defaultValue}`.toLowerCase() === "true";
      } else {
        defaultValue = `"${prop.defaultValue}"`;
      }

      return ` ${name}: ${defaultValue}`;
    })
  ).join(",\n      ");

  // Form component template
  const component = `
export default function FormComponent() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ${defaultValues}
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values); 
  }

  return (
    <div className='max-w-lg rounded-md border p-4 flex flex-col gap-6'>
      <header className='flex flex-col gap-2'>
        ${
          !formData.hideTitle &&
          `<h1 className="text-xl font-bold tracking-tight">${formData.title}</h1>`
        }
        ${
          !formData.hideDescription &&
          `<p className="text-sm text-neutral-500">${formData.description} </p>`
        }
      </header>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          ${generateFormFields()}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
`;

  // Final output with proper formatting
  const output = `"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
${elementImports}
${formSchema}
${component}
`;

  return output.trim(); // Remove extra spaces from the beginning and end
};

const CodePreview = ({ formData }: TCodePreviewProps) => {
  const sourceCode = getSourceCode(formData);
  return <Codeblock lang="typescript" formCode={sourceCode} />;
};

export default CodePreview;
