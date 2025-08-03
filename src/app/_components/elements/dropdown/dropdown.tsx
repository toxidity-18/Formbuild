"use client";

import EditComp from "../../edit_comp/edit_comp";
import * as DropdownMenu from "@/components/ui/dropdown-menu";

import * as React from "react";
import { TCompProps } from "../types";
import { Label } from "@/components/ui/label";

const DropdownComp = ({ item, deleteField }: TCompProps) => {
  const [isSheetOpen, setSheetOpen] = React.useState(false);

  return (
    <EditComp
      deleteField={deleteField}
      id={item.id}
      isSheetOpen={isSheetOpen}
      setSheetOpen={setSheetOpen}
    >
      <div className="grid w-full max-w-sm items-center gap-3 relative">
        <Label className="text-neutral-600">
          {item.label}
          {item.required ? <span className="text-red-500">*</span> : null}
        </Label>
        <DropdownMenu.DropdownMenu>
          <DropdownMenu.DropdownMenuTrigger asChild>
            <button className="p-2 border border-neutral-300 hover:border-black transition-all duration-100 rounded text-sm max-w-xs text-left pl-4 w-full">
              {item.label}
            </button>
          </DropdownMenu.DropdownMenuTrigger>
          <DropdownMenu.DropdownMenuContent
            side="bottom"
            align="start"
            className="w-[320px]"
          >
            <DropdownMenu.DropdownMenuItem className="cursor-pointer hover:bg-neutral-200">
              Ends with
            </DropdownMenu.DropdownMenuItem>
            <DropdownMenu.DropdownMenuItem className="cursor-pointer hover:bg-neutral-200">
              Starts with
            </DropdownMenu.DropdownMenuItem>
            <DropdownMenu.DropdownMenuItem className="cursor-pointer hover:bg-neutral-200">
              Contains
            </DropdownMenu.DropdownMenuItem>
          </DropdownMenu.DropdownMenuContent>
        </DropdownMenu.DropdownMenu>
        <small className="text-muted-foreground">{item.description}</small>
      </div>
    </EditComp>
  );
};

export default DropdownComp;
