
//AI CODE//AI CODE
//AI CODE
//AI CODE
//AI CODE
//AI CODE

"use client"
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandGroup, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const genderOptions = [
  { value: "Optometrist", label: "Optometrist" },
  { value: "Ophthalmologist", label: "Ophthalmologist" },
  { value: "No", label: "No" },

]

export function OwnereyespecialistYesorNoBox({ value, onChange }) {
  const [open, setOpen] = React.useState(false)

  const handleSelect = (currentValue) => {
    const newValue = currentValue === value ? "" : currentValue
    onChange({
      target: {
        name: "owneriseyespecialist",
        value: newValue
      }
    })
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          className="w-[190px] justify-between !bg-[#2d2d44] text-white"
          role="combobox"
          aria-expanded={open}
        >
          {value || ""}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 !bg-[#2d2d44] text-white rounded-3xl">
        <Command>
          <CommandGroup>
            {genderOptions.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={handleSelect}
                className="font-semibold text-1xl"
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === option.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}