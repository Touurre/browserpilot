"use client"

import { useRef, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { type Group, Vector3 } from "three"
import Road from "./road"
import Car from "./car"
import OtherVehicle from "./other-vehicle"
import LaneDetection from "./lane-detection"
import { useStore } from "@/lib/store"

export default function Scene({ carRef }) {
  const otherCarRef = useRef<Group>(null)

  const {
    laneKeepingActive,
    cruiseControlActive,
    targetSpeed,
    currentSpeed,
    setCurrentSpeed,
    steeringAngle,
    setSteeringAngle,
    carPosition,
    setCarPosition,
    manualControl,
    resetSimulation,
  } = useStore()

  // Initialize positions
  useEffect(() => {
    resetSimulation()

    if (carRef.current) {
      // Position the main car at the starting position
      carRef.current.position.set(0, 0, 0)
      // Orient the car to face forward along the Z axis
      carRef.current.rotation.y = Math.PI
    }

    if (otherCarRef.current) {
      // Position the other car ahead
      otherCarRef.current.position.set(0, 0, 30)
      // Orient the other car to face forward along the Z axis
      otherCarRef.current.rotation.y = Math.PI
    }
  }, [resetSimulation, carRef])

  // Update car position and handle lane keeping
  useFrame((state, delta) => {
    if (!carRef.current || !otherCarRef.current) return

    // Create a new position vector
    const newPosition = new Vector3(carPosition.x, carPosition.y, carPosition.z)

    // Move forward in the positive Z direction
    newPosition.z += currentSpeed * delta

    // Lane keeping logic - only if enabled and not in manual control
    if (laneKeepingActive && !manualControl) {
      // Simple lane keeping: if car is drifting from center, adjust steering
      if (Math.abs(newPosition.x) > 1.5) {
        const correction = newPosition.x > 0 ? -0.05 : 0.05
        setSteeringAngle(steeringAngle + correction)
      } else {
        // Gradually return to center
        setSteeringAngle(steeringAngle * 0.9)
      }
    } else if (!manualControl) {
      // If not in lane keeping mode and not manual, gradually return steering to center
      // setSteeringAngle(steeringAngle * 0.95)
    }

    // Apply steering
    newPosition.x += steeringAngle * delta * currentSpeed

    // Update car position in store
    setCarPosition(newPosition)

    // Update the position of the 3D object
    carRef.current.position.set(newPosition.x, newPosition.y, newPosition.z)

    // Rotate car based on steering
    carRef.current.rotation.y = Math.PI + steeringAngle * 0.5

    // Adaptive cruise control - only if enabled and not in manual control
    if (cruiseControlActive && !manualControl) {
      const otherCarZ = otherCarRef.current.position.z
      const distance = otherCarZ - newPosition.z

      // Adjust speed based on distance to car ahead
      if (distance < 10 && distance > 0) {
        // Too close, slow down
        setCurrentSpeed(Math.max(currentSpeed - 0.1, 0))
      } else if (distance > 15 && currentSpeed < targetSpeed) {
        // Far enough, speed up to target
        setCurrentSpeed(Math.min(currentSpeed + 0.05, targetSpeed))
      } else if (currentSpeed < targetSpeed) {
        // No car ahead, maintain target speed
        setCurrentSpeed(Math.min(currentSpeed + 0.05, targetSpeed))
      } else if (currentSpeed > targetSpeed) {
        setCurrentSpeed(Math.max(currentSpeed - 0.05, 0))
      }
    } else if (!manualControl) {
      // If not in cruise control and not manual, gradually slow down
      setCurrentSpeed(Math.max(currentSpeed - 0.02, 0))
    }

    // Move other car at constant speed
    otherCarRef.current.position.z += 2 * delta

    // Make other car loop around
    if (otherCarRef.current.position.z - carRef.current.position.z > 100) {
      otherCarRef.current.position.z = carRef.current.position.z + 30
    }

    // Move the road with the car to create the illusion of an infinite road
    if (Math.abs(carRef.current.position.z) > 100) {
      // Reset the Z position of the main car
      const resetZ = carRef.current.position.z % 100
      carRef.current.position.z = resetZ
      setCarPosition(new Vector3(newPosition.x, newPosition.y, resetZ))

      // Adjust the position of the other car accordingly
      otherCarRef.current.position.z = resetZ + 30
    }
  })

  return (
    <>
      <Road />

      <group ref={carRef}>
        <Car />
        {laneKeepingActive && <LaneDetection />}
      </group>

      <group ref={otherCarRef}>
        <OtherVehicle />
      </group>
    </>
  )
}

