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
    <div>
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      <p>{event.date} - {event.location}</p>
    </div>
  );
}

export default Page;
