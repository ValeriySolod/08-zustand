import axios from 'axios';
import type {
  CreateNoteData,
  FetchNotesResponse,
  Note,
  NoteTag,
} from '@/types/note';

const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
 headers: {
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
},
});

interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: NoteTag;
}

export async function fetchNotes({
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

  const { data } = await api.get<FetchNotesResponse>('/notes', { params });
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
}

export async function createNote(note: CreateNoteData): Promise<Note> {
  const { data } = await api.post<Note>('/notes', note);
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
}