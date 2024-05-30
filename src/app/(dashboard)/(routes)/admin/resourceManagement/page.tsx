"use client";

import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useRouter } from "next/navigation";

import { format } from "date-fns";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from '@/lib/utils';

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card";
import { CalendarIcon } from 'lucide-react';
import EventCard from '@/components/EventCard';
import useEvents from '@/hooks/useEvents';
import Link from 'next/link';

const formSchema = z.object({
  title: z.string().min(2).max(50),
  dateOfEvent: z.date({
    required_error: "A Date is required.",
  }),
});

interface Event {
  id: string;
  title: string;
  dateTime: string;
}

const EventManagement = () => {
  const router = useRouter();

  const { events, loading, error } = useEvents();


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      dateOfEvent: new Date(),
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/events", values);
      // Handle successful response if needed
    } catch {
      // toast.error("Something went wrong while creating")
      console.log("[ERROR] Something went wrong while creating User");
    }
  };

  return (
    <div className='py-4 px-6'>
      <Breadcrumb className='mb-4'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Resources Management</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className='text-4xl font-bold font-sans'>
        Resources Management
      </h1>
      <div className='py-2 flex flex-col space-y-4'>
        <Link href={'/admin/resourceManagement/onlineResources'}>
          <Button>Online Resources</Button>
        </Link>
        <Link href={'/admin/resourceManagement/recommendedBooks'}>
          <Button>Recommended Books</Button>
        </Link>
        <Link href={'/admin/resourceManagement/usefulTools'}>
          <Button>Useful Tools</Button>
        </Link>
      </div>
    </div>
  );
};

export default EventManagement;
