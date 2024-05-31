"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookIcon, CalendarIcon, GoalIcon, NetworkIcon, PlusCircle, PlusCircleIcon, PlusIcon, UserIcon, UsersIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'


const Loader = () => (
  <div className="flex justify-center items-center h-screen">
    {/* Insert your loader SVG here */}
    <svg xmlns="http://www.w3.org/2000/svg" className="animate-spin h-10 w-10 text-gray-500" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 0112 4.472v3.764l4.065 2.329-1.346 2.338-4.119-2.371zM12 20c3.866 0 7-3.134 7-7h-4c0 2.761-2.239 5-5 5s-5-2.239-5-5H0c0 4.962 4.037 9 9 9z"></path>
    </svg>
  </div>
);

const Dashboard = () => {

  const [isNavOpen, setIsNavOpen] = useState(false); // State to track if navbar is open
  const [users, setUsers] = useState([]);

  // Function to toggle navbar state
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr] overflow-hidden">
      {/* Navbar */}
      <div className={`lg:hidden h-full flex-col border-r bg-[#6c5ce7] dark:border-gray-800 dark:bg-gray-950 absolute top-0 left-0 transform lg:translate-x-0 ${isNavOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        {/* Close button */}
        <button onClick={toggleNav} className="absolute top-3 right-3 lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <nav className="grid gap-2 px-4 mt-14 text-sm font-medium">
          <Link
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-100 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            href="/users"
          >
            <NetworkIcon className="h-4 w-4" />
            Users
          </Link>
          <Link
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-100 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            href="/events"
          >
            <CalendarIcon className="h-4 w-4" />
            Events
          </Link>
          <Link
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-100 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            href="/myOrganization/createInternship"
          >
            <PlusCircleIcon className="h-4 w-4" />
            Create Internship
          </Link>
          <Link
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-100 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            href="/myInternships"
          >
            <GoalIcon className="h-4 w-4" />
            My Internships
          </Link>
          <Link
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-100 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            href="/myOrganization"
          >
            <UserIcon className="h-4 w-4" />
            My Organization
          </Link>
        </nav>
      </div>
      {/* Mobile Navbar Toggle Button */}
      <div className="lg:hidden">
        <button onClick={toggleNav} className="p-3">
          {isNavOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>
      {/* Sidebar Content */}
      <div className="h-full flex-col border-r bg-[#6c5ce7] dark:border-gray-800 dark:bg-gray-950 hidden lg:block">
        <div className="flex-1">
          <nav className="grid gap-2 px-4 py-4 text-sm font-medium">
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-100 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="/users"
            >
              <NetworkIcon className="h-4 w-4" />
              Users
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-100 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="/events"
            >
              <CalendarIcon className="h-4 w-4" />
              Events
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-100 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="/myOrganization/createInternship"
            >
              <PlusCircleIcon className="h-4 w-4" />
              Create Internship
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-100 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="/myInternships"
            >
              <GoalIcon className="h-4 w-4" />
              My Internships
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-100 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="/myOrganization"
            >
              <UserIcon className="h-4 w-4" />
              My Organization
            </Link>
          </nav>
        </div>
      </div>
      <div className="flex flex-col">
        <main className="flex-1 lg:p-6 px-4 py-4">
          <div className="grid gap-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Users</CardTitle>
                  <CardDescription>Current Users</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-4xl font-bold">
                      {/* <NumberTicker value={users.length} direction='up'></NumberTicker> */}
                    </div>
                    <UsersIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>Events youre attending</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-4xl font-bold">
                      {/* <NumberTicker value={events.length} direction='up'></NumberTicker> */}
                    </div>
                    <CalendarIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Resources</CardTitle>
                  <CardDescription>Helpful resources for you</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-4xl font-bold">
                      {/* <NumberTicker value={onlineResources.length} direction='up'></NumberTicker> */}
                    </div>
                    <BookIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              Something Will Come here
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard