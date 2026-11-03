"use client";

import { useLayoutEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { Box3, Mesh, Vector3 } from "three";

export const MODEL_URL = "/models/ciudadConAutos.glb";
export const DRACO_PATH = "/draco/";

/** Tamaño (en unidades de escena) del lado mayor de la maqueta, así las cámaras de STEPS no dependen de la escala del GLB */
export const MODEL_SIZE = 24;

export default function CityModel({ modelSize = MODEL_SIZE }: { modelSize?: number }) {
  const { scene } = useGLTF(MODEL_URL, DRACO_PATH);

  // Mide una copia aislada para que el tamaño previo del grupo no afecte el cálculo.
  const { scale, position } = useMemo(() => {
    const unscaledScene = scene.clone(true);
    unscaledScene.updateMatrixWorld(true);
    const box = new Box3().setFromObject(unscaledScene);
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());
    const s = modelSize / Math.max(size.x, size.z);
    return {
      scale: s,
      position: [-center.x * s, -box.min.y * s, -center.z * s] as [
        number,
        number,
        number,
      ],
    };
  }, [scene, modelSize]);

  useLayoutEffect(() => {
    scene.traverse((obj) => {
      if ((obj as Mesh).isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });
  }, [scene]);

  return (
    <group position={position} scale={scale}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload(MODEL_URL, DRACO_PATH);
