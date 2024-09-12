import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ClassAttributes, HTMLAttributes, SVGProps } from 'react'
import { JSX } from 'react/jsx-runtime'
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'

export function RealtimeAlert() {
  return (
    <div className='bg-background text-foreground p-6 rounded-lg shadow-md'>
      <div className='flex items-center justify-between mb-4'>
        <h1 className='text-2xl font-bold'>Prometheus Alerts</h1>
        <Button variant='outline' size='sm' className='flex items-center gap-2'>
          <SettingsIcon className='w-4 h-4' />
          <span>Settings</span>
        </Button>
      </div>
      <Tabs defaultValue='account' className='w-full'>
        <TabsList className='w-full flex justify-start gap-3'>
          <TabsTrigger value='realtime' className='flex items-center gap-2'>
            实时告警
            <Badge variant='outline' className='bg-red-500'>
              2
            </Badge>
          </TabsTrigger>
          <TabsTrigger value='my'>我的告警</TabsTrigger>
          <TabsTrigger value='light'>白班监控</TabsTrigger>
          <TabsTrigger value='dark'>夜班监控</TabsTrigger>
          <TabsTrigger value='test'>测试告警</TabsTrigger>
        </TabsList>
        <TabsContent value='realtime' className='w-full md:w-full'>
          <div className='grid gap-4'>
            <div className='flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-4'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='outline'
                    size='sm'
                    className='flex items-center gap-2'
                  >
                    <TriangleAlertIcon className='w-4 h-4' />
                    <span>Severity</span>
                    <ChevronDownIcon className='w-4 h-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='start' className='w-48'>
                  <DropdownMenuCheckboxItem>Critical</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Warning</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Info</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='outline'
                    size='sm'
                    className='flex items-center gap-2'
                  >
                    <TagIcon className='w-4 h-4' />
                    <span>Labels</span>
                    <ChevronDownIcon className='w-4 h-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='start' className='w-48'>
                  <DropdownMenuCheckboxItem>
                    service=web
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>
                    environment=production
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>
                    team=backend
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className='relative flex-1'>
                <div className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
                <Input
                  type='search'
                  placeholder='Search alerts...'
                  className='w-full rounded-lg bg-background pl-8 pr-4 py-2'
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='outline'
                    size='sm'
                    className='flex items-center gap-2'
                  >
                    <TimerIcon className='w-4 h-4' />
                    <span>Duration</span>
                    <ChevronDownIcon className='w-4 h-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='start' className='w-48'>
                  <DropdownMenuCheckboxItem>
                    Less than 1 hour
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>
                    1 hour to 1 day
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>
                    More than 1 day
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className='hidden md:block w-full'>
              <Table>
                <ScrollArea className='h-[calc(100vh - 200px)] rounded-md border w-full'>
                  <TableHeader className='bg-muted'>
                    <TableRow className='relative w-full top-0'>
                      <TableHead>Alert</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Triggered At</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Labels</TableHead>
                      <TableHead>Chart</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className='relative w-full'>
                      <TableCell>
                        <div className='text-lg font-medium'>
                          High CPU Usage
                        </div>
                        <div className='text-sm text-muted-foreground'>
                          CPU utilization on the web server has exceeded 90% for
                          more than 15 minutes.
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className='flex items-center'>
                          <TriangleAlertIcon className='w-4 h-4 mr-1' />
                          <span>Critical</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className='flex items-center'>
                          <ClockIcon className='w-4 h-4 mr-1' />
                          <span>2023-04-15 10:30:00</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className='flex items-center'>
                          <TimerIcon className='w-4 h-4 mr-1' />
                          <span>30 minutes</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className='flex flex-wrap gap-2'>
                          <Badge
                            variant='default'
                            className='px-2 py-1 rounded-full'
                          >
                            service=web
                          </Badge>
                          <Badge
                            variant='default'
                            className='px-2 py-1 rounded-full'
                          >
                            environment=production
                          </Badge>
                          <Badge
                            variant='default'
                            className='px-2 py-1 rounded-full'
                          >
                            team=backend
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <LinechartChart className='w-[100px] aspect-[4/3]' />
                      </TableCell>
                      <TableCell>
                        <div className='flex items-center gap-2'>
                          <Button variant='outline' size='sm'>
                            Details
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant='outline' size='sm'>
                                <MoveHorizontalIcon className='w-4 h-4' />
                                <span className='sr-only'>More</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='end'>
                              <DropdownMenuItem>Silence</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className='text-lg font-medium'>
                          High Memory Usage
                        </div>
                        <div className='text-sm text-muted-foreground'>
                          Memory usage on the API server has exceeded 80% for
                          more than 10 minutes.
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className='flex items-center'>
                          <TriangleAlertIcon className='w-4 h-4 mr-1' />
                          <span>Warning</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className='flex items-center'>
                          <ClockIcon className='w-4 h-4 mr-1' />
                          <span>2023-04-14 15:45:00</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className='flex items-center'>
                          <TimerIcon className='w-4 h-4 mr-1' />
                          <span>20 minutes</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className='flex flex-wrap gap-2'>
                          <Badge
                            variant='default'
                            className='px-2 py-1 rounded-full'
                          >
                            service=api
                          </Badge>
                          <Badge
                            variant='default'
                            className='px-2 py-1 rounded-full'
                          >
                            environment=staging
                          </Badge>
                          <Badge
                            variant='default'
                            className='px-2 py-1 rounded-full'
                          >
                            team=backend
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <LinechartChart className='w-[100px] aspect-[4/3]' />
                      </TableCell>
                      <TableCell>
                        <div className='flex items-center gap-2'>
                          <Button variant='outline' size='sm'>
                            Details
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant='outline' size='sm'>
                                <MoveHorizontalIcon className='w-4 h-4' />
                                <span className='sr-only'>More</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='end'>
                              <DropdownMenuItem>Silence</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className='text-lg font-medium'>
                          Disk Space Exhaustion
                        </div>
                        <div className='text-sm text-muted-foreground'>
                          The database server has run out of available disk
                          space, which could lead to service disruptions.
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className='flex items-center'>
                          <TriangleAlertIcon className='w-4 h-4 mr-1' />
                          <span>Critical</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className='flex items-center'>
                          <ClockIcon className='w-4 h-4 mr-1' />
                          <span>2023-04-16 08:15:00</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className='flex items-center'>
                          <TimerIcon className='w-4 h-4 mr-1' />
                          <span>1 hour</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className='flex flex-wrap gap-2'>
                          <Badge
                            variant='default'
                            className='px-2 py-1 rounded-full'
                          >
                            service=database
                          </Badge>
                          <Badge
                            variant='default'
                            className='px-2 py-1 rounded-full'
                          >
                            environment=production
                          </Badge>
                          <Badge
                            variant='default'
                            className='px-2 py-1 rounded-full'
                          >
                            team=infrastructure
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <LinechartChart className='w-[100px] aspect-[4/3]' />
                      </TableCell>
                      <TableCell>
                        <div className='flex items-center gap-2'>
                          <Button variant='outline' size='sm'>
                            Details
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant='outline' size='sm'>
                                <MoveHorizontalIcon className='w-4 h-4' />
                                <span className='sr-only'>More</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='end'>
                              <DropdownMenuItem>Silence</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </ScrollArea>
              </Table>
            </div>
            <div className='grid grid-cols-1 gap-4 md:hidden'>
              <Card className='p-4 bg-card text-card-foreground rounded-lg'>
                <div className='flex items-center justify-between mb-2'>
                  <div className='text-lg font-medium'>High CPU Usage</div>
                  <Badge variant='secondary' className='px-2 py-1 rounded-full'>
                    Firing
                  </Badge>
                </div>
                <div className='text-sm text-muted-foreground'>
                  <div className='flex items-center mb-1'>
                    <TriangleAlertIcon className='w-4 h-4 mr-1' />
                    <span>Critical</span>
                  </div>
                  <div className='flex items-center mb-1'>
                    <ClockIcon className='w-4 h-4 mr-1' />
                    <span>2023-04-15 10:30:00</span>
                  </div>
                  <div className='flex items-center mb-1'>
                    <TimerIcon className='w-4 h-4 mr-1' />
                    <span>30 minutes</span>
                  </div>
                </div>
                <div className='mt-4'>
                  <div className='font-medium mb-1'>Labels</div>
                  <div className='flex flex-wrap gap-2'>
                    <Badge variant='default' className='px-2 py-1 rounded-full'>
                      service=web
                    </Badge>
                    <Badge variant='default' className='px-2 py-1 rounded-full'>
                      environment=production
                    </Badge>
                    <Badge variant='default' className='px-2 py-1 rounded-full'>
                      team=backend
                    </Badge>
                  </div>
                </div>
                <div className='mt-4'>
                  <div className='font-medium mb-1'>Summary</div>
                  <p>
                    CPU utilization on the web server has exceeded 90% for more
                    than 15 minutes.
                  </p>
                </div>
                <div className='mt-4'>
                  <div className='font-medium mb-1'>Description</div>
                  <p>
                    The high CPU usage on the web server is likely due to a
                    spike in traffic or a resource-intensive process. This could
                    lead to slow response times and potential service
                    disruptions. Please investigate the issue and scale up
                    resources or optimize the application as needed.
                  </p>
                </div>
                <div className='mt-4'>
                  <div className='font-medium mb-1'>Affected Services</div>
                  <ul className='list-disc pl-4'>
                    <li>Web Application</li>
                    <li>API Gateway</li>
                  </ul>
                </div>
                <div className='mt-4'>
                  <div className='font-medium mb-1'>Troubleshooting</div>
                  <a href='#' className='text-primary hover:underline'>
                    Troubleshooting Guide
                  </a>
                </div>
                <div className='mt-4'>
                  <div className='font-medium mb-1'>Metrics</div>
                  <LinechartChart className='w-full aspect-[4/3]' />
                </div>
              </Card>
              <Card className='p-4 bg-card text-card-foreground rounded-lg'>
                <div className='flex items-center justify-between mb-2'>
                  <div className='text-lg font-medium'>High Memory Usage</div>
                  <Badge variant='outline' className='px-2 py-1 rounded-full'>
                    Resolved
                  </Badge>
                </div>
                <div className='text-sm text-muted-foreground'>
                  <div className='flex items-center mb-1'>
                    <TriangleAlertIcon className='w-4 h-4 mr-1' />
                    <span>Warning</span>
                  </div>
                  <div className='flex items-center mb-1'>
                    <ClockIcon className='w-4 h-' />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>
        <TabsContent value='my'>my alarm page</TabsContent>
      </Tabs>
    </div>
  )
}

function ChevronDownIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='m6 9 6 6 6-6' />
    </svg>
  )
}

function ClockIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <circle cx='12' cy='12' r='10' />
      <polyline points='12 6 12 12 16 14' />
    </svg>
  )
}

function LinechartChart(
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLDivElement> &
    HTMLAttributes<HTMLDivElement>
) {
  return (
    <div {...props}>
      <ChartContainer
        config={{
          desktop: {
            label: 'Desktop',
            color: 'hsl(var(--chart-1))',
          },
        }}
      >
        <LineChart
          accessibilityLayer
          data={[
            { month: 'January', desktop: 186 },
            { month: 'February', desktop: 305 },
            { month: 'March', desktop: 237 },
            { month: 'April', desktop: 73 },
            { month: 'May', desktop: 209 },
            { month: 'June', desktop: 214 },
          ]}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey='month'
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Line
            dataKey='desktop'
            type='natural'
            stroke='var(--color-desktop)'
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  )
}

function MoveHorizontalIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <polyline points='18 8 22 12 18 16' />
      <polyline points='6 8 2 12 6 16' />
      <line x1='2' x2='22' y1='12' y2='12' />
    </svg>
  )
}

function SettingsIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z' />
      <circle cx='12' cy='12' r='3' />
    </svg>
  )
}

function TagIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z' />
      <circle cx='7.5' cy='7.5' r='.5' fill='currentColor' />
    </svg>
  )
}

function TimerIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <line x1='10' x2='14' y1='2' y2='2' />
      <line x1='12' x2='15' y1='14' y2='11' />
      <circle cx='12' cy='14' r='8' />
    </svg>
  )
}

function TriangleAlertIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3' />
      <path d='M12 9v4' />
      <path d='M12 17h.01' />
    </svg>
  )
}
