import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { ELEMENTS, type Molecule } from "../data/molecules";

function centre(mol: Molecule): [number, number, number][] {
  const n = mol.atoms.length;
  const c = mol.atoms.reduce(
    (a, at) => [a[0] + at.pos[0], a[1] + at.pos[1], a[2] + at.pos[2]],
    [0, 0, 0]
  );
  const cx = c[0] / n,
    cy = c[1] / n,
    cz = c[2] / n;
  return mol.atoms.map((a) => [a.pos[0] - cx, a.pos[1] - cy, a.pos[2] - cz]);
}

function Bond({
  a,
  b,
}: {
  a: [number, number, number];
  b: [number, number, number];
}) {
  const va = new THREE.Vector3(...a);
  const vb = new THREE.Vector3(...b);
  const mid = va.clone().add(vb).multiplyScalar(0.5);
  const dir = vb.clone().sub(va);
  const len = dir.length();
  const quat = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    dir.clone().normalize()
  );
  return (
    <mesh position={mid.toArray()} quaternion={quat}>
      <cylinderGeometry args={[0.08, 0.08, len, 24]} />
      <meshStandardMaterial color="#c9c9cf" roughness={0.5} metalness={0.05} />
    </mesh>
  );
}

function Model({ mol }: { mol: Molecule }) {
  const group = useRef<THREE.Group>(null);
  const positions = useMemo(() => centre(mol), [mol]);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.35;
  });

  return (
    <group ref={group}>
      {mol.bonds.map(([i, j], k) => (
        <Bond key={k} a={positions[i]} b={positions[j]} />
      ))}
      {mol.atoms.map((atom, i) => (
        <mesh key={i} position={positions[i]}>
          <sphereGeometry args={[ELEMENTS[atom.el].radius, 48, 48]} />
          <meshStandardMaterial
            color={ELEMENTS[atom.el].color}
            roughness={0.35}
            metalness={0.05}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function Molecule3D({ mol }: { mol: Molecule }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 42 }}
      dpr={[1, 2]}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.75} />
      <directionalLight position={[4, 6, 5]} intensity={1.1} />
      <directionalLight position={[-5, -3, -4]} intensity={0.3} />
      <Model mol={mol} />
      <OrbitControls
        enablePan={false}
        enableZoom
        minDistance={3.5}
        maxDistance={10}
      />
    </Canvas>
  );
}
