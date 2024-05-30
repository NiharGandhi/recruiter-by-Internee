import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Header from '@/components/header';
import Link from 'next/link';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { format } from 'date-fns';



const UsersPage = async () => {

    const { userId } = auth();

    if (!userId) {
        return redirect("/")
    }

    const users = await db.user.findMany();

    const formatDate = (dateString: Date | null) => {
        if (!dateString) return 'N/A';
        return format(new Date(dateString), 'dd MMMM yyyy');
    };

    return (
        <div>
            <Header />
            <Breadcrumb className='mt-3 ml-10'>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Users</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <h1 className='font-bold text-4xl mt-2 px-10'>Users</h1>
            <div className='py-4 px-8'>
                {users.map(user => (
                    <Card key={user.id} className='mb-4'>
                        <CardHeader>
                            <CardTitle className='font-bold'>{user.name}</CardTitle>
                            <CardDescription>{user.InstitutionName}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Badge>{user.skills}</Badge>
                            <div className='flex flex-col py-2 justify-center'>
                                <div className='flex'>
                                    Education Level: {
                                        <div className='ml-1 font-semibold'>
                                            {user.EducationLevel}
                                        </div>
                                    }
                                </div>
                                <div className='flex'>
                                    Graduation Date: {
                                    <div className='ml-1 font-semibold'>
                                        {formatDate(user.GraduationDate)}
                                    </div>
                                    }
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button>Contact Me</Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 px-4">
                                    <div className="grid gap-4">
                                        <div className="space-y-2">
                                            <h4 className="font-medium leading-none">Email ID</h4>
                                            <p className="text-sm text-muted-foreground">
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                            <Link className='ml-auto' href={`/users/${user.id}`}>Explore</Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default UsersPage;