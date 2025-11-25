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
    return <div>Event not found or API error</div>;
  }

  const result = await response.json();

  const event = result.event || result.data;

  return (
    <div className="w-full flex-col flex items-center justify-center gap-4 py-10 px-4">
      <Image src={event.image} alt={event.title} width={800} height={400}/>
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      <p className="flex flex-row items-center gap-4"><Image src={pin} alt="icon" width={15} height={15} className="text-black"/>Location: {event.date} - {event.location}</p>
      <div className="flex flex-row items-center justify-center gap-6">
        <p className="flex flex-row items-center gap-4"><Image src={calender} alt="icon" width={15} height={15} /> Date: {event.date}</p>
        <p className="flex flex-row items-center gap-4"> <Image src={clock} alt="icon" width={15} height={15} />Time: {event.time}</p>
      </div>
    </div>
  );
}

export default Page;
