"use client"

export default function Road() {
  return (
    <group>
      {/* Route principale - simple et longue */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 1000]} />
        <meshStandardMaterial color="#555" />
      </mesh>

      {/* Marquages routiers - ligne centrale */}
      {Array.from({ length: 100 }).map((_, i) => (
        <mesh key={`center-${i}`} position={[0, 0.01, i * 10 - 500]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.2, 3]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      ))}

      {/* Marquages routiers - lignes latérales */}
      {Array.from({ length: 2 }).map((_, i) => (
        <mesh key={`side-${i}`} position={[i === 0 ? -3 : 3, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.2, 1000]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      ))}

      {/* Bas-côté simple */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[100, 1000]} />
        <meshStandardMaterial color="#3a7d44" />
      </mesh>
    </group>
  )
}

