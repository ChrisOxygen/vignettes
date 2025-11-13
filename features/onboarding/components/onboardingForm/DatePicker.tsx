"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, ChevronDownIcon } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/components/ui/button";
import { Calendar } from "@/shared/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { useOnboarding } from "../../context";

interface DatePickerProps {
  field: "dateOfBirth";
  placeholder?: string;
  className?: string;
}

export function DatePicker({
  field = "dateOfBirth",
  placeholder = "Pick a date",
  className = "",
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const {
    state: { formData },
    updateField,
  } = useOnboarding();

  // Parse DD/MM/YYYY string to Date object
  const parseDate = (dateString: string): Date | undefined => {
    if (!dateString) return undefined;

    const parts = dateString.split("/");
    if (parts.length !== 3) return undefined;

    const [day, month, year] = parts.map(Number);
    if (!day || !month || !year) return undefined;

    const date = new Date(year, month - 1, day);

    // Validate the date is valid
    if (isNaN(date.getTime())) return undefined;

    return date;
  };

  const selectedDate = parseDate(formData[field]);

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      // Format as DD/MM/YYYY to match your existing validation
      const formattedDate = format(date, "dd/MM/yyyy");
      updateField(field, formattedDate);
      setOpen(false); // Close the popover after selection
    } else {
      updateField(field, "");
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "h-12 text-base w-full justify-between text-left font-normal border-border/40 bg-background hover:border-border/60 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-200",
            !selectedDate && "text-muted-foreground",
            className
          )}
        >
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate ? format(selectedDate, "dd/MM/yyyy") : placeholder}
          </div>
          <ChevronDownIcon className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0 border-border/40 bg-background/95 backdrop-blur-sm shadow-lg overflow-hidden"
        align="start"
      >
        <Calendar
          mode="single"
          selected={selectedDate}
          captionLayout="dropdown"
          onSelect={handleDateSelect}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          autoFocus
          className="rounded-md"
          fromYear={1900}
          toYear={new Date().getFullYear()}
        />
      </PopoverContent>
    </Popover>
  );
}
