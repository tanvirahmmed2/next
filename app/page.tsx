import EventCard from "@/components/elements/EventCard"
import ExploreBtn from "@/components/elements/ExploreBtn"

const events=[
  { 
    id:1,
    image: '/images/event1.png',
    title: "Event 1",
    slug: 'event-1',
    location:'location-1',
    date: 'Date-1',
    time: 'Time-1'
  },
  { 
    id:2,
    image: '/images/event2.png',
    title: "Event 2",
    slug: 'event-2',
    location:'location-2',
    date: 'Date-2',
    time: 'Time-2'
  },
  
]


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
