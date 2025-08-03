"use client";

import EditComp from "../../edit_comp/edit_comp";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import * as React from "react";
import { TCompProps } from "../types";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Label } from "@/components/ui/label";
import { type } from "os";

const DatePicker = ({ item, deleteField }: TCompProps) => {
  const [isSheetOpen, setSheetOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date>();

  return (
    <EditComp
      deleteField={deleteField}
      id={item.id}
      setSheetOpen={setSheetOpen}
      isSheetOpen={isSheetOpen}
    >
      <div className="grid w-full max-w-sm items-center gap-3 relative">
        <Label className="text-neutral-600">
          {item.label}
          {item.required ? <span className="text-red-500">*</span> : null}
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <small className="text-muted-foreground">{item.description}</small>
      </div>
    </EditComp>
  );
};

export default DatePicker;
