import Header from '@/components/header';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from 'next/link';
import { InfoIcon } from 'lucide-react';
import Image from 'next/image';
import FallBack from "../../../../../../public/fallback.png";
import { ScrollArea } from '@/components/ui/scroll-area';

const PublicProjectPage = async ({
    params
}: {
    params: { projectId: string }
}) => {

    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    const project = await db.project.findUnique({
        where: {
            id: params?.projectId,
        }
    });

    const user = await db.user.findUnique({
        where: {
            userId: project?.userId
        }
    })

    if (!project) {
        return redirect("/dashboard");
    }

    const fallbackImageUrl = FallBack;

    console.log(project.imageUrl);

    return (
        <>
            <Header />
            <Breadcrumb className='mt-2 ml-10'>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/users/${user?.id}`}>{user?.name}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{project.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className='ml-2 py-4 flex-col lg:flex-wrap'>
                <div className='flex-col lg:flex lg:flex-row'>
                    <div className='w-full lg:w-1/2 md:w-1/2 space-y-6 lg:py-2'>
                        <div className='flex items-center px-4'>
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                                <InfoIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                            </div>
                            <h1 className='font-bold text-2xl lg:text-4xl ml-2'>{project.name}</h1>
                        </div>
                        <div className='mt-4 px-4'>
                            <h2 className='text-2xl font-semibold'>Description</h2>
                            <ScrollArea className='h-[370px] py-2 px-2 rounded-lg whitespace-pre-wrap'>
                                {project.description}
                            </ScrollArea>
                        </div>
                    </div>
                    <div className='w-full lg:w-1/2 md:w-1/2 space-y-6 lg:py-14 py-6'>
                        <div className='mt-4 px-4 '>
                            <h2 className='text-2xl font-semibold'>Image</h2>
                            {project.imageUrl ? (
                                <Image
                                    src={project.imageUrl}
                                    alt="Hero"
                                    className="mx-auto rounded-xl mt-2 sm:w-full lg:order-last"
                                    width={"550"}
                                    height={"310"}
                                />
                            ) : (
                                <p className='text-muted-foreground'>No Project Image uploaded</p>
                            )}
                        </div>
                        <div className='mt-4 px-4'>
                            <h2 className='text-2xl font-semibold'>Link</h2>
                            {project.link ? ( // Check if project has a link
                                <> {/* Wrap in Link if project has a link */}
                                    <div className="py-1 px-2 rounded-lg hover:text-blue-500 hover:underline w-auto">
                                        <Link href={project.link}>
                                            <p className='overflow-clip'>{project.link}</p>
                                        </Link>
                                    </div>
                                </>
                            ) : ( // Render just the div if project does not have a link
                                <>
                                    <div className='py-2 px-2 text-gray-800 bg-gray-100/30 dark:text-gray-300 rounded-lg'>
                                        <p>No Links</p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PublicProjectPage;
