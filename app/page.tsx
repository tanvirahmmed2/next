import ExploreBtn from "@/components/elements/ExploreBtn"



function Home() {
  return (
    <section className="w-full flex flex-col items-center justify-center gap-2 py-12">
      <h1 className="text-6xl font-semibold text-center">The Hub for Every Dev</h1>
      <h1 className="text-6xl font-semibold text-center">Event You Can not Miss</h1>
      <p className="text-lg ">Hackathon, Meetups and Conferences. All in one</p>
      <ExploreBtn/>
      <div className="mt-6 space-y-7">
        {[1,2,3,4].map((event)=>(
          <p key={event}>Event {event}</p>
        ))}

      </div>
    </section>
  )
}

export default Home
