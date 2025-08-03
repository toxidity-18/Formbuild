"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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

const formSchema = z
  .object({
      numberinput: z.coerce.number()
        .gt(30)
  })
  .required({
      numberinput: true
  })

export default function FormComponent() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values); 
  }

  return (
    <div className='max-w-lg rounded-md border p-4 flex flex-col gap-6'>
      <header className='flex flex-col gap-2'>
        <h1 className="text-xl font-bold tracking-tight">Enter form's title</h1>
        <p className="text-sm text-neutral-500">This is a placeholder for the form's description </p>
      </header>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="numberinput"
            render={({ field }) => (
              <FormItem>
               <FormLabel>Number Input</FormLabel>
                <FormControl>
                  <Input type='number' placeholder="Placeholder" {...field} />
                </FormControl>
                <FormDescription>
                  This is a description message
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}