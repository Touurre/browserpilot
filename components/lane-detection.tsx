"use client"

export default function LaneDetection() {
  return (
    <group>
      {/* Left lane boundary detection */}
      <mesh position={[-3, 0.1, 0]}>
        <boxGeometry args={[0.2, 0.1, 10]} />
        <meshStandardMaterial color="#00ff00" transparent opacity={0.7} emissive="#00ff00" emissiveIntensity={0.5} />
      </mesh>

      {/* Right lane boundary detection */}
      <mesh position={[3, 0.1, 0]}>
        <boxGeometry args={[0.2, 0.1, 10]} />
        <meshStandardMaterial color="#00ff00" transparent opacity={0.7} emissive="#00ff00" emissiveIntensity={0.5} />
      </mesh>

      {/* Center line detection */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[0.2, 0.1, 10]} />
        <meshStandardMaterial color="#ffff00" transparent opacity={0.7} emissive="#ffff00" emissiveIntensity={0.5} />
      </mesh>
    </group>
  )
}

