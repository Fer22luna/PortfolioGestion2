"use client";

import { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Lightformer,
  OrbitControls,
} from "@react-three/drei";
import { ACESFilmicToneMapping, SRGBColorSpace } from "three";
import type { Step } from "@/lib/steps";
import CameraRig from "./CameraRig";
import CityModel, { MODEL_SIZE } from "./CityModel";
import DebugHud, { DebugProbe, type Readout } from "./DebugHud";

type Props = {
  step: Step;
  stepIndex: number;
};

export default function CityCanvas({ step, stepIndex }: Props) {
  // Este componente solo se renderiza en el cliente (dynamic, ssr:false)
  const [debug] = useState(
    () => new URLSearchParams(window.location.search).get("debug") === "1",
  );
  const [fovEdit, setFovEdit] = useState<{ id: string; value: number } | null>(
    null,
  );
  const [modelSize, setModelSize] = useState(MODEL_SIZE);
  const debugFov = fovEdit?.id === step.id ? fovEdit.value : null;
  const readoutRef = useRef<Readout>(step.camera);

  return (
    <div className="absolute inset-0">
      <Canvas
        shadows="percentage"
        dpr={[1, 1.75]}
        camera={{ fov: step.camera.fov, near: 0.1, far: 300 }}
        gl={{
          alpha: true,
          antialias: true,
          toneMapping: ACESFilmicToneMapping,
          outputColorSpace: SRGBColorSpace,
        }}
      >
        <hemisphereLight args={["#ffffff", "#9dbc6c", 0.9]} />
        <directionalLight
          position={[10, 16, 8]}
          intensity={2.2}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-near={1}
          shadow-camera-far={60}
          shadow-camera-left={-16}
          shadow-camera-right={16}
          shadow-camera-top={16}
          shadow-camera-bottom={-16}
          shadow-radius={4}
          shadow-bias={-0.0004}
          shadow-normalBias={0.04}
        />
        {/* Environment procedural: sin descargar HDRs externos */}
        <Environment resolution={256} environmentIntensity={0.35}>
          <Lightformer form="rect" intensity={2} position={[0, 6, -8]} scale={[14, 6, 1]} />
          <Lightformer form="rect" intensity={1.2} position={[-8, 4, 4]} scale={[8, 6, 1]} />
          <Lightformer form="rect" intensity={1} position={[8, 3, 6]} scale={[8, 6, 1]} />
        </Environment>

        <Suspense fallback={null}>
          <CityModel modelSize={modelSize} />
        </Suspense>
        <ContactShadows
          position={[0, -0.01, 0]}
          opacity={0.4}
          scale={40}
          blur={2.6}
          far={8}
          resolution={512}
        />

        {debug && (
          <>
            <OrbitControls makeDefault enableDamping dampingFactor={0.08} />
            <DebugProbe readoutRef={readoutRef} fovOverride={debugFov} />
          </>
        )}
        <CameraRig keyframe={step.camera} debug={debug} />
      </Canvas>

      {debug && (
        <DebugHud
          readoutRef={readoutRef}
          initial={step.camera}
          stepIndex={stepIndex}
          stepId={step.id}
          fov={debugFov ?? step.camera.fov}
          onFov={(value) => setFovEdit({ id: step.id, value })}
          modelSize={modelSize}
          onModelSize={setModelSize}
        />
      )}
    </div>
  );
}
