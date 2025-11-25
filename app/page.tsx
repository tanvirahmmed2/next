import EventCard from "@/components/elements/EventCard"
import ExploreBtn from "@/components/elements/ExploreBtn"
import { IEvent } from "@/database"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URl



async function Home() {

  const response = await fetch(`${BASE_URL}/api/events`)
  const { events } = await response.json()

  return (
    <section className="w-full flex flex-col items-center justify-center gap-2 py-12">
      <div className="w-full flex flex-col items-center justify-center gap-2">
        <h1 className="text-6xl font-semibold text-center">The Hub for Every Dev</h1>
        <h1 className="text-6xl font-semibold text-center">Event You Can not Miss</h1>
        <p className="text-lg ">Hackathon, Meetups and Conferences. All in one</p>
        <ExploreBtn />
      </div>

      <div className="mt-6 space-y-7 flex flex-wrap gap-4 p-4 justify-center">
        {events && events.length > 0 && events.map((event: IEvent) => (
          <div key={event.title}>
            <EventCard {...event} />
          </div>
        ))}

      </div>
    </section>
  )
}

export default Home
