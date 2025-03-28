"use client"

import { create } from "zustand"
import { Vector3 } from "three"

interface SimulationState {
  // Lane keeping
  laneKeepingActive: boolean
  setLaneKeepingActive: (active: boolean) => void

  // Cruise control
  cruiseControlActive: boolean
  setCruiseControlActive: (active: boolean) => void
  targetSpeed: number
  setTargetSpeed: (speed: number) => void
  currentSpeed: number
  setCurrentSpeed: (speed: number) => void

  // Car state
  steeringAngle: number
  setSteeringAngle: (angle: number) => void
  carPosition: Vector3
  setCarPosition: (position: Vector3) => void

  // Car reference
  carRef: any
  setCarRef: (ref: any) => void

  // Manual control
  manualControl: boolean
  setManualControl: (active: boolean) => void

  // Reset
  resetSimulation: () => void
}

// Create initial state with proper defaults
const initialState = {
  laneKeepingActive: false,
  cruiseControlActive: false,
  targetSpeed: 3,
  currentSpeed: 0,
  steeringAngle: 0,
  carPosition: new Vector3(0, 0, 0),
  manualControl: false,
  carRef: null,
}

export const useStore = create<SimulationState>((set) => ({
  // Lane keeping
  laneKeepingActive: initialState.laneKeepingActive,
  setLaneKeepingActive: (active) => set({ laneKeepingActive: active }),

  // Cruise control
  cruiseControlActive: initialState.cruiseControlActive,
  setCruiseControlActive: (active) => set({ cruiseControlActive: active }),
  targetSpeed: initialState.targetSpeed,
  setTargetSpeed: (speed) => set({ targetSpeed: speed }),
  currentSpeed: initialState.currentSpeed,
  setCurrentSpeed: (speed) => set({ currentSpeed: speed }),

  // Car state
  steeringAngle: initialState.steeringAngle,
  setSteeringAngle: (angle) => set({ steeringAngle: angle }),
  carPosition: initialState.carPosition,
  setCarPosition: (position) =>
    set({
      carPosition: new Vector3(position.x, position.y, position.z),
    }),

  // Car reference
  carRef: initialState.carRef,
  setCarRef: (ref) => set({ carRef: ref }),

  // Manual control
  manualControl: initialState.manualControl,
  setManualControl: (active) => set({ manualControl: active }),

  // Reset simulation
  resetSimulation: () =>
    set({
      laneKeepingActive: initialState.laneKeepingActive,
      cruiseControlActive: initialState.cruiseControlActive,
      targetSpeed: initialState.targetSpeed,
      currentSpeed: initialState.currentSpeed,
      steeringAngle: initialState.steeringAngle,
      carPosition: new Vector3(0, 0, 0),
      manualControl: initialState.manualControl,
    }),
}))

