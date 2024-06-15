// components/UpdateStatusButton.js
"use client";

import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useToast } from './ui/use-toast';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { applicationStatusChange } from '@/helpers/emailTemplates';

const UpdateStatusButton = ({ applicationId, userEmail, userName, internshipName } : {
    applicationId: string,
    userEmail: string,
    userName: string,
    internshipName: string
}) => {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('PENDING'); // Initial status

    const { toast } = useToast();

    useEffect(() => {
        const checkApplicationStatus = async () => {
            try {
                const response = await axios.get('/api/applicationStatus', {
                    params: {
                        applicationId: applicationId
                    },
                });

                if ((response.data === "ACCEPTED")) {
                    setStatus("ACCEPTED");
                }
                else if (response.data === "REJECTED") {
                    setStatus("REJECTED");
                }
                else {
                    setStatus("PENDING");
                }
            } catch (error) {
                console.error("Error checking application status:", error);
            }
        };

        checkApplicationStatus();
    }, [applicationId]);

    const updateStatus = async (newStatus) => {
        setLoading(true);

        try {
            await axios.post('/api/applicationStatus', {
                applicationId: applicationId,
                status: newStatus,
            });

            setStatus(newStatus); // Update the status in the component state

            await axios.post("/api/send-mail", {
                to: `${userEmail}`,
                name: `${userName}`,
                subject: `${internshipName}`,
                body: applicationStatusChange(userName, internshipName),
            })

            toast({
                title: "Status Updated",
                description: `Application status updated to ${newStatus}`,
            });
        } catch (error) {
            toast({
                title: "Error Updating Status",
                description: "Try again later",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='ml-2'>
            <DropdownMenu>
                {status === "PENDING" && (
                    <DropdownMenuTrigger className='ml-auto' disabled={loading}>
                        <Button className='bg-slate-400' variant='outline'>
                            {status} 
                            <ChevronDown className='ml-1 w-6 h-6' />
                        </Button>
                    </DropdownMenuTrigger>
                )}
                {status === "ACCEPTED" && (
                    <DropdownMenuTrigger className='ml-auto' disabled={loading}>
                        <Button className='bg-green-400' variant='outline'>
                            {status} 
                            <ChevronDown className='ml-1 w-6 h-6' />
                        </Button>
                    </DropdownMenuTrigger>
                )}
                {status === "REJECTED" && (
                    <DropdownMenuTrigger className='ml-auto'>
                        <Button className='bg-red-400' variant='outline'>
                            {status} 
                            <ChevronDown className='ml-1 w-6 h-6' />
                        </Button>
                    </DropdownMenuTrigger>
                )}
                <DropdownMenuContent>
                    <DropdownMenuLabel>Status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => updateStatus('PENDING')} className='text-slate-500'>Pending</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => updateStatus('ACCEPTED')} className='text-green-500'>Accept</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => updateStatus('REJECTED')} className='text-red-500'>Reject</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default UpdateStatusButton;
