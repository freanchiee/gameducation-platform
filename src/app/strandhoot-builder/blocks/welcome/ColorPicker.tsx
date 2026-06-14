'use client';

const COLORS = [
  { name: 'orange', class: 'bg-orange-500', label: 'Orange', accent: 'bg-orange-100' },
  { name: 'blue', class: 'bg-blue-500', label: 'Blue', accent: 'bg-blue-100' },
  { name: 'green', class: 'bg-green-500', label: 'Green', accent: 'bg-green-100' },
  { name: 'purple', class: 'bg-purple-500', label: 'Purple', accent: 'bg-purple-100' },
  { name: 'red', class: 'bg-red-500', label: 'Red', accent: 'bg-red-100' },
  { name: 'teal', class: 'bg-teal-500', label: 'Teal', accent: 'bg-teal-100' },
  { name: 'indigo', class: 'bg-indigo-500', label: 'Indigo', accent: 'bg-indigo-100' },
  { name: 'pink', class: 'bg-pink-500', label: 'Pink', accent: 'bg-pink-100' },
];

interface Props {
  selectedColor: string;
  onColorChange: (color: string) => void;
  readOnly?: boolean;
}

export default function EnhancedColorPicker({
  selectedColor,
  onColorChange,
  readOnly = false,
}: Props) {
  return (
    <div className="flex flex-col items-center space-y-4">
      <h4 className="text-lg font-medium text-gray-700">Theme Color</h4>
      
      <div className="flex flex-wrap justify-center gap-3">
        {COLORS.map((color) => (
          <div key={color.name} className="flex flex-col items-center space-y-2">
            <button
              onClick={() => !readOnly && onColorChange(color.name)}
              className={`w-12 h-12 rounded-full border-4 border-white shadow-lg transition-all duration-200 ${
                color.class
              } ${
                selectedColor === color.name 
                  ? 'ring-4 ring-gray-400 ring-offset-2 scale-110 shadow-xl' 
                  : 'hover:scale-105 hover:shadow-xl'
              } ${readOnly ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              aria-label={`Select ${color.label} theme`}
              title={color.label}
              disabled={readOnly}
            />
            <span className={`text-xs font-medium px-2 py-1 rounded-full transition-all ${
              selectedColor === color.name 
                ? `${color.accent} text-gray-800 font-semibold`
                : 'text-gray-500'
            }`}>
              {color.label}
            </span>
          </div>
        ))}
      </div>

      {/* Preview Section */}
      {selectedColor && (
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600 mb-2">Preview:</p>
          <div className={`inline-block px-4 py-2 rounded-lg text-white font-medium ${
            COLORS.find(c => c.name === selectedColor)?.class
          }`}>
            {COLORS.find(c => c.name === selectedColor)?.label} Theme
          </div>
        </div>
      )}
    </div>
  );
}