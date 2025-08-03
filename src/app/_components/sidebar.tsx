"use client";

import { elements } from "../data/Elements";
import { TProperty } from "../types";
import { v4 as uuidv4 } from "uuid";
import * as React from "react";

type TSidebarProps = {
  addProperty: (value: TProperty) => void;
};

const Sidebar = ({ addProperty }: TSidebarProps) => {
  const addNewProperty = (value: string, label: string) => {
    const propObj = {
      id: uuidv4(),
      type: value,
      label,
      isLabelHidden: false,
      description: "This is a description message",
      disabled: false,
      placeholder: "Placeholder",
      required: true,
      isDescriptionHidden: false,
      isPlaceholderHidden: false,
      defaultValue: "",
    };
    addProperty(propObj);
  };

  // actions modals

  const [isPreviewingForm, setPreviewForm] = React.useState(false);
  const [isViewingCode, setViewingCode] = React.useState(false);
  const [isResetingForm, setResetingForm] = React.useState(false);
  const [isComplete, setComplete] = React.useState(false);

  return (
    <>
      <aside className="w-full h-full rounded-md">
        <div className="sticky top-4">
          <div className="flex flex-col gap-1">
            <h1 className="font-medium mb-4">Elements</h1>
            {elements.map((element, index) => {
              return (
                <button
                  key={index}
                  onClick={() => {
                    addNewProperty(element.type, element.label);
                  }}
                  disabled={!element.completed}
                  className="text-sm flex p-2 pl-4 border w-full rounded items-center gap-4 bg-white  font-medium text-neutral-600  hover:bg-black hover:border-black  hover:text-white transition-all duration-100 disabled:hover:bg-neutral-200 disabled:cursor-not-allowed disabled:border-neutral-300 disabled:text-neutral-400"
                >
                  {element.icon}
                  {element.label}
                </button>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
