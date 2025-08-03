"use client";
import * as React from "react";

import { TProperty } from "../types";
import { ElementsObj } from "../data/Elements";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

type TEditboxProps = {
  properties: TProperty[];
  setRequired: (value: string) => void;
  deleteField: (id: string) => void;
  setFormProperties: (properties: TProperty[]) => void;
  updateProperty: (property: TProperty) => void;
};

const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const Editbox = ({
  properties,
  setRequired,
  deleteField,
  setFormProperties,
  updateProperty,
}: TEditboxProps) => {
  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const newOrder = reorder(
      properties,
      result.source.index,
      result.destination.index
    );

    setFormProperties(newOrder); // Update the state with the new order
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="properties">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn(
              "w-full h-full  flex border border-neutral-200  rounded-lg  flex-col bg-white transition-all duration-150",
              snapshot.isDraggingOver ? "bg-neutral-100" : "bg-white"
            )}
          >
            {/* container */}
            <ScrollArea className="h-full max-h-full flex flex-col">
              <div className="w-full h-full  rounded-lg p-3 flex flex-col gap-3">
                {properties.map((item, index) => {
                  const Component = ElementsObj[item.type];
                  const itemTypes: any = {
                    text_input: "text",
                    number_input: "number",
                    email_input: "email",
                    url_input: "url",
                    password_input: "password",
                  };
                  return (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={cn(
                            "!cursor-grab active:cursor-grabbing rounded overflow-hidden border ",
                            snapshot.isDragging
                              ? "border border-neutral-700"
                              : "border-dashed border-neutral-300 hover:border-neutral-500"
                          )}
                        >
                          <Component
                            item={item}
                            deleteField={deleteField}
                            inputType={itemTypes[item.type]}
                            setFormProperties={setFormProperties}
                            isPreview={false}
                            updateProperty={updateProperty}
                          />
                        </div>
                      )}
                    </Draggable>
                  );

                  // Render the component with props
                })}
                {provided.placeholder}
              </div>
            </ScrollArea>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Editbox;
