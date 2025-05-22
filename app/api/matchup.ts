import { supabase } from '@/lib/supabase-client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

  const { data, error } = await supabase
    .from('showdowns')
    .select('*')
    .eq('id', id)
    .single();
  if (error || !data)
    return NextResponse.json({ error: 'Showdown not found' }, { status: 404 });

  return NextResponse.json(data);
}
