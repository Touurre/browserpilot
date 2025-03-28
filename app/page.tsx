"use client"

import { Suspense, useState, useEffect, useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, Stats } from "@react-three/drei"
import Scene from "@/components/scene"
import Dashboard from "@/components/dashboard"
import { useStore } from "@/lib/store"
import * as THREE from "three"

// Camera component that follows the car
function FollowCamera({ target, cameraView }) {
  const { camera } = useThree()

  useFrame(() => {
    if (target.current) {
      let idealOffset, lookAtPosition;
      
      // Configure camera position and look target based on selected view
      switch(cameraView) {
        case 'front':
          // Camera in front of the car
          idealOffset = new THREE.Vector3(0, 3, 10);
          lookAtPosition = target.current.position.clone();
          break;
        case 'back':
          // Camera behind the car
          idealOffset = new THREE.Vector3(0, 3, -10);
          // Look ahead of the car
          lookAtPosition = new THREE.Vector3(0, 0, 10);
          lookAtPosition.applyQuaternion(target.current.quaternion);
          lookAtPosition.add(target.current.position);
          break;
        case 'cockpit':
          // Camera inside the car (cockpit view)
          idealOffset = new THREE.Vector3(0, 1.6, 0);
          // Look ahead
          lookAtPosition = new THREE.Vector3(0, 1.6, 100);
          lookAtPosition.applyQuaternion(target.current.quaternion);
          lookAtPosition.add(target.current.position);
          break;
        case 'side':
          // Camera on the right side of the car
          idealOffset = new THREE.Vector3(5, 2, 0);
          lookAtPosition = target.current.position.clone();
          break;
        default:
          // Default to rear view
          idealOffset = new THREE.Vector3(0, 3, -10);
          lookAtPosition = target.current.position.clone().add(new THREE.Vector3(0, 0, 10));
      }
      
      // Apply the car's rotation to the camera offset
      idealOffset.applyQuaternion(target.current.quaternion);
      idealOffset.add(target.current.position);

      // Smoothly move the camera to the ideal position
      camera.position.lerp(idealOffset, 0.1);
      
      // Point the camera at the look target
      camera.lookAt(lookAtPosition);
    }
  })

  return null
}

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [cameraView, setCameraView] = useState('front') // Default to front view
  const carRef = useRef()
  const { setCarRef } = useStore()

  // Only render the 3D content on the client side
  useEffect(() => {
    setMounted(true)

    // Set the car reference in the store
    setCarRef(carRef)
  }, [setCarRef])

  // Function to handle view change
  const handleViewChange = (view) => {
    setCameraView(view)
  }

  if (!mounted) {
    return (
      <div className="w-full h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-lg">Loading simulation...</p>
      </div>
    )
  }

  // Initial camera position based on selected view
  const getInitialCameraPos = () => {
    switch(cameraView) {
      case 'front': return [0, 3, 10]
      case 'back': return [0, 3, -10]
      case 'cockpit': return [0, 1.6, 0]
      case 'side': return [5, 2, 0]
      default: return [0, 3, -10]
    }
  }

  return (
    <main className="relative w-full h-screen">
      {/* Camera view selector controls */}
      <div className="absolute top-4 right-4 z-10 bg-white p-2 rounded shadow-md">
        <h3 className="font-bold mb-2">Camera View</h3>
        <div className="flex flex-col space-y-1">
          <button 
            className={`px-3 py-1 rounded ${cameraView === 'front' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => handleViewChange('front')}
          >
            Front
          </button>
          <button 
            className={`px-3 py-1 rounded ${cameraView === 'back' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => handleViewChange('back')}
          >
            Back
          </button>
          <button 
            className={`px-3 py-1 rounded ${cameraView === 'cockpit' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => handleViewChange('cockpit')}
          >
            Cockpit
          </button>
          <button 
            className={`px-3 py-1 rounded ${cameraView === 'side' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => handleViewChange('side')}
          >
            Side
          </button>
        </div>
      </div>
      
      <Canvas shadows camera={{ position: getInitialCameraPos(), fov: 60 }}>
        <Suspense fallback={null}>
          <Scene carRef={carRef} />
          <FollowCamera target={carRef} cameraView={cameraView} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
          <Environment preset="sunset" />
          <Stats />
        </Suspense>
      </Canvas>
      <Dashboard />
    </main>
  )
}
