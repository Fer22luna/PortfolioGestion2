import Link from "next/link";

const LINKS = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Visión", href: "/#mision" },
  { label: "Soluciones", href: "/#soluciones" },
  { label: "Contacto", href: "/#contacto" },
];

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav
        aria-label="Principal"
        className="nav-pill flex w-full items-center justify-between gap-4 py-2.5 pl-6 pr-2.5"
      >
        <Link
          href="/#inicio"
          className="text-lg font-bold tracking-[0.14em] text-[var(--nav-text)]"
        >
          MERIDIANO
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="rounded-full px-3 py-2 text-[15px] font-semibold text-[var(--nav-text-muted)] transition-colors hover:text-[var(--nav-text)]"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link href="/#soluciones" className="btn btn-outline px-5 py-2.5 text-[15px] lg:hidden">Soluciones</Link>
          <Link href="/#contacto" className="btn btn-cta px-5 py-2.5 text-[15px]">
            Contactanos
          </Link>
        </div>
      </nav>
    </header>
  );
}
