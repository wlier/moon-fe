import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Pagination,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  CalendarIcon,
  ChevronDownIcon,
  FilterIcon,
  MoveVerticalIcon,
} from 'lucide-react'
import { SetStateAction, useState } from 'react'

export function RealtimeAlert() {
  const [searchText, setSearchText] = useState('')
  const [selectedSeverity, setSelectedSeverity] = useState('')
  const [selectedTimeRange, setSelectedTimeRange] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [alertsPerPage] = useState(50)
  const alerts = [
    {
      id: 1,
      title: 'CPU Usage Spike',
      description: 'CPU usage has exceeded 90% on server X',
      severity: 'critical',
      timestamp: '2023-05-01 12:34:56',
    },
    {
      id: 2,
      title: 'Disk Space Low',
      description: 'Disk space on volume Y is below 10%',
      severity: 'warning',
      timestamp: '2023-05-02 08:15:22',
    },
    {
      id: 3,
      title: 'Network Latency Increase',
      description: 'Network latency to database server has increased',
      severity: 'critical',
      timestamp: '2023-05-03 16:45:01',
    },
    {
      id: 4,
      title: 'Memory Leak Detected',
      description:
        'Memory usage for application Z has been steadily increasing',
      severity: 'warning',
      timestamp: '2023-05-04 09:27:38',
    },
    {
      id: 5,
      title: 'Database Connection Lost',
      description: 'Unable to connect to the database server',
      severity: 'critical',
      timestamp: '2023-05-05 14:12:09',
    },
    {
      id: 6,
      title: 'Backup Failure',
      description: 'Scheduled backup for server W failed',
      severity: 'warning',
      timestamp: '2023-05-06 11:23:45',
    },
    {
      id: 7,
      title: 'SSL Certificate Expiring',
      description: 'SSL certificate for website X will expire in 30 days',
      severity: 'info',
      timestamp: '2023-05-07 17:56:22',
    },
    {
      id: 8,
      title: 'Application Crash',
      description: 'Application Y has crashed and restarted',
      severity: 'critical',
      timestamp: '2023-05-08 13:41:03',
    },
    {
      id: 9,
      title: 'Infrastructure Outage',
      description: 'Infrastructure server Z is down',
      severity: 'critical',
      timestamp: '2023-05-09 10:09:37',
    },
    {
      id: 10,
      title: 'Data Loss Detected',
      description: 'Data loss detected in database server W',
      severity: 'warning',
      timestamp: '2023-05-10 15:03:01',
    },
    {
      id: 11,
      title: 'New User Signup',
      description: 'New user signup from IP address 192.168.0.1',
      severity: 'info',
      timestamp: '2023-05-11 12:34:56',
    },
  ]
  const filteredAlerts = alerts.filter((alert) => {
    const titleMatch = alert.title
      .toLowerCase()
      .includes(searchText.toLowerCase())
    const severityMatch = selectedSeverity
      ? alert.severity === selectedSeverity
      : true
    const timeRangeMatch = selectedTimeRange
      ? new Date(alert.timestamp) >= new Date(selectedTimeRange)
      : true
    return titleMatch && severityMatch && timeRangeMatch
  })
  const totalAlerts = filteredAlerts.length
  const indexOfLastAlert = currentPage * alertsPerPage
  const indexOfFirstAlert = indexOfLastAlert - alertsPerPage
  const currentAlerts = filteredAlerts.slice(
    indexOfFirstAlert,
    indexOfLastAlert
  )
  const handleSearch = (e: { target: { value: SetStateAction<string> } }) => {
    setSearchText(e.target.value)
    setCurrentPage(1)
  }
  const handleSeverityChange = (severity: SetStateAction<string>) => {
    setSelectedSeverity(severity)
    setCurrentPage(1)
  }
  const handleTimeRangeChange = (timeRange: SetStateAction<string>) => {
    setSelectedTimeRange(timeRange)
    setCurrentPage(1)
  }
  const handlePageChange = (page: SetStateAction<number>) => {
    setCurrentPage(page)
  }
  const handleAlertAction = (alertId: number, action: string) => {
    console.log(`Performing ${action} on alert ${alertId}`)
  }
  return (
    <div className='flex flex-col h-full'>
      <main className='flex-1 overflow-auto p-4 md:p-6'>
        <div className='grid gap-4'>
          <div className='flex flex-col gap-4 md:flex-row md:items-center'>
            <div className='flex items-center gap-2 w-full md:w-auto'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='outline' className='gap-1 w-full md:w-auto'>
                    <FilterIcon className='h-4 w-4' />
                    <span>Severity</span>
                    <ChevronDownIcon className='h-4 w-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='w-48'>
                  <DropdownMenuLabel>Filter by Severity</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={selectedSeverity === ''}
                    onCheckedChange={() => handleSeverityChange('')}
                  >
                    All
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={selectedSeverity === 'critical'}
                    onCheckedChange={() => handleSeverityChange('critical')}
                  >
                    Critical
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={selectedSeverity === 'warning'}
                    onCheckedChange={() => handleSeverityChange('warning')}
                  >
                    Warning
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={selectedSeverity === 'info'}
                    onCheckedChange={() => handleSeverityChange('info')}
                  >
                    Info
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='outline' className='gap-1 w-full md:w-auto'>
                    <CalendarIcon className='h-4 w-4' />
                    <span>Time Range</span>
                    <ChevronDownIcon className='h-4 w-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='w-48'>
                  <DropdownMenuLabel>Filter by Time Range</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={selectedTimeRange === ''}
                    onCheckedChange={() => handleTimeRangeChange('')}
                  >
                    All Time
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={selectedTimeRange === '2023-05-01'}
                    onCheckedChange={() => handleTimeRangeChange('2023-05-01')}
                  >
                    Last 24 Hours
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={selectedTimeRange === '2023-04-01'}
                    onCheckedChange={() => handleTimeRangeChange('2023-04-01')}
                  >
                    Last 7 Days
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={selectedTimeRange === '2023-01-01'}
                    onCheckedChange={() => handleTimeRangeChange('2023-01-01')}
                  >
                    Last 30 Days
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className='flex flex-1 md:flex-row items-start md:items-center gap-4'>
              <Input
                type='text'
                placeholder='Search alerts...'
                value={searchText}
                onChange={handleSearch}
                className='flex-1 focus:border-none'
              />
            </div>
          </div>
          <div className='overflow-auto'>
            <div className='relative w-full overflow-auto md:hidden'>
              <div className='grid gap-4'>
                {currentAlerts.map((alert) => (
                  <Card key={alert.id} className='hover:border-[violet]'>
                    <CardHeader>
                      <div className='flex items-center justify-between'>
                        <Badge
                          variant={
                            alert.severity === 'critical'
                              ? 'destructive'
                              : alert.severity === 'warning'
                              ? 'warning'
                              : 'info'
                          }
                        >
                          {alert.severity}
                        </Badge>
                        <time dateTime={alert.timestamp}>
                          {alert.timestamp}
                        </time>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className='font-medium'>{alert.title}</div>
                      <div className='text-muted-foreground'>
                        {alert.description}
                      </div>
                    </CardContent>
                    <CardFooter className='flex items-center justify-end'>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant='outline'
                            size='icon'
                            className='h-8 w-8'
                          >
                            <MoveVerticalIcon className='h-4 w-4' />
                            <span className='sr-only'>More</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuItem
                            onClick={() => handleAlertAction(alert.id, 'view')}
                          >
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleAlertAction(alert.id, 'suppress')
                            }
                          >
                            Suppress Alert
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleAlertAction(alert.id, 'delete')
                            }
                          >
                            Delete Alert
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
            <div className='relative w-full overflow-auto hidden md:block border'>
              <Table>
                <TableHeader>
                  <TableRow className='bg-slate-600 hover:bg-slate-600'>
                    <TableHead className='text-left text-white'>
                      Severity
                    </TableHead>
                    <TableHead className='text-left text-white'>Time</TableHead>
                    <TableHead className='text-left text-white'>
                      Alert
                    </TableHead>
                    <TableHead className='text-right text-white'>
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentAlerts.map((alert) => (
                    <TableRow key={alert.id}>
                      <TableCell>
                        <Badge
                          variant={
                            alert.severity === 'critical'
                              ? 'destructive'
                              : alert.severity === 'warning'
                              ? 'warning'
                              : 'info'
                          }
                        >
                          {alert.severity}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <time dateTime={alert.timestamp}>
                          {alert.timestamp}
                        </time>
                      </TableCell>
                      <TableCell>
                        <div className='font-medium'>{alert.title}</div>
                        <div className='text-muted-foreground'>
                          {alert.description}
                        </div>
                      </TableCell>
                      <TableCell className='text-right'>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant='outline'
                              size='icon'
                              className='h-8 w-8'
                            >
                              <MoveVerticalIcon className='h-4 w-4' />
                              <span className='sr-only'>More</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align='end'>
                            <DropdownMenuItem
                              onClick={() =>
                                handleAlertAction(alert.id, 'view')
                              }
                            >
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleAlertAction(alert.id, 'suppress')
                              }
                            >
                              Suppress Alert
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleAlertAction(alert.id, 'delete')
                              }
                            >
                              Delete Alert
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          <div className='flex '>
            <div className='flex w-full items-center gap-2'>
              Showing {indexOfFirstAlert + 1} to {indexOfLastAlert} of{' '}
              {totalAlerts} alerts
            </div>
            <Pagination className='justify-end items-start'>
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </PaginationPrevious>
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={indexOfLastAlert >= totalAlerts}
              >
                Next
              </PaginationNext>
            </Pagination>
          </div>
        </div>
      </main>
    </div>
  )
}
