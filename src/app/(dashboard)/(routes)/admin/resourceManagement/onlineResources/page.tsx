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
import useOnlineResources from '@/hooks/useOnlineResource';
import ResourceCard from '@/components/ResourceCard';

const formSchema = z.object({
    name: z.string().min(2).max(50),
    desc: z.string().min(2).max(100),
    link: z.string().min(2),
});


const OnlineResources = () => {
    const router = useRouter();

    const { onlineResources, loadingRes, errorRes } = useOnlineResources();


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            desc: "",
            link: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post("/api/onlineResources", values);
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
                        <BreadcrumbLink href="/admin/resourceManagement">Resources Management</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Online Resources</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <h1 className='text-4xl font-bold font-sans'>
                Online Resources
            </h1>
            <div className='flex flex-col lg:flex-row md:flex-row'>
                <div className='w-full lg:w-1/3 md:w-1/2 py-4'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name of Resource</FormLabel>
                                        <FormControl>
                                            <Input placeholder="LinkedIn Learning." {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            This is publicly displayed Name.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="desc"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description of Resource</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Develop new skills with online courses..." {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            This is publicly displayed Description.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="link"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description of Resource</FormLabel>
                                        <FormControl>
                                            <Input placeholder="https://learning.linkedin.com/" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            This is not publicly displayed.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Add Resource</Button>
                        </form>
                    </Form>
                </div>
                <div className='w-full py-4 lg:px-10 md:px-10'>
                    <ResourceCard resources={onlineResources} title='Online Resouces' cardDesc='Useful links and resources for interns' />
                </div>
            </div>
        </div>
    )
}

export default OnlineResources