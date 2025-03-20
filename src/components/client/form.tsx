'use client';

import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form as UiForm,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import contentTypes from '@/data/content-types';
import credentials, { type Credential } from '@/data/credentials';
import methods from '@/data/methods';
import apiRequest, { type ApiRequestResponse } from '@/utils/api-request';
import { zodResolver } from '@hookform/resolvers/zod';
import { deleteCookie, setCookie } from 'cookies-next/client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  value: z.string(),
  method: z.string(),
  credentials: z.string(),
  cookie: z.string().optional(),
});

const Form = () => {
  const [response, setResponse] = useState<ApiRequestResponse | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: '',
      method: methods[0],
      credentials: credentials[0],
      cookie: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values.cookie === '') {
      deleteCookie('session');
    } else {
      setCookie('session', values.cookie);
    }

    const response = await apiRequest(process.env.NEXT_PUBLIC_API_URL || '', {
      method: values.method,
      headers: {
        'Content-Type': contentTypes[0],
      },
      credentials:
        (values.credentials as Credential) !== 'none'
          ? (values.credentials as RequestCredentials)
          : undefined,
      body: JSON.stringify(values),
    });

    setResponse(response);
  };

  return (
    <>
      <UiForm {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='value'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Value</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  Enter a value to send to the API.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='method'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Method</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {methods.map(method => (
                      <SelectItem key={method} value={method}>
                        {method}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='credentials'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Credentials</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {credentials.map(credential => (
                      <SelectItem key={credential} value={credential}>
                        {credential}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select the credentials to include in the request.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='cookie'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cookie Value</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  Enter a cookie to send to the API.
                  <br />
                  Cookie name is <span className='font-black'>session</span>.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit'>Submit</Button>
        </form>
      </UiForm>

      <Separator className='my-8' />

      <h2 className='text-2xl'>Result</h2>

      <Table className='mt-2'>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px] font-extrabold'>Label</TableHead>
            <TableHead className='font-extrabold'>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className='font-bold'>URL</TableCell>
            <TableCell>{response?.request.url}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className='font-bold'>Options</TableCell>
            <TableCell>
              {response?.request.options &&
                Object.entries(response.request.options).map(
                  ([key, value], index) => {
                    if (key === 'headers' && typeof value === 'object') {
                      return (
                        <div key={key}>
                          {index !== 0 && <Separator />}
                          <Table key={key}>
                            <TableHeader>
                              <TableRow>
                                <TableHead className='font-bold pl-0'>
                                  {key}
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {Object.entries(value).map(
                                ([headerKey, headerValue]) => (
                                  <TableRow key={headerKey}>
                                    <TableCell className='w-[100px] pt-0 font-bold'>
                                      {headerKey}
                                    </TableCell>
                                    <TableCell className='pt-0'>
                                      {String(headerValue)}
                                    </TableCell>
                                  </TableRow>
                                ),
                              )}
                            </TableBody>
                          </Table>
                        </div>
                      );
                    }
                    return (
                      <div key={key} className='py-3'>
                        {index !== 0 && <Separator className='mb-5' />}
                        <span className='font-bold'>{key}</span>
                        <span>:</span>
                        <span className='ml-2'>{value}</span>
                      </div>
                    );
                  },
                )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className='font-bold'>Response</TableCell>
            <TableCell>{JSON.stringify(response?.response)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default Form;
