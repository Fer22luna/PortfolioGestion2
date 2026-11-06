"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
import { PerspectiveCamera, Spherical, Vector3 } from "three";
import type { CameraKeyframe } from "@/lib/steps";

/** Tiempo de suavizado (s) del damping hacia cada keyframe */
const SMOOTH_TIME = 0.6;
/** Cuánto se corre la maqueta (fracción de pantalla) para que no quede tapada por la tarjeta */
const VIEW_SHIFT_DESKTOP_X = 0.22;
const VIEW_SHIFT_MOBILE_Y = 0.2;

type Pose = {
  azimuth: number;
  polar: number;
  distance: number;
  tx: number;
  ty: number;
  tz: number;
  fov: number;
};

type OrbitLike = { target: Vector3; update: () => void };

const toPose = (k: CameraKeyframe): Pose => ({
  azimuth: k.azimuth,
  polar: k.polar,
  distance: k.distance,
  tx: k.target[0],
  ty: k.target[1],
  tz: k.target[2],
  fov: k.fov,
});

const _sph = new Spherical();
const _target = new Vector3();

function applyPose(camera: PerspectiveCamera, p: Pose, distanceMul = 1) {
  _target.set(p.tx, p.ty, p.tz);
  _sph.set(p.distance * distanceMul, p.polar, p.azimuth);
  camera.position.setFromSpherical(_sph).add(_target);
  camera.lookAt(_target);
  if (camera.fov !== p.fov) {
    camera.fov = p.fov;
    camera.updateProjectionMatrix();
  }
}

type Props = {
  keyframe: CameraKeyframe;
  /** En debug el control lo tiene OrbitControls: el rig solo salta al keyframe cuando cambia el paso */
  debug?: boolean;
};

export default function CameraRig({ keyframe, debug = false }: Props) {
  const camera = useThree((s) => s.camera) as PerspectiveCamera;
  const size = useThree((s) => s.size);
  const controls = useThree((s) => s.controls) as unknown as OrbitLike | null;
  const current = useRef<Pose>(toPose(keyframe));

  // Corre el centro de la escena hacia el lado libre de la tarjeta
  useEffect(() => {
    const desktop = size.width >= 1024;
    camera.setViewOffset(
      size.width,
      size.height,
      desktop ? size.width * VIEW_SHIFT_DESKTOP_X : 0,
      desktop ? 0 : size.height * VIEW_SHIFT_MOBILE_Y,
      size.width,
      size.height,
    );
    return () => camera.clearViewOffset();
  }, [camera, size]);

  // Pose inicial sin "vuelo" desde el origen
  useLayoutEffect(() => {
    current.current = toPose(keyframe);
    applyPose(camera, current.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [camera]);

  // En debug: salto directo al keyframe del paso y sincroniza OrbitControls
  useLayoutEffect(() => {
    if (!debug || !controls) return;
    current.current = toPose(keyframe);
    applyPose(camera, current.current);
    controls.target.set(...keyframe.target);
    controls.update();
  }, [debug, controls, keyframe, camera]);

  useFrame((state, delta) => {
    if (debug) return;
    const c = current.current;
    const k = keyframe;
    const dt = Math.min(delta, 0.1);

    easing.dampAngle(c, "azimuth", k.azimuth, SMOOTH_TIME, dt);
    easing.damp(c, "polar", k.polar, SMOOTH_TIME, dt);
    easing.damp(c, "distance", k.distance, SMOOTH_TIME, dt);
    easing.damp(c, "tx", k.target[0], SMOOTH_TIME, dt);
    easing.damp(c, "ty", k.target[1], SMOOTH_TIME, dt);
    easing.damp(c, "tz", k.target[2], SMOOTH_TIME, dt);
    easing.damp(c, "fov", k.fov, SMOOTH_TIME, dt);

    // Pantallas angostas (retrato): aleja la cámara para que la maqueta no quede cortada
    const { width, height } = state.size;
    const mul = width < 1024 && width < height ? Math.min(1.6, height / width) : 1;
    applyPose(camera, c, mul);
  });

  return null;
}
