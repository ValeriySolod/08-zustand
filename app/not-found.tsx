import type { Metadata } from 'next';
import css from './NotFound.module.css';

const title = '404 - Page not found | NoteHub';
const description = 'Sorry, the page you are looking for does not exist.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: 'https://notehub.com/not-found',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub page not found',
      },
    ],
  },
};

export default function NotFound() {
  return (
    <main className={css.main}>
      <h1>404 - Page not found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </main>
  );
}


