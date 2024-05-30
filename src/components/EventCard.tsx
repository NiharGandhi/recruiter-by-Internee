// components/EventCard.tsx
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { CalendarIcon } from 'lucide-react';

interface Event {
    id: string;
    title: string;
    dateTime: string;
}

interface EventCardProps {
    events: Event[];
}

const EventCard: React.FC<EventCardProps> = ({ events }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Events you may be interested in</CardDescription>
            </CardHeader>
            <CardContent>
                {events.length > 0 ? (
                    <div className="grid gap-4">
                        {events.map((event) => (
                            <div key={event.id} className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                                    <CalendarIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">{event.title}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{event.dateTime}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400">No Events available.</p>
                )}
                
            </CardContent>
        </Card>
    );
};

export default EventCard;
