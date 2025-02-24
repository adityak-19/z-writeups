import { getWriteupMetadata } from '@/lib/about';

export async function GET(req, { params }) {
  const { event } = params;
  
  try {
    const { metadata, error } = await getWriteupMetadata(event);
    
    if (error) {
      return new Response(JSON.stringify({ error }), { status: 500 });
    }
    
    return new Response(JSON.stringify({ metadata }), { status: 200 });
  } catch (error) {
    console.error("Error fetching about.md:", error);
    return new Response(JSON.stringify({ error: 'Failed to load about.md' }), { status: 500 });
  }
}