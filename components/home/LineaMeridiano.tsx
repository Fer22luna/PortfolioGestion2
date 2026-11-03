/* Línea fina tipo meridiano que une los dos paneles. En desktop va horizontal,
   con un punto bajo el centro de cada panel; en mobile, vertical entre ambos. */
export default function LineaMeridiano({ etiqueta }: { etiqueta: string }) {
  return (
    <div
      aria-hidden
      className="flex flex-col items-center py-2 lg:flex-row lg:px-[25%] lg:py-0"
    >
      <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#0e2e45] lg:h-3 lg:w-3" />
      <span className="h-8 w-px bg-[#0e2e45]/40 lg:h-px lg:w-auto lg:flex-1" />
      <span className="rounded-full border border-[#0e2e45]/30 bg-white/90 px-4 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#0e2e45]">
        {etiqueta}
      </span>
      <span className="h-8 w-px bg-[#0e2e45]/40 lg:h-px lg:w-auto lg:flex-1" />
      <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#c1633b] lg:h-3 lg:w-3" />
    </div>
  );
}
