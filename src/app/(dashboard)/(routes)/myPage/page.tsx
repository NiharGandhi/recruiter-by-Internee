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
import { Separator } from '@/components/ui/separator';



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
        <>
        {company ? (
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
                        <h1 className='font-bold text-4xl'>{company?.name}</h1>
                        <Badge>{company?.Location}</Badge>
                        <Separator />
                        <div>
                            <h2 className='text-2xl font-semibold mt-6'>About Us</h2>
                            <p className='text-muted-foreground rounded-lg whitespace-pre-wrap'>
                                {company?.CompanyDescription}
                            </p>
                        </div>
                    </div>
                    <div className='px-10 space-y-2 lg:mt-6 lg:ml-24 mt-16'>
                        <h1 className='font-bold text-3xl mt-6'>Internships at <span className='text-purple-300'>{company?.name}</span></h1>
                        <div>
                            {internships.map(internship => (
                                <Card key={internship.id} className='mb-4'>
                                    <CardHeader>
                                        <CardTitle className='font-bold'>{internship.name}</CardTitle>
                                        <CardDescription>{company?.name}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div>
                                            <div className='flex'>
                                                <p className='text-muted-foreground'>Mode: </p>
                                                <p className='ml-2 font-semibold'>{internship.InternshipType}</p>
                                            </div>
                                            <div>
                                                <p className='text-muted-foreground'>Description: </p>
                                                <p className='whitespace-pre-wrap'>{internship.InternshipDescription}</p>
                                            </div>
                                        </div>
                                    </CardContent>
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
                </div>
            ) : (
            <div>
                <div className='flex flex-col items-center text-center justify-center justify-items-start space-y-4'>
                    <h2>Please setup your Organization Details</h2>
                    <Link href={"myOrganization"}>
                        <Button variant="secondary">My Organization</Button>
                    </Link>
                </div>
            </div>
        )}
        </>
    );
}

export default MyPage;