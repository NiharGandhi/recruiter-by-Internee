import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import React from 'react'

import { Button } from "@/components/ui/button"
import Link from 'next/link'
import ShimmerButton from './magicui/shimmer-button'
import { auth } from '@clerk/nextjs/dist/types/server'

const Header = () => {

    const { userId } = auth();

    return (
        <div className='bg-[#6c5ce7] dark:border-gray-800 dark:bg-gray-950 flex items-center justify-between py-2 px-4'>
            <div className='flex flex-col lg:flex-row items-start lg:items-center'>
                {userId ? (
                    <Link href="/dashboard">
                        <div className='flex flex-col lg:flex-row lg:items-baseline'>
                            <h1 className='font-bold text-white text-3xl font-sans'>Internee</h1>
                            <h1 className='text-white font-sans text-2xl lg:ml-2'>Recruiter</h1>
                        </div>
                    </Link>
                ) : (
                    <Link href="/">
                        <div className='flex flex-col lg:flex-row lg:items-baseline'>
                            <h1 className='font-bold text-white text-3xl font-sans'>Internee</h1>
                            <h1 className='text-white font-sans text-2xl lg:ml-2'>Recruiter</h1>
                        </div>
                    </Link>
                )}
            </div>
            <div className='flex items-center ml-auto'>
                <SignedOut>
                    <SignInButton mode="modal">
                        <Button variant="linktree_default">Sign In</Button>
                    </SignInButton>
                </SignedOut>
                <SignedIn>
                    <Link
                        href="/dashboard"
                    >
                        <ShimmerButton className='py-1 mr-2'>Dashboard</ShimmerButton>
                    </Link>
                    <UserButton />
                </SignedIn>
            </div>
        </div>
    )
}

export default Header