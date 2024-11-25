import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from '@/components/ui/resizable';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { zodResolver } from '@hookform/resolvers/zod';
import { SendStationHttpRequest } from '@wailsjs/go/main/App';
import { Folder, Loader2, Plus, Send } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const stationHttpRequestSchema = z.object({
  name: z.string(),
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE']),
  url: z.string(),
  headers: z.record(z.string(), z.string()),
  params: z.record(z.string(), z.string()).optional(),
  body: z.string().optional(),
});

type FormValues = z.infer<typeof stationHttpRequestSchema>;
type ApiClientViewProps = {
  onSubmit: (data: FormValues) => Promise<void>;
};

export default function ApiClientView({ onSubmit }: ApiClientViewProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(stationHttpRequestSchema),
    defaultValues: {
      name: '',
      method: 'GET',
      url: '',
      headers: {},
      params: {},
      body: '',
    },
  });

  const [result, setResult] = useState<string | null>(null);
  const handleSubmit = async (data: FormValues) => {
    console.log(data);
    // await onSubmit(data);
    try {
      const response = await SendStationHttpRequest(data);
      const result = `Status Code: ${response.statusCode}
Headers: ${JSON.stringify(response.headers)}
Body: ${JSON.stringify(JSON.parse(response.body), null, 2)}`;
      setResult(result);
    } catch (error) {
      setResult((error as Error).message);
    }
  };

  return (
    <div className='h-screen w-full bg-gray-50'>
      <ResizablePanelGroup direction='horizontal'>
        {/* Collections Sidebar */}
        <ResizablePanel defaultSize={20} minSize={15}>
          <div className='h-full border-r'>
            <div className='p-4 border-b'>
              <Button variant='outline' className='w-full'>
                <Plus className='mr-2 h-4 w-4' />
                New Collection
              </Button>
            </div>
            <ScrollArea className='h-[calc(100vh-65px)]'>
              <div className='p-2'>
                {/* Sample Collection */}
                <div className='flex items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer'>
                  <Folder className='h-4 w-4 mr-2' />
                  <span>My Collection</span>
                </div>
              </div>
            </ScrollArea>
          </div>
        </ResizablePanel>

        <ResizableHandle />

        {/* Main Content */}
        <ResizablePanel defaultSize={80}>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit, (error) => {
                console.error(error);
              })}
              className='p-4 space-y-4'
            >
              {/* Name bar */}
              <div className='flex space-x-2'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter request name' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Request URL Bar */}
              <div className='flex space-x-2'>
                <FormField
                  control={form.control}
                  name='method'
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className='w-28'>
                            <SelectValue>{field.value}</SelectValue>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='GET'>GET</SelectItem>
                          <SelectItem value='POST'>POST</SelectItem>
                          <SelectItem value='PUT'>PUT</SelectItem>
                          <SelectItem value='DELETE'>DELETE</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='url'
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormControl>
                        <Input placeholder='Enter request URL' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type='submit' disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? (
                    <Loader2 className='h-4 w-4 mr-2 animate-spin' />
                  ) : (
                    <Send className='h-4 w-4 mr-2' />
                  )}
                  Send
                </Button>
              </div>

              {/* Request Configuration */}
              <Tabs defaultValue='params' className='w-full'>
                <TabsList>
                  <TabsTrigger value='params'>Params</TabsTrigger>
                  <TabsTrigger value='headers'>Headers</TabsTrigger>
                  <TabsTrigger value='body'>Body</TabsTrigger>
                </TabsList>
                <TabsContent value='params' className='border rounded-md p-4'>
                  <div className='grid grid-cols-12 gap-2'>
                    <Input placeholder='Key' className='col-span-5' />
                    <Input placeholder='Value' className='col-span-5' />
                    <Button variant='outline' className='col-span-2'>
                      Add
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value='headers' className='border rounded-md p-4'>
                  <div className='grid grid-cols-12 gap-2'>
                    <Input placeholder='Header' className='col-span-5' />
                    <Input placeholder='Value' className='col-span-5' />
                    <Button variant='outline' className='col-span-2'>
                      Add
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value='body' className='border rounded-md p-4'>
                  <FormField
                    control={form.control}
                    name='body'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <textarea
                            className='w-full h-32 p-2 border rounded-md'
                            placeholder='Request body (JSON, XML, etc.)'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
              </Tabs>

              {/* Response Section */}
              <div className='border rounded-md p-4 min-h-[200px]'>
                <div className='text-sm text-gray-500 mb-2'>Response</div>
                <ScrollArea className='h-[200px]'>
                  <pre className='text-sm'>{result}</pre>
                </ScrollArea>
              </div>
            </form>
          </Form>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
