"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import axios from 'axios';
import { CalendarIcon, LinkIcon } from 'lucide-react';
import Link from 'next/link';
import NoDataPlaceholder from "../../../../../public/myPagePlaceholder.svg";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const Loader = () => (
    <div className="flex justify-center items-center h-screen">
        {/* Insert your loader SVG here */}
        <svg xmlns="http://www.w3.org/2000/svg" className="animate-spin h-10 w-10 text-gray-500" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 0112 4.472v3.764l4.065 2.329-1.346 2.338-4.119-2.371zM12 20c3.866 0 7-3.134 7-7h-4c0 2.761-2.239 5-5 5s-5-2.239-5-5H0c0 4.962 4.037 9 9 9z"></path>
        </svg>
    </div>
);

const MyInternshipsPage = () => {

    const [loading, setLoading] = useState<boolean>(true);
    const [internshipData, setInternshipData] = useState<any>(null);


    useEffect(() => {
        const fetchCompanyInternships = async () => {
            try {
                const response = await axios.get("/api/addInternships");
                setInternshipData(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchCompanyInternships();
    }, []);

    if (loading) return <Loader />;

  return (
    <div className='p-4'>
          <Breadcrumb className='mb-4'>
              <BreadcrumbList>
                  <BreadcrumbItem>
                      <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                      <BreadcrumbPage>My Internships</BreadcrumbPage>
                  </BreadcrumbItem>
              </BreadcrumbList>
          </Breadcrumb>
          <Card>
              <CardHeader>
                  <CardTitle>Your Internships</CardTitle>
              </CardHeader>
              <CardContent>
                  {internshipData ? (internshipData !== null && (
                      <div className='grid grid-cols-1 gap-4 mt-4'>
                          {internshipData.map((project: any, index: number) => (
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
                  )) : (
                    <div className='flex flex-col items-center justify-center'>
                        <h1 className='text-2xl text-muted-foreground'>No Internships Posted. POST NOW!!!</h1>
                        <Image 
                            src={NoDataPlaceholder}
                            alt='No Internships Posted'
                            width={400}
                            height={400}
                            className='animate-pulse align-middle'
                        />
                    </div>
                  )}
              </CardContent>
          </Card>
    </div>
  )
}

export default MyInternshipsPage