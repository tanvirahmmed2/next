import Image from "next/image"
import Link from "next/link"

interface Props {
    title: string,
    image: string,
    slug: string,
    location: string,
    date: string,
    time: string,
}


const EventCard = ({ title, image, slug, location, date, time }: Props) => {
    return (
        <Link href={`/events/${slug}`} >
            <Image src={image} alt={title} width={320} height={120} />
            <p>{title}</p>
            <div className="flex flex-row gap-2">
                <Image src='icons/pin.svg' alt="location" width={10} height={10} />
                <p>Location: {location}</p>
            </div>
            <div className="flex flex-row gap-2">
                <Image src='icons/calendar.svg' alt="location" width={10} height={10} />
                <p>Date: {date}</p>

            </div>
            <div className="flex flex-row gap-2">
                <Image src='icons/clock.svg' alt="location" width={10} height={10} />
                <p>Time: {time}</p>
            </div>
        </Link>
    )
}

export default EventCard
