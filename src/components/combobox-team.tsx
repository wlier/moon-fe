import { Check, ChevronsUpDown, Plus } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Separator } from '@radix-ui/react-separator'

type TeamItem = {
  value: string
  label: string
  logo: string
}

const teams: TeamItem[] = [
  {
    value: 'Acme Inc',
    label: 'Acme Inc',
    logo: 'https://img0.baidu.com/it/u=2015268393,760253784&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800',
  },
  {
    value: 'Monsters Inc',
    label: 'Monsters Inc',
    logo: '',
  },
  {
    value: 'Stark Industries',
    label: 'Stark Industries',
    logo: 'https://github.com/shadcn.png',
  },
]

export function ComboboxTeam() {
  const [open, setOpen] = React.useState(false)
  const [teamDetail, setTeamDetail] = React.useState<TeamItem | undefined>(
    teams[0]
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className='w-full justify-between'>
        <div className='space-y-1 w-full'>
          <Button
            variant='secondary'
            role='combobox'
            aria-expanded={open}
            className='w-full justify-between'
          >
            <Avatar className='h-5 w-5 min-h-5 min-w-5'>
              <AvatarImage src={teamDetail?.logo ?? ''} alt='@shadcn' />
              <AvatarFallback>{teamDetail?.label.at(0)}</AvatarFallback>
            </Avatar>
            <div className='text-ellipsis overflow-hidden w-[200px]:hidden'>
              {teamDetail?.label ?? 'Select framework...'}
            </div>
            <div className='text-ellipsis overflow-hidden'>
              <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50 text-ellipsis overflow-hidden' />
            </div>
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className='w-[260px] p-0'>
        <Command>
          <CommandInput placeholder='Search framework...' />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {teams.map((team) => (
                <CommandItem
                  key={team.value}
                  value={team.value}
                  onSelect={(current) => {
                    setTeamDetail(teams.find((item) => item.value === current))
                    setOpen(false)
                  }}
                  className='w-full'
                >
                  <Button
                    variant='ghost'
                    role='combobox'
                    aria-expanded={open}
                    className='w-full justify-start'
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        teamDetail?.value === team.value
                          ? 'opacity-100'
                          : 'opacity-0'
                      )}
                    />
                    <Avatar className='h-6 w-6 mr-2'>
                      <AvatarImage src={team?.logo ?? ''} alt='@shadcn' />
                      <AvatarFallback>{team?.label.at(0)}</AvatarFallback>
                    </Avatar>
                    <div className='text-ellipsis overflow-hidden w-[200px]:hidden'>
                      {team?.label ?? 'Select framework...'}
                    </div>
                  </Button>
                </CommandItem>
              ))}
            </CommandGroup>
            <Separator className='my-1' color='opacity-100' />
            <CommandItem>
              <Button className='w-full'>
                <Plus className='mr-2 h-4 w-4' />
                Create Team
              </Button>
            </CommandItem>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
