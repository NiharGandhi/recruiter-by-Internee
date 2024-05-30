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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

import { CalendarIcon, DownloadCloudIcon, EllipsisVertical, FileIcon, LinkIcon } from 'lucide-react';
import { FileUpload } from '@/components/file-upload';
import Link from 'next/link';
import ProfileProjectsDisplay from '@/components/profileProjectsDisplay';
import ProfileCertificatesDisplay from '@/components/profileCertificatesDisplay';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const formSchema = z.object({
    name: z.string().min(2).max(50),
    internshipDescription: z.string().min(2),
    educationLevel: z.enum(["High School Students", "Bachelor Students", "Masters Students", "Any"], {
        required_error: "You need to select a Education Level.",
    }),
    internshipRequirement: z.string().min(2),
    paid: z.boolean().default(false),
    amountPaid: z.string().optional(),
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

const InternshipEditPage = ({
    params
} : { params: { internshipId: string } }) => {

    const router = useRouter();

    const { toast } = useToast();

    const [internshipData, setInternshipData] = useState<any>(null);
    const [isPaid, setIsPaid] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true); // State to track loading

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const urlId = params.internshipId

    useEffect(() => {
        const fetchCompanyInternships = async () => {
            try {
                const response = await axios.get(`/api/editInternships/${urlId}`);
                setInternshipData(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchCompanyInternships();
        setLoading(false);
    }, [urlId]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            educationLevel: "Any",
            internshipDescription: "",// or another default
            internshipRequirement: "",
            paid: false,
            amountPaid: "0",
        },
    });

    console.log("INRERNSHIP DATA: ", internshipData)

    useEffect(() => {
        if (internshipData) {
            form.reset({
                name: internshipData.name,
                educationLevel: internshipData.EducationLevel,
                internshipDescription: internshipData.InternshipDescription,
                internshipRequirement: internshipData.InternshipRequirement,
                paid: internshipData.Paid,
                amountPaid: internshipData.AmountPaid,
            })
        }
    }, [form, internshipData]);

    // Button rendering logic
    const renderButtons = () => {
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
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post("/api/addInternships", values);
            // router.push(`/users/${response.data.id}`);
            toast({
                title: "Congratulations",
                description: "Profile Created Successfully.",
            })
            form.reset();
        } catch {
            toast({
                title: "Error",
                description: "Error while Creating Profile .",
            })
            console.log("[ERROR] Something went wrong while creating User");
        }
    };

    const onSave = async () => {
        try {
            const values = form.getValues(); // Retrieve form values
            const response = await axios.put(`/api/editInternships/${internshipData.id}`, values);
            // router.push(`/users/${response.data.id}`);
            toast({
                title: "Congratulations",
                description: "Profile Updated Successfully.",
            })
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    const handleDelete = async (index: any) => {
        try {
            const internshipId = internshipData[index].id; // Assuming the project ID is stored in userData

            const response = await axios.delete(`/api/addInternships/${internshipId}`);

            toast({
                title: "Congratulations",
                description: "Profile Deleted Successfully.",
            })

            window.location.reload();

        } catch (error) {
            console.error("Error deleting project:", error);
            toast({
                title: "Error",
                description: "An error occurred while deleting the project.",
            });
        }
    };

    const handleEdit = async (index: any) => {
        try {
            const internshipId = internshipData[index].id; // Assuming the project ID is stored in userData

            router.push(`/myOrganization/createInternship/${internshipId}`)

        } catch (error) {
            console.error("Error deleting project:", error);
            toast({
                title: "Error",
                description: "An error occurred while deleting the project.",
            });
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
                            <BreadcrumbLink href="/myOrganization">My Organization</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                      <BreadcrumbItem>
                          <BreadcrumbLink href="/myOrganization/createInternship">All Internships</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Create Internship</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <h1 className='text-4xl font-bold font-sans'>
                    Create Internship
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
                                            <FormLabel>Internship Title</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    disabled={!isEditing}
                                                    placeholder="Internee" 
                                                    {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>

                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="educationLevel"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Education Level</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    disabled={!isEditing}
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    className="flex flex-col space-y-1"
                                                >
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="Any" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            Any
                                                        </FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="High School Student" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            High School
                                                        </FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="Bachelor Student" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            Bachelors
                                                        </FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="Masters Student" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">Masters</FormLabel>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="internshipDescription"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Internship Description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    disabled={!isEditing}
                                                    placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing...."
                                                    className="resize-none"
                                                    {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Brief description of the Internship
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>

                                    )}
                                />
                            </div>
                            <div className='w-full py-4 lg:px-10 md:px-10 space-y-6'>
                                <FormField
                                    control={form.control}
                                    name="internshipRequirement"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Internship Requirements</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    disabled={!isEditing}
                                                    placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing...."
                                                    className="resize-none"
                                                    {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Brief description of the Internship
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>

                                    )}
                                />
                                <div>
                                    <h3 className="mb-4 text-lg font-medium">Paid Internship?</h3>
                                    <div className="space-y-4">
                                        <FormField
                                            control={form.control}
                                            name="paid"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                                    <div className="space-y-0.5">
                                                        <FormLabel className="text-base">
                                                            Is the Internship Paid?
                                                        </FormLabel>
                                                    </div>
                                                    <FormControl>
                                                        <Switch
                                                            disabled={!isEditing}
                                                            checked={field.value}
                                                            onCheckedChange={(value) => {
                                                                field.onChange(value);
                                                                setIsPaid(value); // Update isPaid state
                                                            }}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        {isPaid && (
                                            <FormField
                                                control={form.control}
                                                name="amountPaid"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Amount Paid</FormLabel>
                                                        <FormControl>
                                                            <Input 
                                                                type="number" 
                                                                placeholder="Amount" 
                                                                {...field} 
                                                                disabled={!isEditing} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        )}
                                    </div>
                                </div>
                                {renderButtons()}
                            </div>
                        </form>
                    </Form>
                    <Separator />
                </div>
            </div>
        </>
  )
}

export default InternshipEditPage