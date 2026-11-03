"use client";

import { useEffect, useState, type RefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MathUtils, Spherical, Vector3, type PerspectiveCamera } from "three";
import type { CameraKeyframe } from "@/lib/steps";

export type Readout = CameraKeyframe;

type OrbitLike = { target: Vector3 };

const _sph = new Spherical();
const _off = new Vector3();
const _zero = new Vector3();

const r = (n: number, d = 3) => Number(n.toFixed(d));

/** Dentro del Canvas: lee la cámara real (+ target de OrbitControls) y la deja en un ref */
export function DebugProbe({
  readoutRef,
  fovOverride,
}: {
  readoutRef: RefObject<Readout>;
  fovOverride: number | null;
}) {
  const controls = useThree((s) => s.controls) as unknown as OrbitLike | null;

  useFrame((state) => {
    const camera = state.camera as PerspectiveCamera;
    if (fovOverride !== null && camera.fov !== fovOverride) {
      camera.fov = fovOverride;
      camera.updateProjectionMatrix();
    }
    const target = controls?.target ?? _zero;
    _sph.setFromVector3(_off.copy(camera.position).sub(target));
    readoutRef.current = {
      azimuth: r(MathUtils.euclideanModulo(_sph.theta + Math.PI, Math.PI * 2) - Math.PI),
      polar: r(_sph.phi),
      distance: r(_sph.radius, 2),
      target: [r(target.x, 2), r(target.y, 2), r(target.z, 2)],
      fov: r(camera.fov, 1),
    };
  });

  return null;
}

type HudProps = {
  readoutRef: RefObject<Readout>;
  initial: Readout;
  stepIndex: number;
  stepId: string;
  fov: number;
  onFov: (fov: number) => void;
  modelSize: number;
  onModelSize: (size: number) => void;
};

/** Fuera del Canvas: panel con los valores actuales y botón para copiar el objeto `camera` */
export default function DebugHud({
  readoutRef,
  initial,
  stepIndex,
  stepId,
  fov,
  onFov,
  modelSize,
  onModelSize,
}: HudProps) {
  const [view, setView] = useState<Readout>(initial);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setView(readoutRef.current), 100);
    return () => clearInterval(id);
  }, [readoutRef]);

  const snippet = `camera: { azimuth: ${view.azimuth}, polar: ${view.polar}, distance: ${view.distance}, target: [${view.target.join(", ")}], fov: ${view.fov} },`;

  const copy = async () => {
    await navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="pointer-events-auto absolute bottom-4 left-4 z-40 w-[290px] rounded-2xl bg-black/70 p-4 font-mono text-xs text-white shadow-xl">
      <p className="mb-2 font-sans text-sm font-bold">
        DEBUG · paso {stepIndex + 1} ({stepId})
      </p>
      <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5">
        <dt className="opacity-60">azimuth</dt>
        <dd>{view.azimuth}</dd>
        <dt className="opacity-60">polar</dt>
        <dd>{view.polar}</dd>
        <dt className="opacity-60">distance</dt>
        <dd>{view.distance}</dd>
        <dt className="opacity-60">target</dt>
        <dd>[{view.target.join(", ")}]</dd>
        <dt className="opacity-60">fov</dt>
        <dd>
          <input
            type="range"
            min={15}
            max={70}
            step={0.5}
            value={fov}
            onChange={(e) => onFov(Number(e.target.value))}
            className="w-24 align-middle"
            aria-label="Campo de visión"
          />{" "}
          {view.fov}
        </dd>
      </dl>
      <label className="mt-2 flex items-center justify-between gap-2 font-sans">
        <span>Tamaño del modelo</span>
        <input
          type="number"
          min={15}
          max={30}
          step={0.1}
          value={modelSize}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (Number.isFinite(value) && value >= 15 && value <= 30) {
              onModelSize(value);
            }
          }}
          className="w-20 rounded bg-white/15 px-2 py-1 text-right text-white"
          aria-label="Tamaño del modelo"
        />
      </label>
      <input
        type="range"
        min={15}
        max={30}
        step={0.1}
        value={modelSize}
        onChange={(e) => onModelSize(Number(e.target.value))}
        className="mt-1 w-full"
        aria-label="Ajustar tamaño del modelo"
      />
      <button
        type="button"
        onClick={copy}
        className="mt-3 w-full rounded-full bg-white px-3 py-2 font-sans text-sm font-bold text-black hover:bg-white/80"
      >
        {copied ? "¡Copiado!" : "Copiar paso"}
      </button>
      <p className="mt-2 font-sans text-[11px] leading-snug opacity-60">
        Arrastrá para orbitar, click derecho para mover el target. La rueda
        hace zoom sobre el 3D; para cambiar de paso usá los puntitos.
      </p>
    </div>
  );
}
