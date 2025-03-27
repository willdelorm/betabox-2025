import { useState, useEffect, useRef } from "react";
import Nav from "../components/Nav";

interface Climb {
  grade: number;
  timestamp: number;
}

function RecordWorkout() {
  const [climbs, setClimbs] = useState<Climb[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Start the timer when the component mounts
  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  // Update the elapsed time every second
  useEffect(() => {
    if (startTime && !isPaused) {
      timerRef.current = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [startTime, isPaused]);

  // Helper function to format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Add a new climb
  const addClimb = (grade: number) => {
    setClimbs([...climbs, { grade, timestamp: Date.now() }]);
  };

  // Undo the last climb
  const undoClimb = () => {
    setClimbs(climbs.slice(0, -1));
  };

  // Pause/Resume the workout
  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  // End the workout
  const endWorkout = () => {
    // TODO: Implement workout saving logic
    console.log("Workout ended:", climbs);
    // Reset the state
    setStartTime(null);
    setElapsedTime(0);
    setClimbs([]);
    setIsPaused(false);
  };

  // Calculate total V points
  const totalVPoints = climbs.reduce((sum, climb) => sum + climb.grade, 0);

  // Calculate average V point
  const averageVPoint =
    climbs.length > 0 ? (totalVPoints / climbs.length).toFixed(1) : "0.0";

  return (
    <>
      <Nav />
      <main className="flex-1 w-[95%] flex flex-col overflow-hidden">
        {/* Workout Summary */}
        <section className="bg-gray-100 p-3 mb-6">
          <h2 className="sr-only">Workout Summary</h2>
          <div className="mb-3">
            <h3 className="font-semibold">Time Elapsed</h3>{" "}
            <p className="text-xl">{formatTime(elapsedTime)}</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex gap-1">
              <h3 className="font-semibold">Climbs</h3>
              <p className="">{climbs.length}</p>
            </div>
            <div className="flex gap-1">
              <h3 className="font-semibold">Vsum</h3>
              <p className="">{totalVPoints}</p>
            </div>
            <div className="flex gap-1">
              <h3 className="font-semibold">AvgV</h3>
              <p className="">{averageVPoint}</p>
            </div>
          </div>
        </section>

        {/* Workout Log */}
        <section className="flex-grow overflow-y-auto">
          <h2 className="text-lg font-semibold mb-2">Workout Log</h2>
          {climbs.length ? (
            <ul className="space-y-2">
              {climbs.map((climb, index) => (
                <li key={index} className="border-b pb-2">
                  V{climb.grade} -{" "}
                  {new Date(climb.timestamp).toLocaleTimeString()}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">Nothing recorded yet.</p>
          )}
        </section>

        {/* Sticky Footer */}
        <footer className="sticky bottom-0 bg-white p-3 pb-6 border-t">
          {/* Difficulty Grid */}
          <section className="mb-6">
            <h2 className="sr-only">Climb Difficulty</h2>
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: 10 }, (_, i) => i).map((grade) => (
                <button
                  key={grade}
                  className="bg-primary hover:brightness-110 font-medium px-3 py-2 rounded"
                  onClick={() => addClimb(grade)}>
                  V{grade}
                </button>
              ))}
            </div>
          </section>

          {/* Action Buttons */}
          <section className="flex justify-center space-x-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              onClick={togglePause}>
              {isPaused ? "Resume" : "Pause"}
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              onClick={endWorkout}>
              End
            </button>
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
              onClick={undoClimb}
              disabled={climbs.length === 0}>
              Undo
            </button>
          </section>
        </footer>
      </main>
    </>
  );
}

export default RecordWorkout;
