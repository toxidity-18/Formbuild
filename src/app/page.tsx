"use client";

import { useCallback, useEffect, useState } from "react";
import Editbox from "./_components/editbox";
import Sidebar from "./_components/sidebar";
import { DragDropContext } from "@hello-pangea/dnd";
import { TFormData, TProperty } from "./types";
import { ScrollArea } from "@/components/ui/scroll-area";
import Previewbox from "./_components/preview-box/preview-box";
import FormPreview from "./_components/preview-box/form-preview";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, PanelRight, Pencil } from "lucide-react";
import TooltipWrapper from "./_components/tooltip-wrapper";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Home() {
  const onDragEnd = useCallback(() => {
    // the only one that is required
  }, []);

  const [formItems, setFormItems] = useState([]);

  const [formData, setFormData] = useState<TFormData>({
    title: "Enter form's title",
    hideDescription: false,
    hideTitle: false,
    description: "This is a placeholder for the form's description",
    required: [],
    properties: [],
  });

  const setRequired = (value: string) => {
    if (formData.required.includes(value)) {
      setFormData({
        ...formData,
        required: formData.required.filter((item) => item !== value),
      });
    } else {
      setFormData({
        ...formData,
        required: [...formData.required, value],
      });
    }
  };

  const setFormProperties = (properties: TProperty[]) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      properties: properties,
    }));
  };

  const updateProperty = (updatedProperty: TProperty) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      properties: prevFormData.properties.map((property) =>
        property.id === updatedProperty.id ? updatedProperty : property
      ),
    }));
  };

  const addProperty = (obj: TProperty) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      properties: [...prevFormData.properties, obj],
    }));
  };

  const deleteProperty = (id: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      properties: prevFormData.properties.filter((item) => item.id !== id),
    }));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="px-4 py-2 border">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant={"ghost"} size={"sm"}>
              <PanelRight size={16} />
              Elements
            </Button>
          </SheetTrigger>
          <SheetContent className="bg-white " side="left">
            <Sidebar addProperty={addProperty} />
          </SheetContent>
        </Sheet>
      </div>
      <div className="lg:pl-10 w-full lg:h-screen grid grid-cols-6 lg:grid-cols-7 bg-grid">
        <div className="col-span-1 p-3 px-0 hidden lg:block">
          <Sidebar addProperty={addProperty} />
        </div>

        <div className="h-screen col-span-3 flex flex-col gap-3 p-3">
          <div className="p-4 border rounded-md">
            <div className="flex flex-col">
              <div className="relative flex items-center justify-between gap-2">
                <Input
                  className="text-xl font-bold tracking-tight border border-transparent !ring-0 !outline-none hover:bg-neutral-100 "
                  value={formData.title}
                  type="text"
                  placeholder="Form title"
                  disabled={formData.hideTitle}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, title: e.target.value }));
                  }}
                />
                <TooltipWrapper
                  label={formData.hideTitle ? "Show title" : "Hide title"}
                  side="right"
                >
                  <Button
                    className="shrink-0 text-neutral-500 hover:text-black"
                    variant={"ghost"}
                    size={"icon"}
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        hideTitle: !prev.hideTitle,
                      }));
                    }}
                  >
                    {formData.hideTitle ? (
                      <EyeOff size={14} />
                    ) : (
                      <Eye size={14} />
                    )}
                  </Button>
                </TooltipWrapper>
              </div>
              <div className="relative flex items-center justify-between gap-2">
                <Input
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  disabled={formData.hideDescription}
                  className="border border-transparent !ring-0 text-neutral-500 !outline-none hover:bg-neutral-100  resize-none max-h-fit "
                />
                <TooltipWrapper
                  label={
                    formData.hideDescription
                      ? "Show description"
                      : "Hide description"
                  }
                  side="right"
                >
                  <Button
                    className="shrink-0 text-neutral-500 hover:text-black"
                    variant={"ghost"}
                    size={"icon"}
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        hideDescription: !prev.hideDescription,
                      }));
                    }}
                  >
                    {formData.hideDescription ? (
                      <EyeOff size={14} />
                    ) : (
                      <Eye size={14} />
                    )}
                  </Button>
                </TooltipWrapper>
              </div>
            </div>
          </div>
          <Editbox
            deleteField={deleteProperty}
            setRequired={setRequired}
            properties={formData.properties}
            setFormProperties={setFormProperties}
            updateProperty={updateProperty}
          />
        </div>

        <div className="h-screen col-span-3 p-3 px-0">
          <Previewbox formData={formData}>
            <FormPreview
              formData={formData}
              setFormProperties={setFormProperties}
              deleteField={deleteProperty}
              updateProperty={updateProperty}
            />
          </Previewbox>
        </div>
      </div>{" "}
    </DragDropContext>
  );
}
