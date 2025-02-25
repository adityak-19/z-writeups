import { getWriteupMetadata } from '@/lib/about';

export async function GET(req, { params }) {
  try {
    if (!params?.event) {
      return new Response(JSON.stringify({ error: 'Event parameter is required' }), { status: 400 });
    }

    const { metadata, error } = await getWriteupMetadata(params.event);
    
    if (error) {
      return new Response(JSON.stringify({ error }), { status: 500 });
    }
    
    return new Response(JSON.stringify({ metadata }), { status: 200 });
  } catch (error) {
    console.error("Error in API route:", error);
    return new Response(JSON.stringify({ error: 'Failed to load about.md' }), { status: 500 });
  }
}