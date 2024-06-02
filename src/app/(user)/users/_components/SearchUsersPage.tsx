"use client";

import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import Link from 'next/link';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Header from '@/components/header';
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
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import AnimatedGradientText from '@/components/magicui/animated-gradient-text';
import { Input } from '@/components/ui/input';

const SearchUsersPage = ({ userId, users } : { userId: string, users: any }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSkill, setSelectedSkill] = useState('');
    const [selectedInstitution, setSelectedInstitution] = useState('');
    const [selectedEducationLevel, setSelectedEducationLevel] = useState('');
    const [skills, setSkills] = useState<string[]>([]);
    const [institutions, setInstitutions] = useState<string[]>([]);
    const [educationLevels, setEducationLevels] = useState<string[]>([]);



    // Extract all unique values for skills, institution, and education level
    useEffect(() => {
        const allSkills: Set<string> = new Set();
        const allInstitutions: Set<string> = new Set();
        const allEducationLevels: Set<string> = new Set();

        users.forEach((user: { skills: string; InstitutionName: string; EducationLevel: string; }) => {
            // Extract skills
            if (user.skills) {
                user.skills.split(',').map(skill => skill.trim()).forEach(skill => allSkills.add(skill));
            }
            // Extract institutions
            if (user.InstitutionName) {
                allInstitutions.add(user.InstitutionName);
            }
            // Extract education levels
            if (user.EducationLevel) {
                allEducationLevels.add(user.EducationLevel);
            }
        });

        setSkills(Array.from(allSkills));
        setInstitutions(Array.from(allInstitutions));
        setEducationLevels(Array.from(allEducationLevels));
    }, [users]);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const filteredUsers = currentUsers.filter((user: { name: string; skills: string; InstitutionName: string; EducationLevel: string; }) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedSkill === '' || (user.skills && user.skills.toLowerCase().includes(selectedSkill.toLowerCase()))) &&
        (selectedInstitution === '' || user.InstitutionName === selectedInstitution) &&
        (selectedEducationLevel === '' || user.EducationLevel === selectedEducationLevel)
    );

    const formatDate = (dateString: string | number | Date) => {
        if (!dateString) return 'N/A';
        return format(new Date(dateString), 'dd MMMM yyyy');
    };

    const handleSearchChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handleSkillChange = (value: React.SetStateAction<string>) => {
        setSelectedSkill(value);
        setCurrentPage(1);
    };

    const handleInstitutionChange = (value: React.SetStateAction<string>) => {
        setSelectedInstitution(value);
        setCurrentPage(1);
    };

    const handleEducationLevelChange = (value: React.SetStateAction<string>) => {
        setSelectedEducationLevel(value);
        setCurrentPage(1);
    };

    if (!userId) {
        return redirect("/");
    }

    return (
        <div>
            <div className='py-4 px-8 space-y-4 space-x-4'>
                {/* Search Bar */}
                <Input
                    type="text"
                    placeholder="🔎 Search users..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                {/* Filter Dropdown */}
                <select
                    value={selectedSkill}
                    onChange={(e) => handleSkillChange(e.target.value)}
                    className='filter-box'
                >
                    <option value="">All Skills</option>
                    {skills.map(skill => (
                        <option key={skill} value={skill}>{skill}</option>
                    ))}
                </select>
                <select
                    value={selectedInstitution}
                    onChange={(e) => handleInstitutionChange(e.target.value)}
                    className='filter-box'
                >
                    <option value="">All Institutions</option>
                    {institutions.map(institution => (
                        <option key={institution} value={institution}>{institution}</option>
                    ))}
                </select>
                <select
                    value={selectedEducationLevel}
                    onChange={(e) => handleEducationLevelChange(e.target.value)}
                    className='filter-box'
                >
                    <option value="">All Education Levels</option>
                    {educationLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                    ))}
                </select>
                {/* User Cards */}
                {filteredUsers.map((user: { id: React.Key | null | undefined; name: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; InstitutionName: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; skills: string; EducationLevel: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; GraduationDate: string | number | Date; email: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }) => (
                    <Card key={user.id} className='mb-4'>
                        <CardHeader>
                            <CardTitle className='font-bold'>{user.name}</CardTitle>
                            <CardDescription>{user.InstitutionName}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className='sm:flex-col space-x-1'>
                                {user.skills ? user.skills.split(',').map((skill, index) => (
                                    <Badge key={index}>{skill.trim()}</Badge>
                                )) : (
                                    <p className='text-sm text-muted'>No Skills Added</p>
                                )}
                            </div>
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
                            <Link className='ml-auto' href={`/users/${user.id}`}>
                                <AnimatedGradientText>Explore</AnimatedGradientText>
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default SearchUsersPage;
