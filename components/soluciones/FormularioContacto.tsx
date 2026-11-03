"use client";

import { useState, type FormEvent } from "react";

const CAMPOS = [
  { name: "nombre", label: "Nombre", type: "text", autoComplete: "name" },
  { name: "cargo", label: "Cargo", type: "text", autoComplete: "organization-title" },
  { name: "municipio", label: "Municipio", type: "text", autoComplete: "organization" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
] as const;

type Valores = Record<"nombre" | "cargo" | "municipio" | "email" | "mensaje", string>;
type Errores = Partial<Record<keyof Valores, string>>;

const VACIO: Valores = { nombre: "", cargo: "", municipio: "", email: "", mensaje: "" };

function validar(v: Valores): Errores {
  const e: Errores = {};
  if (!v.nombre.trim()) e.nombre = "Contanos tu nombre.";
  if (!v.cargo.trim()) e.cargo = "Indicanos tu cargo.";
  if (!v.municipio.trim()) e.municipio = "Indicanos tu municipio.";
  if (!v.email.trim()) e.email = "Necesitamos un email para responderte.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email))
    e.email = "Revisá que el email esté bien escrito.";
  if (!v.mensaje.trim()) e.mensaje = "Contanos brevemente qué querés mejorar.";
  return e;
}

// TODO: conectar con un servicio de envío (Resend, Formspree o similar).
// Por ahora no se envía nada: solo se simula el éxito.
async function enviarContacto(datos: Valores): Promise<void> {
  void datos;
}

export default function FormularioContacto() {
  const [valores, setValores] = useState<Valores>(VACIO);
  const [errores, setErrores] = useState<Errores>({});
  const [estado, setEstado] = useState<"idle" | "enviando" | "ok">("idle");

  function cambiar(name: keyof Valores, value: string) {
    setValores((p) => ({ ...p, [name]: value }));
  }

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const e = validar(valores);
    setErrores(e);
    const primero = Object.keys(e)[0];
    if (primero) {
      document.getElementById(`campo-${primero}`)?.focus();
      return;
    }
    setEstado("enviando");
    await enviarContacto(valores);
    setValores(VACIO);
    setEstado("ok");
  }

  const base =
    "mt-1 w-full rounded-xl border border-[#6b7f8a] bg-white px-4 py-3 text-base text-[var(--nav-text)]";

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      {CAMPOS.map((c) => (
        <div key={c.name}>
          <label htmlFor={`campo-${c.name}`} className="font-semibold text-brand-azul">
            {c.label}
          </label>
          <input
            id={`campo-${c.name}`}
            name={c.name}
            type={c.type}
            autoComplete={c.autoComplete}
            value={valores[c.name]}
            onChange={(ev) => cambiar(c.name, ev.target.value)}
            aria-invalid={errores[c.name] ? true : undefined}
            aria-describedby={errores[c.name] ? `error-${c.name}` : undefined}
            className={base}
          />
          {errores[c.name] && (
            <p id={`error-${c.name}`} className="mt-1 text-sm font-semibold text-[#a3401c]">
              {errores[c.name]}
            </p>
          )}
        </div>
      ))}

      <div className="sm:col-span-2">
        <label htmlFor="campo-mensaje" className="font-semibold text-brand-azul">
          Contanos qué querés mejorar
        </label>
        <textarea
          id="campo-mensaje"
          name="mensaje"
          rows={5}
          value={valores.mensaje}
          onChange={(ev) => cambiar("mensaje", ev.target.value)}
          aria-invalid={errores.mensaje ? true : undefined}
          aria-describedby={errores.mensaje ? "error-mensaje" : undefined}
          className={base}
        />
        {errores.mensaje && (
          <p id="error-mensaje" className="mt-1 text-sm font-semibold text-[#a3401c]">
            {errores.mensaje}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={estado === "enviando"}
          className="btn btn-cta px-8 py-3.5 text-lg disabled:opacity-60"
        >
          {estado === "enviando" ? "Enviando…" : "Enviar consulta"}
        </button>
        <p role="status" className="font-semibold text-brand-azul">
          {estado === "ok" && "¡Gracias! Recibimos tu consulta."}
        </p>
      </div>
    </form>
  );
}
