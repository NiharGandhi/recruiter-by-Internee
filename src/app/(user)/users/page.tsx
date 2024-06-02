// UsersPage.tsx

import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import React from 'react';
import Header from '@/components/header';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import SearchUsersPage from './_components/SearchUsersPage';

const UsersPage = async () => {
    const { userId } = auth();

    if (!userId) {
        return <div>Redirecting...</div>; // Handle redirecting or displaying a message
    }

    const users = await db.user.findMany();

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
            <SearchUsersPage userId={userId} users={users} />
        </div>
    );
}

export default UsersPage;
