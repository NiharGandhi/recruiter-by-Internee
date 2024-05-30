import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';

import { Form, FormControl, FormField, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from './ui/use-toast';

const projectSchema = z.object({
    name: z.string().min(2).max(100),
    description: z.string().min(10).max(500),
    link: z.string().optional(),
});

interface ProjectFormData {
    name: string;
    description: string;
    link?: string;
}

const ProjectForm = () => {
    const projectForm = useForm<z.infer<typeof projectSchema>>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            name: "",
            description: "",
            link: "",
        },
    });

    const { toast } = useToast();

    const handleFormSubmit: SubmitHandler<ProjectFormData> = async (data) => {
        try {
            await axios.post('/api/projects', data);
            toast({
                title: "Congratulations",
                description: "Project Uploaded Successfully.",
            })
        } catch (error) {
            toast({
                title: "Error :(",
                description: "Error Uploading Project." + error,
            })
        }
    };

    return (
        <Form {...projectForm}>
            <form onSubmit={projectForm.handleSubmit(handleFormSubmit)} className="space-y-4">
                <FormField
                    control={projectForm.control}
                    name="name"
                    render={({ field }) => (
                        <FormControl>
                            <FormLabel>Project Name</FormLabel>
                            <Input {...field} />
                            <FormMessage />
                        </FormControl>
                    )}
                />
                <FormField
                    control={projectForm.control}
                    name="description"
                    render={({ field }) => (
                        <FormControl>
                            <FormLabel>Project Description</FormLabel>
                            <Input {...field} />
                            <FormMessage />
                        </FormControl>
                    )}
                />
                <FormField
                    control={projectForm.control}
                    name="link"
                    render={({ field }) => (
                        <FormControl>
                            <FormLabel>Project Link (Optional)</FormLabel>
                            <Input {...field} />
                            <FormMessage />
                        </FormControl>
                    )}
                />
                <Button type="submit">Save Project</Button>
            </form>
        </Form>
    );
};

export default ProjectForm;
