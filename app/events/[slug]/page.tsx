import Image from "next/image";
import pin from '@/public/icons/pin.svg'
import calender from '@/public/icons/calendar.svg'
import clock from '@/public/icons/clock.svg'
import BookEvent from "@/components/elements/BookEvent";
import { IEvent } from "@/database";
import { getSimilarEventBySlug } from "@/lib/actions/event.actions";
import EventCard from "@/components/elements/EventCard";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;




async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const response = await fetch(`${BASE_URL}/api/events/${slug}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Event not found')
  }

  const result = await response.json();

  const event = result.event || result.data;

  const booking = 10

  const similarEvents: IEvent[] = await getSimilarEventBySlug(slug)

  return (
    <div className="w-full flex flex-col gap-4  py-10 px-4">
      <div className="w-full flex flex-col md:flex-row gap-4">
        <div className="w-full flex-col flex  gap-4">
          <h1 className="text-2xl font-semibold">{event.title}</h1>
          <Image src={event.image} alt={event.title} width={800} height={200} />
          <p>{event.description}</p>
          <p className="">{event.overview}</p>
          <div className="flex flex-row gap-4">
            <p className="flex flex-row gap-4"><Image src={pin} alt="icon" width={15} height={15} className="text-black" />Location:  {event.location}</p>
            <p>{event.venue}</p>

          </div>
          <div className="flex flex-row gap-6">
            <p className="flex flex-row gap-4"><Image src={calender} alt="icon" width={15} height={15} /> Date: {event.date}</p>
            <p className="flex flex-row gap-4"> <Image src={clock} alt="icon" width={15} height={15} />Time: {event.time}</p>
          </div>

          <div className="flex flex-col gap-2">
            <p>Mode: {event.mode}</p>
            <p> Audience: {event.audience}</p>
          </div>

          <div className="flex flex-col gap-2">
            <p>Tags: </p>
            {event.tags.map((tag: string, index: number) => (
              <p key={index} className="">{tag}</p>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <p>Agenda:</p>
            {event.agenda.map((e: string, index: number) => (
              <p key={index}>{e}</p>
            ))}
          </div>
        </div>

        <div className="w-full flex items-center flex-col">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-semibold">Book Event</h1>
            {
              booking > 0 ? (
                <p className="text-sm">Join {booking} people who have already booked their spot!</p>
              ) : (
                <p className="text-sm">Be the first to book spot</p>
              )
            }
            <BookEvent />
          </div>

        </div>
      </div>


     

        {
          similarEvents.length > 0 && <div className="w-full flex flex-col gap-4 pt-20">
            <h2>Simillar events</h2>
            {
              similarEvents.map((similarEvent: IEvent) => (
                <EventCard key={similarEvent.title} {...similarEvent} />

              ))
            }
          </div>
        }

    </div>
  );
}

export default Page;
