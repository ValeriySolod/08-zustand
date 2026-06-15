import { NextRequest, NextResponse } from 'next/server';
import { fetchNotes, createNote } from '@/lib/api/notes';
import type { NoteTag } from '@/types/note';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const page = Number(searchParams.get('page') ?? 1);
  const perPage = Number(searchParams.get('perPage') ?? 12);
  const search = searchParams.get('search') ?? '';
  const tag = searchParams.get('tag') as NoteTag | null;

  const data = await fetchNotes({
    page,
    perPage,
    search,
    tag: tag ?? undefined,
  });

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const data = await createNote(body);

  return NextResponse.json(data);
}