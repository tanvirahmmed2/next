interface Events{
    title:string,
    image: string,
    slug: string,
    location: string,
    time: string,
    date: string,
}


export const events: Events[]=[
    {
        title: 'Event 1',
        image: '/images/event1.png',
        slug: 'event-1',
        location: 'location-1',
        time: 'Time-1',
        date: 'Date-1'
    },
    {
        title: 'Event 2',
        image: '/images/event2.png',
        slug: 'event-2',
        location: 'location-2',
        time: 'Time-2',
        date: 'Date-2'
    },
]