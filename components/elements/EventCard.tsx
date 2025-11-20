import Image from "next/image"
import Link from "next/link"

interface Props{
    title: string,
    image: string,
    slug: string,
    location:string,
    date: string,
    time: string,
}


const EventCard = ({title,image,slug, location, date, time}: Props) => {
  return (
    <Link href={`/events/${slug}`} >
        <Image src={image} alt={title} width={320} height={120}/>
        <p>{title}</p>
        <div>
            <p>Location: {location}</p>
            <p>Date: {date}</p>
            <p>Time: {time}</p>
        </div>
    </Link>
  )
}

export default EventCard
