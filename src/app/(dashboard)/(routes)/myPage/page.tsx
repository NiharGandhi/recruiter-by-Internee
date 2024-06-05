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
import Image from 'next/image';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft } from 'lucide-react';
import FallBack from "../../../../../public/fallback.png";



const MyPage = async () => {

    const { userId } = auth();

    if (!userId) {
        return redirect("/")
    }

    const company = await db.company.findFirst({
        where: {
            userId: userId
        },
    });

    const internships = await db.createInternship.findMany({
        where: {
            userId: userId
        }
    });

    return (
        <div>
            <div style={{ position: 'relative' }}>
                <Image
                    src={company.CompanyImageUrl || FallBack}
                    alt='Banner'
                    width={1584}
                    height={396}
                    className='h-[191px]'
                />
                <div style={{ position: 'absolute', top: 5, left: 10 }} className='bg-slate-200 rounded-lg'>
                    <Link href={"/dashboard"}>
                        <ArrowLeft className='text-black' />
                    </Link>
                </div>
                <div style={{ position: 'absolute', top: 150, left: 20 }}>
                    <Image
                        src={company.CompanyLogoUrl || FallBack}
                        alt='Logo'
                        width={100}
                        height={100}
                        className='h-[100px]'
                    />
                </div>
            </div>
            <div className='px-10 space-y-2 lg:mt-4 lg:ml-24 mt-16'>
                <h1 className='font-bold text-4xl'>{company.name}</h1>
                <Badge>{company.Location}</Badge>
                <div className='mt-4'>
                    <h2 className='text-2xl font-semibold'>Description</h2>
                    <ScrollArea className='py-2 rounded-lg whitespace-pre-wrap'>
                        {company.CompanyDescription}
                    </ScrollArea>
                </div>
            </div>
            <h1 className='font-bold text-4xl mt-2 px-10'>Internships</h1>
            <div className='py-4 px-8'>
                {internships.map(internship => (
                    <Card key={internship.id} className='mb-4'>
                        <CardHeader>
                            <CardTitle className='font-bold'>{internship.name}</CardTitle>
                            <CardDescription>{internship.InternshipDescription}</CardDescription>
                        </CardHeader>
                        <CardFooter>
                            <Link className='ml-auto' href={`/myInternships/${internship.id}`}>
                                <Button>
                                    Explore
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default MyPage;