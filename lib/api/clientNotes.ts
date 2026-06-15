import axios from 'axios';
import type { CreateNoteData, FetchNotesResponse, Note, NoteTag } from '@/types/note';

interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: NoteTag;
}

export async function fetchNotesClient({
  page = 1,
  perPage = 12,
  search = '',
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> {
  const params: {
    page: number;
    perPage: number;
    search?: string;
    tag?: NoteTag;
  } = { page, perPage };

  if (search.trim()) params.search = search.trim();
  if (tag) params.tag = tag;

  const { data } = await axios.get<FetchNotesResponse>('/api/notes', {
    params,
  });

  return data;
}

export async function createNoteClient(note: CreateNoteData): Promise<Note> {
  const { data } = await axios.post<Note>('/api/notes', note);
  return data;
}