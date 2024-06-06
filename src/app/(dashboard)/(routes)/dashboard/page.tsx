"use client";

import NumberTicker from '@/components/magicui/number-ticker';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import axios from 'axios';
import { CalendarIcon, GoalIcon, HomeIcon, LinkIcon, Moon, NetworkIcon, PlusCircleIcon, Sun, UserIcon, UsersIcon } from 'lucide-react'
import { useTheme } from 'next-themes';
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
  const { setTheme } = useTheme();

  const [loading, setLoading] = useState(true);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [internships, setInternships] = useState([]);
  const [organizationData, setOrganizationData] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userDataResponse, internshipDataResponse] = await Promise.all([
          axios.get("/api/allUsers"),
          axios.get("/api/addInternships"),
        ]);
        setUsers(userDataResponse.data);
        setInternships(internshipDataResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  console.log(internships)
  console.log(internships.length)

  if (loading) return <div><Loader /></div>;

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
          <Link
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-100 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            href="/myPage"
          >
            <HomeIcon className="h-4 w-4" />
            My Page
          </Link>
          <Label className='mt-4'>Theme:</Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className='w-full'>
              <Button variant="outline" size="icon" className="mt-auto">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className='w-full'>
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-100 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="/myPage"
            >
              <HomeIcon className="h-4 w-4" />
              My Page
            </Link>
            <Label className='mt-4'>Theme:</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className='w-full'>
                <Button variant="outline" size="icon" className="mt-auto">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className='w-full'>
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
      <div className="flex flex-col">
        <main className="flex-1 lg:p-6 px-4 py-4">
          <div className="grid gap-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Your Internships</CardTitle>
                  <CardDescription>No. of Internships posted by you</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-4xl font-bold">
                      <NumberTicker value={internships.length > 0 ? internships.length : 0} direction='up'></NumberTicker>
                    </div>
                    <CalendarIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Users</CardTitle>
                  <CardDescription>Current Users</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-4xl font-bold">
                      <NumberTicker value={users.length} direction='up'></NumberTicker>
                    </div>
                    <UsersIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Your Internships</CardTitle>
                </CardHeader>
                <ScrollArea className='h-[300px]'>
                  <CardContent>
                    {internships.length > 0 ? (
                      <div className='grid grid-cols-1 gap-4 mt-4'>
                        {internships.map((project: any, index: number) => (
                          <div key={index} className="flex items-center gap-4">
                            {project.link ? ( // Check if project has a link
                              <> {/* Wrap in Link if project has a link */}
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                                  <Link href={project.link}>
                                    <LinkIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                                  </Link>
                                </div>
                                <div className='w-32 lg:w-96'>
                                  <h3 className="text-lg font-semibold">{project.name}</h3>
                                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">{project.description}</p>
                                </div>
                              </>
                            ) : ( // Render just the div if project does not have a link
                              <>
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                                  <CalendarIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                                </div>
                                <div className='w-32 lg:w-96'>
                                  <h3 className="text-lg font-semibold">{project.name}</h3>
                                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">{project.description}</p>
                                </div>
                              </>
                            )}
                            <div className='ml-auto space-x-1'>
                              <Link href={`/myInternships/${project.id}`}>
                                <Button>
                                  Check Applications
                                </Button>
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div>
                        No Internships Posted by You
                      </div>
                    )}
                  </CardContent>
                </ScrollArea>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Users</CardTitle>
                </CardHeader>
                <ScrollArea className='h-[300px]'>
                  <CardContent>
                    {users !== null && (
                      <div className='grid grid-cols-1 gap-4 mt-4'>
                        {users.map((user: any, index: number) => (
                          <div key={index} className="flex items-center gap-4">
                              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                                <UserIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                              </div>
                              <Link href={`/users/${user.id}`}>
                                <div className='w-32 lg:w-96'>
                                  <h3 className="text-lg font-semibold">{user.name}</h3>
                                </div>
                              </Link>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </ScrollArea>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard