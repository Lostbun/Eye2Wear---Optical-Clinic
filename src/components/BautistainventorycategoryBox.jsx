
//AICODE
"use client"
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandGroup, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export function BautistainventorycategoryBox({ value, onChange, categories, loading }) {
  const [open, setOpen] = React.useState(false);
  const [internalCategories, setInternalCategories] = React.useState([]);

  // Update internal categories when prop changes
  React.useEffect(() => {
    const formatted = categories?.map(cat => ({
      id: cat._id,
      name: cat.bautistainventorycategoryname
    })) || [];
    setInternalCategories(formatted);
  }, [categories]);

  const handleSelect = (currentValue) => {
    const newValue = currentValue === value ? "" : currentValue;
    onChange({
      target: {
        name: "category",
        value: newValue
      }
    });
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          className="w-full justify-between !bg-[#2d2d44] text-white"
          role="combobox"
          aria-expanded={open}
        >
          {value || "Select Category"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0 !bg-[#2d2d44] text-white rounded-3xl">
        <Command>
          <CommandGroup>
            {loading ? (
              <CommandItem disabled>Loading categories...</CommandItem>
            ) : internalCategories.length === 0 ? (
              <CommandItem disabled>No categories found</CommandItem>
            ) : (
              internalCategories.map((category) => (
                <CommandItem
                  key={category.id}
                  value={category.name}
                  onSelect={handleSelect}
                  className="font-semibold text-1xl"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === category.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {category.name}
                </CommandItem>
              ))
            )}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}