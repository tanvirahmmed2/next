import Image from "next/image"
import Link from "next/link"

interface Props{
    title: string,
    image: string,
}


const EventCard = ({title,image}: Props) => {
  return (
    <Link href={`/events`} >
        <Image src={image} alt="image"/>
        <p>{title}</p>
    </Link>
  )
}

export default EventCard
