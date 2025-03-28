"use client"

export default function OtherVehicle() {
  return (
    <group>
      {/* Car body */}
      <mesh castShadow receiveShadow position={[0, 0.5, 0]}>
        <boxGeometry args={[2, 1, 4]} />
        <meshStandardMaterial color="#cc3333" metalness={0.6} roughness={0.2} />
      </mesh>

      {/* Car roof */}
      <mesh castShadow position={[0, 1.2, -0.5]}>
        <boxGeometry args={[1.8, 0.7, 2]} />
        <meshStandardMaterial color="#cc3333" metalness={0.6} roughness={0.2} />
      </mesh>

      {/* Windshield */}
      <mesh castShadow position={[0, 1, 0.5]}>
        <boxGeometry args={[1.7, 0.7, 0.1]} />
        <meshStandardMaterial color="#aaddff" transparent opacity={0.7} />
      </mesh>

      {/* Wheels - simplified */}
      <mesh castShadow position={[-1, 0.3, 1.3]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#111" />
      </mesh>

      <mesh castShadow position={[1, 0.3, 1.3]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#111" />
      </mesh>

      <mesh castShadow position={[-1, 0.3, -1.3]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#111" />
      </mesh>

      <mesh castShadow position={[1, 0.3, -1.3]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#111" />
      </mesh>

      {/* Taillights */}
      <mesh position={[-0.7, 0.5, -2]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#ff3333" emissive="#ff3333" emissiveIntensity={0.5} />
      </mesh>

      <mesh position={[0.7, 0.5, -2]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#ff3333" emissive="#ff3333" emissiveIntensity={0.5} />
      </mesh>
    </group>
  )
}

