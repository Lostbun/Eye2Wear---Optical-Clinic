"use client"
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandGroup, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"





export function BautistaeyespecialistBox({ value, onChange }) {
  const [open, setOpen] = React.useState(false)
  const [ophthalmologists, setOphthalmologists] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchOphthalmologists = async () => {
      try {
        // Fetch from both endpoints simultaneously
        const [staffResponse, ownerResponse] = await Promise.all([
          fetch('/api/staffaccounts'),
          fetch('/api/owneraccounts')
        ]);

        if (!staffResponse.ok || !ownerResponse.ok) {
          throw new Error('Failed to fetch ophthalmologists')
        }

        const [staffData, ownerData] = await Promise.all([
          staffResponse.json(),
          ownerResponse.json()
        ]);

        // Filter and format the data
        const formattedOphthalmologists = [
          ...staffData
            .filter(staff => staff.staffiseyespecialist === 'Ophthalmologist')
            .map(staff => ({
              lastname: staff.stafflastname,
              firstname: staff.stafffirstname,
              middlename: staff.staffmiddlename,
              eyespecialist: staff.staffiseyespecialist,
              type: 'Staff'
            })),
          ...ownerData
            .filter(owner => owner.owneriseyespecialist === 'Ophthalmologist')
            .map(owner => ({
              lastname: owner.ownerlastname,
              firstname: owner.ownerfirstname,
              middlename: owner.ownermiddlename,
              eyespecialist: owner.owneriseyespecialist,
              type: 'Owner'
            }))
        ].filter(oph => oph.lastname && oph.firstname); // Filter out any entries with missing names

        setOphthalmologists(formattedOphthalmologists);
      } catch (error) {
        console.error('Error fetching ophthalmologists:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchOphthalmologists()
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

  const formatName = (ophthalmologist) => {
    return `(${ophthalmologist.eyespecialist}) ${ophthalmologist.firstname} ${ophthalmologist.lastname}`
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          className="w-full justify-between !bg-[#2d2d44] text-white"
          role="combobox"
          aria-expanded={open}
        >
          {value || "Select Ophthalmologist"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0 !bg-[#2d2d44] text-white rounded-3xl">
        <Command>
          <CommandGroup>
            {loading ? (
              <CommandItem disabled>
                Loading ophthalmologists...
              </CommandItem>
            ) : ophthalmologists.length === 0 ? (
              <CommandItem disabled>
                No ophthalmologists found
              </CommandItem>
            ) : (
              ophthalmologists.map((ophthalmologist) => (
                <CommandItem
                  key={`(${ophthalmologist.eyespecialist}) - ${ophthalmologist.lastname}-${ophthalmologist.firstname}`}
                  value={formatName(ophthalmologist)}
                  onSelect={handleSelect}
                  className="font-semibold text-1xl"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === formatName(ophthalmologist) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {formatName(ophthalmologist)}
                </CommandItem>
              ))
            )}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}