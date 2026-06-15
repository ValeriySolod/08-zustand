import Link from 'next/link';
import css from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p className={css.copyright}>© 2024 NoteHub. All rights reserved.</p>

        <nav className={css.nav}>
          <Link href="/" className={css.link}>
            Home
          </Link>
          <Link href="/notes/filter/all" className={css.link}>
            Notes
          </Link>
        </nav>
      </div>
    </footer>
  );
}