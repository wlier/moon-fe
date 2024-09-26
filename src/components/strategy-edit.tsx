import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import * as z from 'zod'
import { MultiSelect } from './multi-select'

// Define the schema for form validation
const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  expr: z.string().min(1, 'Expression is required'),
  labels: z.record(z.string()),
  annotations: z.object({
    summary: z.string(),
    description: z.string(),
  }),
  categoriesIds: z.array(z.number()),
  groupId: z.number(),
  step: z.number(),
  datasourceIds: z.array(z.number()),
  strategyLevel: z.array(
    z.object({
      duration: z.string(),
      count: z.number(),
      levelId: z.number(),
      condition: z.number(),
      threshold: z.number(),
      sustainType: z.number(),
      alarmPageIds: z.array(z.number()),
      alarmGroupIds: z.array(z.number()),
      strategyLabels: z.array(
        z.object({
          name: z.string(),
          value: z.string(),
          alarmGroupIds: z.string(),
        })
      ),
    })
  ),
  alarmGroupIds: z.array(z.number()),
})

type FormValues = z.infer<typeof formSchema>

export default function StrategyEditForm() {
  const [formData, setFormData] = useState<FormValues | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      expr: '',
      labels: {},
      annotations: { summary: '', description: '' },
      categoriesIds: [],
      groupId: 0,
      step: 0,
      datasourceIds: [],
      strategyLevel: [
        {
          duration: '',
          count: 0,
          levelId: 0,
          condition: 0,
          threshold: 0,
          sustainType: 0,
          alarmPageIds: [],
          alarmGroupIds: [],
          strategyLabels: [],
        },
      ],
      alarmGroupIds: [],
    },
  })

  const { fields: strategyLevelFields, append: appendStrategyLevel } =
    useFieldArray({
      control: form.control,
      name: 'strategyLevel',
    })

  const onSubmit = (data: FormValues) => {
    setFormData(data)
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <Card>
          <CardHeader>
            <CardTitle>Complex Form</CardTitle>
            <CardDescription>
              Fill out the form with the required information.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4 grid gap-2 grid-cols-3'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='col-span-2'>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='expr'
              render={({ field }) => (
                <FormItem className='col-span-2'>
                  <FormLabel>Expression</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='labels.a'
              render={({ field }) => (
                <FormItem className='col-span-1'>
                  <FormLabel>Label A</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='annotations.summary'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Summary</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='annotations.description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='categoriesIds'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categories IDs</FormLabel>
                  <MultiSelect
                    {...field}
                    options={[
                      { label: 'Option 1', value: 1 },
                      { label: 'Option 2', value: 2 },
                      { label: 'Option 3', value: 3 },
                    ]}
                    value={field.value}
                    onChange={(selected: number[]) => {
                      field.value = selected
                    }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='groupId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group ID</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='number'
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='step'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Step</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='number'
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='datasourceIds'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Datasource IDs</FormLabel>
                  <FormControl>
                    <MultiSelect
                      {...field}
                      options={[
                        { label: 'Option 1', value: 1 },
                        { label: 'Option 2', value: 2 },
                        { label: 'Option 3', value: 3 },
                      ]}
                      value={field.value}
                      onChange={(selected: number[]) => {
                        field.value = selected
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter comma-separated numbers
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {strategyLevelFields.map((field, index) => (
              <Card key={field.id}>
                <CardHeader>
                  <CardTitle>Strategy Level {index + 1}</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <FormField
                    control={form.control}
                    name={`strategyLevel.${index}.duration`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`strategyLevel.${index}.count`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Count</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type='number'
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`strategyLevel.${index}.levelId`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Level ID</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type='number'
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`strategyLevel.${index}.condition`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Condition</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type='number'
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`strategyLevel.${index}.threshold`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Threshold</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type='number'
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`strategyLevel.${index}.sustainType`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sustain Type</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type='number'
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`strategyLevel.${index}.alarmPageIds`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Alarm Page IDs</FormLabel>
                        <MultiSelect
                          {...field}
                          options={[
                            { label: 'Option 1', value: 1 },
                            { label: 'Option 2', value: 2 },
                            { label: 'Option 3', value: 3 },
                          ]}
                          value={field.value}
                          onChange={(selected: number[]) => {
                            field.value = selected
                          }}
                        />

                        <FormDescription>
                          Enter comma-separated numbers
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`strategyLevel.${index}.alarmGroupIds`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Alarm Group IDs</FormLabel>
                        <FormControl>
                          <MultiSelect
                            options={[
                              { label: 'Option 1', value: 1 },
                              { label: 'Option 2', value: 2 },
                              { label: 'Option 3', value: 3 },
                            ]}
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormDescription>
                          Enter comma-separated numbers
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`strategyLevel.${index}.strategyLabels`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Strategy Labels</FormLabel>
                        <FormControl>
                          <Textarea
                            // {...field}
                            onChange={(e) => {
                              const labels = e.target.value
                                .split('\n')
                                .map((line) => {
                                  const [name, value, alarmGroupIds] =
                                    line.split(',')
                                  return { name, value, alarmGroupIds }
                                })
                              field.onChange(labels)
                            }}
                            placeholder='Enter labels as: name,value,alarmGroupIds (one per line)'
                          />
                        </FormControl>
                        <FormDescription>
                          Enter one label per line in the format:
                          name,value,alarmGroupIds
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            ))}

            <Button
              type='button'
              onClick={() =>
                appendStrategyLevel({
                  duration: '',
                  count: 0,
                  levelId: 0,
                  condition: 0,
                  threshold: 0,
                  sustainType: 0,
                  alarmPageIds: [],
                  alarmGroupIds: [],
                  strategyLabels: [],
                })
              }
            >
              Add Strategy Level
            </Button>

            <FormField
              control={form.control}
              name='alarmGroupIds'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alarm Group IDs</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={[
                        { label: 'Option 1', value: 1 },
                        { label: 'Option 2', value: 2 },
                        { label: 'Option 3', value: 3 },
                      ]}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter comma-separated numbers
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type='submit'>Submit</Button>
          </CardFooter>
        </Card>
      </form>

      {formData && (
        <Card className='mt-8'>
          <CardHeader>
            <CardTitle>Form Data</CardTitle>
          </CardHeader>
          <CardContent>
            <pre>{JSON.stringify(formData, null, 2)}</pre>
          </CardContent>
        </Card>
      )}
    </Form>
  )
}
