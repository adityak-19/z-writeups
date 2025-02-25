import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(req) {
  try {
    const payload = await req.json();
    
    // Verify GitHub webhook secret if needed
    // const signature = req.headers.get('x-hub-signature-256');
    
    // Revalidate affected paths
    if (payload.ref === 'refs/heads/main') {
      revalidatePath('/writeups');
      revalidatePath('/writeups/[event]');
      revalidatePath('/writeups/[event]/[category]/[slug]');
    }

    return NextResponse.json({ revalidated: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 