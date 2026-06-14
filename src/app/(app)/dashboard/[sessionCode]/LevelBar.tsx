export default function LevelBar({ level = 0 }: { level: number }) {
    if (!level) return <span className="text-gray-400">–</span>;
  
    return (
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full bg-gray-200 rounded h-2 overflow-hidden mb-1">
          <div
            className="h-full bg-green-500 transition-all duration-700"
            style={{ width: `${(level / 8) * 100}%` }}
          />
        </div>
        <span className="text-xs font-medium text-green-700">{level} / 8</span>
      </div>
    );
  }
  