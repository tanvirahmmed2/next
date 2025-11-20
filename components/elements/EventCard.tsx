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


const EventCard = ({title,image,slug}: Props) => {
  return (
    <Link href={`/events/${slug}`} >
        <Image src={image} alt={title} width={320} height={120}/>
        <p>{title}</p>
    </Link>
  )
}

export default EventCard
