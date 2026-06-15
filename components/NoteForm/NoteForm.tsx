'use client';

import type { ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api/notes';
import { useNoteStore } from '@/lib/store/noteStore';
import type { NoteTag } from '@/types/note';
import css from './NoteForm.module.css';

const tags: NoteTag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const draft = useNoteStore(state => state.draft);
  const setDraft = useNoteStore(state => state.setDraft);
  const clearDraft = useNoteStore(state => state.clearDraft);

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: async () => {
      clearDraft();
      await queryClient.invalidateQueries({
        queryKey: ['notes'],
      });
      router.push('/notes/filter/all');
    },
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setDraft({
      [name]: value,
    });
  };

  const formAction = (formData: FormData) => {
    const title = String(formData.get('title') ?? '').trim();
    const content = String(formData.get('content') ?? '').trim();
    const tag = String(formData.get('tag') ?? 'Todo') as NoteTag;

    if (!title || !content) {
      return;
    }

    mutate({
      title,
      content,
      tag,
    });
  };

  return (
    <form className={css.form} action={formAction}>
      <label className={css.formGroup}>
        Title
        <input
          className={css.input}
          type="text"
          name="title"
          defaultValue={draft.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
      </label>

      <label className={css.formGroup}>
        Content
        <textarea
          className={css.textarea}
          name="content"
          defaultValue={draft.content}
          onChange={handleChange}
          placeholder="Content"
          rows={8}
          required
        />
      </label>

      <label className={css.formGroup}>
        Tag
        <select
          className={css.select}
          name="tag"
          defaultValue={draft.tag}
          onChange={handleChange}
        >
          {tags.map(tag => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </label>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={() => router.back()}
        >
          Cancel
        </button>

        <button type="submit" className={css.submitButton} disabled={isPending}>
          {isPending ? 'Creating...' : 'Create note'}
        </button>
      </div>
    </form>
  );
}