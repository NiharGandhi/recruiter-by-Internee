"use client"

import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useRouter } from "next/navigation";

import { format } from "date-fns";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from '@/lib/utils';

import { Button } from "@/components/ui/button";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
}
    from '@/components/ui/breadcrumb';

import { useToast } from '@/components/ui/use-toast';
import { Separator } from "@/components/ui/separator"

import { CalendarIcon, DownloadCloudIcon, FileIcon } from 'lucide-react';
import { FileUpload } from '@/components/file-upload';
import Link from 'next/link';
import ProfileProjectsDisplay from '@/components/profileProjectsDisplay';
import ProfileCertificatesDisplay from '@/components/profileCertificatesDisplay';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import FallBack from "../../../../../public/fallback.png";
import CompanyInterhsipsDisplay from '@/components/CompanyInternshipsDisplay';

const formSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    companyDescription: z.string().min(2),
    companyImageUrl: z.string(),
})

const Loader = () => (
    <div className="flex justify-center items-center h-screen">
        {/* Insert your loader SVG here */}
        <svg xmlns="http://www.w3.org/2000/svg" className="animate-spin h-10 w-10 text-gray-500" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 0112 4.472v3.764l4.065 2.329-1.346 2.338-4.119-2.371zM12 20c3.866 0 7-3.134 7-7h-4c0 2.761-2.239 5-5 5s-5-2.239-5-5H0c0 4.962 4.037 9 9 9z"></path>
        </svg>
    </div>
);

const MyProfile = () => {
    const router = useRouter();

    const { toast } = useToast();

    const [userData, setUserData] = useState<any>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [internshipData, setInternshipData] = useState<any>(null);

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    useEffect(() => {
        const fetchCompanyInternships = async () => {
            try {
                const response = await axios.get("/api/addInternships");
                setInternshipData(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchCompanyInternships();
        setLoading(false);
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get("/api/myOrganization");
                setUserData(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUserData();
        setLoading(false);
    }, []);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            companyDescription: "",
            companyImageUrl: "",
        },
    });

    useEffect(() => {
        if (userData) {
            form.reset({
                name: userData.name,
                email: userData.email,
                companyDescription: userData.CompanyDescription,
                companyImageUrl: userData.CompanyImageUrl,
            });
        }
    }, [form, userData]);

    const fallbackImageUrl = FallBack;

    // Resume URL rendering logic
    const renderCompanyImage = () => {
        if (!userData) {
            return <FileUpload endpoint="companyImage" onChange={handleResumeUpload} />
        } else if (userData) {
            if (isEditing) {
                return <FileUpload endpoint="companyImage" onChange={handleResumeUpload} />;
            } else {
                return (
                    <Image
                        src={userData.CompanyImageUrl || fallbackImageUrl}
                        alt="Hero"
                        className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                        width={"550"}
                        height={"310"}
                    />
                );
            }
        } else {
            return (
                <div className='flex items-center justify-center h-16 bg-slate-100 rounded-md text-slate-400'>
                    <FileIcon className='h-5 w-5 text-slate-400 mr-2' />
                    No Image Uploaded. Upload Now!!!
                </div>
            );
        }
    };

    // Handle resume upload
    const handleResumeUpload = (url?: string) => {
        if (url) {
            form.setValue("companyImageUrl", url);
            onSave();
        }
    };

    // Button rendering logic
    const renderButtons = () => {
        if (userData) {
            if (isEditing) {
                return (
                    <>
                        <Button type="button" onClick={toggleEdit}>Cancel</Button>
                        <Button className='ml-1' onClick={onSave}>Save</Button>
                    </>
                );
            } else {
                return <Button type="button" onClick={toggleEdit}>Edit</Button>;
            }
        } else {
            return <Button className='ml-1' onClick={() => onSubmit(form.getValues())}>Save</Button>;
        }
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post("/api/myOrganization", values);
            // router.push(`/users/${response.data.id}`);
            toast({
                title: "Congratulations",
                description: "Profile Created Successfully.",
            })
        } catch {
            toast({
                title: "Error",
                description: "Error while Creating Profile .",
            })
            console.log("[ERROR] Something went wrong while creating User");
        }
    }

    const onSave = async () => {
        try {
            const values = form.getValues(); // Retrieve form values
            const response = await axios.put("/api/myOrganization", values);
            // router.push(`/users/${response.data.id}`);
            toast({
                title: "Congratulations",
                description: "Profile Updated Successfully.",
            })
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    if (loading) return <Loader />;

    return (
        <>
            <div className='py-4 px-6'>
                <Breadcrumb className='mb-4'>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>My Profile</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <h1 className='text-4xl font-bold font-sans'>
                    Your Profile
                </h1>
                <div className='flex-col lg:flex-wrap'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='flex-col lg:flex lg:flex-row'>
                            <div className='w-full lg:w-1/2 md:w-1/2 py-4 space-y-6'>
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Internee" {...field} disabled={!isEditing && userData !== null} />
                                            </FormControl>
                                            <FormDescription>
                                                This is your public display name.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>

                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Contact Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Internee" {...field} disabled={!isEditing && userData !== null} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>

                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="companyDescription"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>About</FormLabel>
                                            <FormControl>
                                                <Textarea 
                                                    placeholder='lfnsfkbsfkbs'
                                                    {...field}
                                                    className='resize-none'
                                                    disabled={!isEditing && userData !== null} 
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>

                                    )}
                                />
                            </div>
                            <div className='w-full py-4 lg:px-10 md:px-10 space-y-6'>
                                <FormField
                                    control={form.control}
                                    name="companyImageUrl"
                                    render={({ field }) => (
                                        <FormControl>
                                            <FormItem>
                                                <FormLabel>Header Image</FormLabel>
                                                <FormControl>
                                                    {renderCompanyImage()}
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        </FormControl>
                                    )}
                                />
                                {renderButtons()}
                            </div>
                        </form>
                    </Form>
                    <Separator />
                    <div>
                        <CompanyInterhsipsDisplay internships={internshipData} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyProfile