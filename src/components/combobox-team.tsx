import { Check, ChevronsUpDown, Plus, X } from 'lucide-react'
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
import { TeamItem } from '@/api/model-types'
import { createTeam, myTeam } from '@/api/team'
import { createContext, useContext, useEffect, useState } from 'react'
import { refreshToken } from '@/api/authorization'
import { setToken } from '@/api/request'
import {} from '@radix-ui/react-alert-dialog'
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog'
import { useI18nConfig } from '@/locale'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { toast } from 'sonner'

let timer: NodeJS.Timeout | null = null
export function ComboboxTeam() {
  const [open, setOpen] = useState(false)
  const [teamDetail, setTeamDetail] = useState<TeamItem | undefined>()
  const [teams, setTeams] = useState<TeamItem[]>([])

  const createTeamContext = useContext(CreateTeamModalProviderContext)
  const i18n = useI18nConfig()
  const localTeamInfo = localStorage.getItem('team')

  useEffect(() => {
    try {
      const teamInfo = JSON.parse(localTeamInfo ?? '')
      setTeamDetail(teamInfo)
    } catch {
      setTeamDetail(undefined)
    }
  }, [localTeamInfo])

  const handleTeams = async () => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      myTeam().then((res) => {
        setTeams(res.list)
      })
    }, 500)
  }

  const handleRefreshToken = async () => {
    if (!teamDetail) {
      return
    }
    refreshToken({
      teamID: teamDetail?.id,
    }).then((res) => {
      setToken(res.token)
    })
  }

  useEffect(() => {
    handleRefreshToken()
  }, [teamDetail])

  useEffect(() => {
    handleTeams()
  }, [createTeamContext.open])

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
              <AvatarFallback>{teamDetail?.name?.at(0)}</AvatarFallback>
            </Avatar>
            <div className='text-ellipsis overflow-hidden w-[200px]:hidden'>
              {teamDetail?.name ?? 'Select framework...'}
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
                  key={team.id}
                  value={team.name}
                  onSelect={(current) => {
                    setTeamDetail(teams.find((item) => item.name === current))
                    localStorage.setItem('team', JSON.stringify(team))
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
                        teamDetail?.name === team.name
                          ? 'opacity-100'
                          : 'opacity-0'
                      )}
                    />
                    <Avatar className='h-6 w-6 mr-2'>
                      <AvatarImage src={team?.logo ?? ''} alt='@shadcn' />
                      <AvatarFallback>{team?.name?.at(0)}</AvatarFallback>
                    </Avatar>
                    <div className='text-ellipsis overflow-hidden w-[200px]:hidden'>
                      {team?.name ?? 'Select framework...'}
                    </div>
                  </Button>
                </CommandItem>
              ))}
            </CommandGroup>
            <Separator className='my-1' color='opacity-100' />
            <CommandItem>
              <Button
                className='w-full'
                onClick={() => createTeamContext?.setOpen?.(true)}
              >
                <Plus className='mr-2 h-4 w-4' />
                {i18n.Layout.team.create}
              </Button>
            </CommandItem>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export type CreateTeamModalProps = {
  children: React.ReactNode
}

export type CreateTeamModalProviderState = {
  open?: boolean
  setOpen?: (open: boolean) => void
}

const initialState: CreateTeamModalProviderState = {
  open: false,
  setOpen: () => null,
}

export const CreateTeamModalProviderContext =
  createContext<CreateTeamModalProviderState>(initialState)

export function CreateTeamModalProvider({ children }: CreateTeamModalProps) {
  const [open, setOpen] = useState(false)
  const {
    Layout: { team },
  } = useI18nConfig()

  const value = {
    open,
    setOpen,
  }

  const createTeamScheam = z.object({
    name: z
      .string()
      .min(1, { message: team.form.name.error.required })
      .max(20, { message: team.form.name.error.max }),
    logo: z
      .string()
      .min(1, { message: team.form.logo.error.required })
      .max(255, { message: team.form.logo.error.max }),
    remark: z.string().max(255, { message: team.form.remark.error.max }),
    status: z.number().default(1),
    adminIds: z.array(z.number()).default([]),
  })

  type CreateTeamFormValuesType = z.infer<typeof createTeamScheam>

  const form = useForm<CreateTeamFormValuesType>({
    resolver: zodResolver(createTeamScheam),
    defaultValues: {
      name: '',
      logo: '',
      remark: '',
    },
  })

  const handleCreateTean = (value: CreateTeamFormValuesType) => {
    console.log(value)
    createTeam(value).then(() => {
      toast.success(value.name + '创建成功')
      setOpen(false)
    })
  }

  const handleCancel = () => {
    form.reset()
    setOpen(false)
  }

  return (
    <CreateTeamModalProviderContext.Provider value={value}>
      <Form {...form}>
        <AlertDialog open={open}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className='flex items-center space-x-2 gap-1'>
                {team.create}
                <Button
                  variant='ghost'
                  className='ml-auto'
                  onClick={() => setOpen(false)}
                >
                  <X />
                </Button>
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription />
            <form
              onSubmit={form.handleSubmit(handleCreateTean)}
              className='space-y-4'
            >
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center space-x-2 gap-1'>
                      <div className='text-red-500'>*</div>
                      {team.form.name.label}
                      <FormMessage />
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={team.form.name.placeholder}
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='logo'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center space-x-2 gap-1'>
                      <div className='text-red-500'>*</div>
                      {team.form.logo.label}
                      <FormMessage />
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={team.form.logo.placeholder}
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='remark'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center space-x-2 gap-1'>
                      {team.form.remark.label}
                      <FormMessage />
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={team.form.remark.placeholder}
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <AlertDialogFooter>
                <AlertDialogCancel type='reset' onClick={handleCancel}>
                  {team.cancel}
                </AlertDialogCancel>
                <AlertDialogAction type='submit'>
                  {team.confirm}
                </AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialog>
      </Form>
      {children}
    </CreateTeamModalProviderContext.Provider>
  )
}

export const useCreateTeamModal = () => {
  const context = useContext(CreateTeamModalProviderContext)
  if (context === undefined) {
    throw new Error(
      'useCreateTeamModal must be used within a CreateTeamModalProvider'
    )
  }
  return context
}
