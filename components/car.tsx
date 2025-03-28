"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type { Mesh } from "three"
import { useStore } from "@/lib/store"

export default function Car() {
  const wheelFL = useRef<Mesh>(null)
  const wheelFR = useRef<Mesh>(null)
  const wheelBL = useRef<Mesh>(null)
  const wheelBR = useRef<Mesh>(null)
  const { currentSpeed } = useStore()

  // Animate wheels based on speed
  useFrame((state, delta) => {
    if (!wheelFL.current || !wheelFR.current || !wheelBL.current || !wheelBR.current) return

    // Rotate wheels based on speed - positive rotation for forward movement
    const rotation = delta * currentSpeed * 5

    // Use proper rotation methods with positive rotation for forward movement
    wheelFL.current.rotation.x = (wheelFL.current.rotation.x + rotation) % (2 * Math.PI)
    wheelFR.current.rotation.x = (wheelFR.current.rotation.x + rotation) % (2 * Math.PI)
    wheelBL.current.rotation.x = (wheelBL.current.rotation.x + rotation) % (2 * Math.PI)
    wheelBR.current.rotation.x = (wheelBR.current.rotation.x + rotation) % (2 * Math.PI)
  })

  return (
    <group>
      {/* Car body */}
      <mesh castShadow receiveShadow position={[0, 0.5, 0]}>
        <boxGeometry args={[2, 1, 4]} />
        <meshStandardMaterial color="#3080ff" metalness={0.6} roughness={0.2} />
      </mesh>

      {/* Car roof */}
      <mesh castShadow position={[0, 1.2, -0.5]}>
        <boxGeometry args={[1.8, 0.7, 2]} />
        <meshStandardMaterial color="#3080ff" metalness={0.6} roughness={0.2} />
      </mesh>

      {/* Windshield */}
      <mesh castShadow position={[0, 1, 0.5]}>
        <boxGeometry args={[1.7, 0.7, 0.1]} />
        <meshStandardMaterial color="#aaddff" transparent opacity={0.7} />
      </mesh>

      {/* Wheels */}
      <mesh ref={wheelFL} castShadow position={[-1, 0.3, 1.3]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#111" />
      </mesh>

      <mesh ref={wheelFR} castShadow position={[1, 0.3, 1.3]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#111" />
      </mesh>

      <mesh ref={wheelBL} castShadow position={[-1, 0.3, -1.3]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#111" />
      </mesh>

      <mesh ref={wheelBR} castShadow position={[1, 0.3, -1.3]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#111" />
      </mesh>

      {/* Headlights */}
      <mesh position={[-0.7, 0.5, 2]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#ffff99" emissive="#ffff99" emissiveIntensity={1} />
      </mesh>

      <mesh position={[0.7, 0.5, 2]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#ffff99" emissive="#ffff99" emissiveIntensity={1} />
      </mesh>
    </group>
  )
}

