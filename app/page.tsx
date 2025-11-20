import EventCard from "@/components/elements/EventCard"
import ExploreBtn from "@/components/elements/ExploreBtn"
import { events } from "@/lib/data"



function Home() {
  return (
    <section className="w-full flex flex-col items-center justify-center gap-2 py-12">
      <h1 className="text-6xl font-semibold text-center">The Hub for Every Dev</h1>
      <h1 className="text-6xl font-semibold text-center">Event You Can not Miss</h1>
      <p className="text-lg ">Hackathon, Meetups and Conferences. All in one</p>
      <ExploreBtn/>
      <div className="mt-6 space-y-7">
        {events.map((event)=>(
          <div key={event.id}>
            <EventCard {...event}/>
          </div>
        ))}

      </div>
    </section>
  )
}

export default Home
