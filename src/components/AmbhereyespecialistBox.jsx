"use client"
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandGroup, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export function AmbhereyespecialistBox({ value, onChange }) {
  const [open, setOpen] = React.useState(false)
  const [optometrists, setOptometrists] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchOptometrists = async () => {
      try {
        // Fetch from both endpoints simultaneously
        const [staffResponse, ownerResponse] = await Promise.all([
          fetch('/api/staffaccounts'),
          fetch('/api/owneraccounts')
        ]);

        if (!staffResponse.ok || !ownerResponse.ok) {
          throw new Error('Failed to fetch optometrists')
        }

        const [staffData, ownerData] = await Promise.all([
          staffResponse.json(),
          ownerResponse.json()
        ]);

        // Filter and format the data
        const formattedOptometrists = [
          ...staffData
            .filter(staff => staff.staffiseyespecialist === 'Optometrist')
            .map(staff => ({
              lastname: staff.stafflastname,
              firstname: staff.stafffirstname,
              middlename: staff.staffmiddlename,
              eyespecialist: staff.staffiseyespecialist,
              type: 'Staff'
            })),
          ...ownerData
            .filter(owner => owner.owneriseyespecialist === 'Optometrist')
            .map(owner => ({
              lastname: owner.ownerlastname,
              firstname: owner.ownerfirstname,
              middlename: owner.ownermiddlename,
              eyespecialist: owner.owneriseyespecialist,
              type: 'Owner'
            }))
        ].filter(opt => opt.lastname && opt.firstname); // Filter out any entries with missing names

        setOptometrists(formattedOptometrists);
      } catch (error) {
        console.error('Error fetching optometrists:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchOptometrists()
  }, [])

  const handleSelect = (currentValue) => {
    const newValue = currentValue === value ? "" : currentValue
    onChange({
      target: {
        name: "staffiseyespecialist",
        value: newValue
      }
    })
    setOpen(false)
  }

  const formatName = (optometrist) => {
    return `(${optometrist.eyespecialist}) ${optometrist.firstname} ${optometrist.lastname}`
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          className="w-full justify-between !bg-[#2d2d44] text-white"
          role="combobox"
          aria-expanded={open}
        >
          {value || "Select Optometrist"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0 !bg-[#2d2d44] text-white rounded-3xl">
        <Command>
          <CommandGroup>
            {loading ? (
              <CommandItem disabled>
                Loading optometrists...
              </CommandItem>
            ) : optometrists.length === 0 ? (
              <CommandItem disabled>
                No optometrists found
              </CommandItem>
            ) : (
              optometrists.map((optometrist) => (
                <CommandItem
                  key={`(${optometrist.eyespecialist}) - ${optometrist.firstname}-${optometrist.lastname}`}
                  value={formatName(optometrist)}
                  onSelect={handleSelect}
                  className="font-semibold text-1xl"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === formatName(optometrist) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {formatName(optometrist)}
                </CommandItem>
              ))
            )}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}