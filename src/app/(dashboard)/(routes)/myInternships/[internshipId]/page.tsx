import UpdateStatusButton from '@/components/UpdateStatusButton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { db } from '@/lib/db';
import axios from 'axios';
import { format } from 'date-fns';
import Link from 'next/link';
import React from 'react';

const ApplicationPage = async ({ params }) => {
    const { internshipId } = params;

    const applications = await db.application.findMany({
        where: {
            internshipId: internshipId,
        },
        include: {
            user: true, // Include user data
        },
    });

    const internshipData = await db.createInternship.findUnique({
        where: {
            id: internshipId,
        },
    });

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return format(new Date(dateString), 'dd MMMM yyyy');
    };

    return (
        <div className='px-4'>
            <Breadcrumb className='mt-2 py-2'>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/myInternships">My Internships</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{internshipData.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <h1 className='font-bold text-4xl mb-2'>Applications for Internship {internshipData.name}</h1>
            {applications.map(app => (
                <Card key={app.id} className='mb-4'>
                    <CardHeader>
                        <CardTitle className='font-bold'>{app.user.name}</CardTitle>
                        <CardDescription>{app.user.InstitutionName}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className='sm:flex-col space-x-1'>
                            {app.user.skills ? app.user.skills.split(",").map((skill, index) => (
                                <Badge key={index}>{skill.trim()}</Badge>
                            )) : (
                                <p className='text-sm text-muted'>No Skills Added</p>
                            )}
                        </div>
                        <div className='flex flex-col py-2 justify-center'>
                            <div className='flex'>
                                Education Level:
                                <div className='ml-1 font-semibold'>
                                    {app.user.EducationLevel}
                                </div>
                            </div>
                            <div className='flex'>
                                Graduation Date:
                                <div className='ml-1 font-semibold'>
                                    {formatDate(app.user.GraduationDate)}
                                </div>
                            </div>
                            <div className='flex'>
                                Email:
                                <div className='ml-1 font-semibold'>
                                    {app.user.email}
                                </div>
                            </div>
                            {app.user.resume ? (
                                <div className='flex'>
                                    Resume:
                                    <div className='ml-1 font-semibold'>
                                        <Link href={app.user.resume}>
                                            <Badge className='bg-emerald-300 text-black hover:text-white'>
                                                {app.user.name}&apos;s Resume
                                            </Badge>
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                    <div className='flex'>
                                        Resume:
                                        <div className='ml-1 font-semibold'>
                                            <Badge className='bg-emerald-300 text-black hover:text-white'>
                                                No Resume
                                            </Badge>
                                        </div>
                                    </div>
                            )}
                            <div className='flex'>
                                User Profile:
                                <div className='ml-1'>
                                    <Link href={`/users/${app.user.id}`}>
                                        <Badge>Visit Profile</Badge>
                                    </Link>
                                </div>
                            </div>
                        </div>                        
                    </CardContent>
                    <CardFooter>
                        Status:
                        <UpdateStatusButton applicationId={app.id} />
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
};

export default ApplicationPage;
