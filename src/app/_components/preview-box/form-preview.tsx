import { ElementsObj } from "@/app/data/Elements";
import { TFormData, TProperty, TValidation } from "@/app/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { ZodString, ZodTypeAny, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

// helpers
const formatProp = (val: string) => val.toLowerCase().split(" ").join("");

function generateZodSchema(formItems: TProperty[]) {
  const schema: Record<string, z.ZodType<any>> = {};

  formItems.forEach((item) => {
    const inputName = `${formatProp(item.label)}-${item.id}`;
    const inputType = item.type;
    // Determine the base schema based on field type
    let fieldSchema: any;

    if (item.type === "checkbox") {
      fieldSchema = z.boolean();
    } else if (inputType.includes("number")) {
      fieldSchema = z.coerce.number();
    } else {
      fieldSchema = z.string();
    }

    // Apply validations based on TValidation
    item.validations?.forEach((rule) => {
      const options = {
        message: rule.errorMessage ? rule.errorMessage : undefined,
      };

      if (inputType.includes("number")) {
        switch (rule.name) {
          case "Greater than":
            fieldSchema = fieldSchema.gt(rule.metric as number, options);
            break;
          case "Greater than or equal to":
            fieldSchema = fieldSchema.gte(rule.metric as number, options);
            break;
          case "Less than":
            fieldSchema = fieldSchema.lt(rule.metric as number, options);
            break;
          case "Less than or equal to":
            fieldSchema = fieldSchema.lte(rule.metric as number, options);
            break;
          case "Multiple of":
            fieldSchema = fieldSchema.multipleOf(rule.metric as number, options);
            break;
          default:
            throw new Error("Unsupported validation type: " + rule.name);
        }
      } else if (inputType.includes("input") && !inputType.includes("number")) {
        switch (rule.name) {
          case "Minimum length":
            fieldSchema = fieldSchema.min(rule.metric as number, options);
            break;
          case "Maximum length":
            fieldSchema = fieldSchema.max(rule.metric as number, options);
            break;
          case "Contains":
            fieldSchema = (fieldSchema as ZodString).includes(
              rule.metric as string,
              options
            );
            break;
          case "Starts with":
            fieldSchema = (fieldSchema as ZodString).startsWith(
              rule.metric as string,
              options
            );
            break;
          case "Ends with":
            fieldSchema = (fieldSchema as ZodString).endsWith(
              rule.metric as string,
              options
            );
            break;
          case "Length":
            fieldSchema = (fieldSchema as ZodString).length(
              rule.metric as number,
              options
            );
            break;
          default:
            throw new Error("Unsupported validation type: " + rule.name);
        }
      }
    });

    // Assign the final schema to the field name
    schema[inputName] = fieldSchema;
  });

  return z.object(schema);
}

type TFormPreviewProps = {
  formData: TFormData;
  deleteField: (id: string) => void;
  setFormProperties: (properties: TProperty[]) => void;
  updateProperty: (property: TProperty) => void;
};

const FormPreview = ({
  formData,
  deleteField,
  setFormProperties,
  updateProperty,
}: TFormPreviewProps) => {
  const { properties, description, title, hideDescription, hideTitle } =
    formData;

  const [localProperties, setLocalProperties] = useState(formData.properties);


  const schema = generateZodSchema(formData.properties);

  useEffect(() => {
    setLocalProperties(properties);
  }, [formData]);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {}
  });

  // useEffect(() => {
  //   form.reset(
  //     localProperties.reduce((acc, prop) => {
  //       return {
  //         ...acc,
  //         [`${formatProp(prop.label)}-${prop.id}`]: prop.defaultValue || "",
  //       };
  //     }, {})
  //   );
  // }, [localProperties, form]);

  function onSubmit(values: z.infer<typeof schema>) {
    console.log(properties);
    console.log(values);
  }

  function getFormItem(prop: TProperty, field: any) {
    const typeMap: Record<string, string> = {
      password_input: "password",
      text_input: "text",
      number_input: "number",
      email_input: "email",
      url_input: "url",
    };

    if (prop.type.includes("input")) {
      return (
        <FormItem key={prop.id}>
          {!prop.isLabelHidden && (
            <FormLabel>
              {prop.label}{" "}
              {prop.required && <span className="text-red-500">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <Input
              type={typeMap[prop.type]}
              placeholder={prop.placeholder}
              {...field}
            />
          </FormControl>
          {!prop.isDescriptionHidden && (
            <FormDescription>{prop.description}</FormDescription>
          )}{" "}
          <FormMessage />
        </FormItem>
      );
    }

    if (prop.type == "checkbox") {
      return (
        <FormItem
          key={prop.id}
          className="flex  items-start space-x-3 space-y-0 rounded-md border p-4"
        >
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>

          <div className="flex flex-col h-full justify-center gap-1.5 leading-none">
            <FormLabel
              className={cn(prop.isDescriptionHidden && "translate-y-[2px]")}
            >
              {prop.label}
              {prop.required && <span className="ml-1 text-red-500">*</span>}
            </FormLabel>
            {!prop.isDescriptionHidden && (
              <FormDescription>{prop.description}</FormDescription>
            )}{" "}
            <FormMessage />
          </div>
        </FormItem>
      );
    }

    if (prop.type == "text_box") {
      return (
        <FormItem key={prop.id}>
          {!prop.isLabelHidden && (
            <FormLabel>
              {prop.label}{" "}
              {prop.required && <span className="text-red-500">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <Textarea placeholder={prop.placeholder} {...field}/>
          </FormControl>
          {!prop.isDescriptionHidden && (
            <FormDescription>{prop.description}</FormDescription>
          )}{" "}
          <FormMessage />
        </FormItem>
      );
    }

    return <div></div>;
  }
  return (
    <ScrollArea className="max-h-[90vh] flex flex-col py-4 pr-4 overflow-x-auto">
      <div className=" bg-white border py-4 min-h-96 max-w-lg rounded-md !mx-auto flex flex-col gap-6">
        <div className="flex flex-col gap-2 px-6">
          {hideTitle || (
            <h1 className="text-xl font-bold tracking-tight">{title} </h1>
          )}{" "}
          {hideDescription || (
            <p className="text-sm text-neutral-500">{description} </p>
          )}
        </div>
        <div className="p-2 pt-0 flex flex-col gap-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4 px-4"
            >
              {properties.map((prop, index) => {
                const name = `${formatProp(prop.label)}-${prop.id}`;
                return (
                  <FormField
                    key={prop.id}
                    control={form.control}
                    name={name}
                    render={({ field }) => getFormItem(prop, field)}
                  />
                );
              })}
              {properties.length > 0 && (
                <Button type="submit" className="w-32 rounded" size={"sm"}>
                  Submit
                </Button>
              )}{" "}
            </form>
          </Form>
        </div>
      </div>
    </ScrollArea>
  );
};

export default FormPreview;
