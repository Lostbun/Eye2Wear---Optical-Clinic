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
        // Get API URL and token
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        const token = localStorage.getItem('token') || 
                     localStorage.getItem('stafftoken') || 
                     localStorage.getItem('ownertoken') || 
                     localStorage.getItem('admintoken');

        if (!token) {
          console.error('No authentication token found');
          return;
        }

        // Fetch from both endpoints simultaneously with proper headers
        const [staffResponse, ownerResponse] = await Promise.all([
          fetch(`${apiUrl}/api/staffaccounts`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }),
          fetch(`${apiUrl}/api/owneraccounts`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          })
        ]);

        if (!staffResponse.ok || !ownerResponse.ok) {
          throw new Error(`Failed to fetch optometrists: ${staffResponse.status}, ${ownerResponse.status}`)
        }

        const [staffData, ownerData] = await Promise.all([
          staffResponse.json(),
          ownerResponse.json()
        ]);

        // Filter and format the data
        const allOptometrists = [
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

        // Remove duplicates based on full name (keep first occurrence)
        const seen = new Set();
        const formattedOptometrists = allOptometrists.filter(opt => {
          const fullName = `${opt.firstname} ${opt.lastname}`;
          if (seen.has(fullName)) {
            return false;
          }
          seen.add(fullName);
          return true;
        });

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
              optometrists.map((optometrist, index) => (
                <CommandItem
                  key={`optometrist-${index}-${optometrist.firstname}-${optometrist.lastname}-${optometrist.type}`}
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