"use client";

import EditComp from "../../edit_comp/edit_comp";

import * as React from "react";
import { TCompProps } from "../types";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const RangeComp = ({ item, deleteField }: TCompProps) => {
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
        <Slider defaultValue={[item.defaultValue as number]} />
        <small className="text-muted-foreground">{item.description}</small>
      </div>
    </EditComp>
  );
};

export default RangeComp;
