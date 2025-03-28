"use client"

import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { ShipWheelIcon as SteeringWheel, GaugeIcon as Speedometer } from "lucide-react"
import { useEffect } from "react"

export default function Dashboard() {
  const {
    laneKeepingActive,
    setLaneKeepingActive,
    cruiseControlActive,
    setCruiseControlActive,
    targetSpeed,
    setTargetSpeed,
    currentSpeed,
    setCurrentSpeed,
    steeringAngle,
    setSteeringAngle,
    resetSimulation,
    manualControl,
    setManualControl,
  } = useStore()

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!manualControl) return

      switch (e.key) {
        case "ArrowUp":
          setCurrentSpeed(Math.min(currentSpeed + 0.5, 10))
          break
        case "ArrowDown":
          setCurrentSpeed(Math.max(currentSpeed - 0.5, 0))
          break
        case "ArrowLeft":
          setSteeringAngle(Math.max(steeringAngle - 0.1, -1))
          break
        case "ArrowRight":
          setSteeringAngle(Math.min(steeringAngle + 0.1, 1))
          break
        case " ": // Spacebar
          setCurrentSpeed(0) // Emergency brake
          break
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (!manualControl) return

      // Return steering to center when keys are released
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        setSteeringAngle(steeringAngle * 0.5) // Gradually return to center
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [manualControl, currentSpeed, steeringAngle, setCurrentSpeed, setSteeringAngle])

  return (
    <div className="absolute bottom-4 left-4 right-4 z-10 flex justify-center">
      <Card className="w-full max-w-3xl bg-white/90 backdrop-blur">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between">
            <span>Self-Driving Car Simulation</span>
            <Button variant="outline" onClick={resetSimulation}>
              Reset
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="font-medium">Manual Control</h3>
                  <p className="text-sm text-muted-foreground">Use arrow keys to control the car</p>
                </div>
                <Switch
                  checked={manualControl}
                  onCheckedChange={(checked) => {
                    setManualControl(checked)
                    if (checked) {
                      setLaneKeepingActive(false)
                      setCruiseControlActive(false)
                    }
                  }}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="font-medium">Lane Keeping Assist</h3>
                  <p className="text-sm text-muted-foreground">Keeps the car centered in the lane</p>
                </div>
                <Switch
                  checked={laneKeepingActive}
                  onCheckedChange={(checked) => {
                    setLaneKeepingActive(checked)
                    if (checked) setManualControl(false)
                  }}
                  disabled={manualControl}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="font-medium">Adaptive Cruise Control</h3>
                  <p className="text-sm text-muted-foreground">Maintains speed and safe distance</p>
                </div>
                <Switch
                  checked={cruiseControlActive}
                  onCheckedChange={(checked) => {
                    setCruiseControlActive(checked)
                    if (checked) setManualControl(false)
                  }}
                  disabled={manualControl}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Target Speed: {targetSpeed.toFixed(1)} units/s</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setTargetSpeed(Math.max(0, targetSpeed - 0.5))}>
                    -
                  </Button>
                  <Button variant="outline" onClick={() => setTargetSpeed(Math.min(10, targetSpeed + 0.5))}>
                    +
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Current Speed</p>
                        <p className="text-2xl font-bold">{currentSpeed.toFixed(1)}</p>
                      </div>
                      <Speedometer className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Steering Angle</p>
                        <p className="text-2xl font-bold">{steeringAngle.toFixed(2)}</p>
                      </div>
                      <SteeringWheel className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="p-4 bg-gray-100 rounded-lg">
                <h3 className="font-medium mb-2">Controls:</h3>
                <ul className="text-sm space-y-1">
                  <li>↑ / ↓ - Accelerate / Brake</li>
                  <li>← / → - Steer Left / Right</li>
                  <li>Space - Emergency Brake</li>
                </ul>
                <p className="text-xs text-muted-foreground mt-2">
                  Manual controls only work when Manual Control is enabled
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

