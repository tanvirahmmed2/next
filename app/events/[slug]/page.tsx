import Image from "next/image";
import pin from '@/public/icons/pin.svg'
import calender from '@/public/icons/calendar.svg'
import clock from '@/public/icons/clock.svg'
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

  return (
    <div className="w-full flex flex-row items-center justify-center gap-4">
      <div className=" flex-col flex items-center justify-center gap-4 py-10 px-4">
        <h1 className="text-2xl font-semibold">{event.title}</h1>
        <Image src={event.image} alt={event.title} width={800} height={400} />
        <p>{event.description}</p>
        <p className="text-center">{event.overview}</p>
        <div className="flex flex-row items-center gap-4">
          <p className="flex flex-row items-center gap-4"><Image src={pin} alt="icon" width={15} height={15} className="text-black" />Location: {event.date} - {event.location}</p>
          <p>{event.venue}</p>

        </div>
        <div className="flex flex-row items-center justify-center gap-6">
          <p className="flex flex-row items-center gap-4"><Image src={calender} alt="icon" width={15} height={15} /> Date: {event.date}</p>
          <p className="flex flex-row items-center gap-4"> <Image src={clock} alt="icon" width={15} height={15} />Time: {event.time}</p>
        </div>

        <div className="flex flex-col items-center justify-center gap-2">
          <p>Mode: {event.mode}</p>
          <p> Audience: {event.audience}</p>
        </div>

        <div className="flex flex-col items-center justify-center gap-2">
          <p>Tags: </p>
          {event.tags.map((tag: string, index: number) => (
            <p key={index} className="px-3 p-1 ">{tag}</p>
          ))}
        </div>
      </div>

      <div className="">

        <p>Book event</p>
      </div>
    </div>
  );
}

export default Page;
