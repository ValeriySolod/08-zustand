import css from './Home.module.css';

export default function Home() {
  return (
    <main className={css.main}>
      <h1 className={css.title}>Welcome to NoteHub</h1>
      <p className={css.description}>
        Create, organize, and manage your notes efficiently.
      </p>
    </main>
  );
}