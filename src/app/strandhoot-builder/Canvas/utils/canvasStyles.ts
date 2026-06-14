// Canvas styling utilities

interface DropZoneStylesProps {
    readOnly: boolean;
    isDragging: boolean;
    dragSource?: string | null;
    isHovering: boolean;
  }
  
  export function getDropZoneStyles({
    readOnly,
    isDragging,
    dragSource,
    isHovering
  }: DropZoneStylesProps): string {
    if (readOnly) return 'bg-gray-50';
    
    const isDraggingFromToolbox = isDragging && dragSource === 'toolbox';
    const isValidDrop = isHovering;
    
    if (isDraggingFromToolbox) {
      if (isValidDrop) {
        return `
          bg-gradient-to-br from-emerald-50 via-green-100 to-teal-100
          border-4 border-dashed border-emerald-400 
          ring-8 ring-emerald-200 ring-opacity-40
          shadow-2xl transform scale-[1.02]
          relative overflow-hidden
        `;
      } else {
        return `
          bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-100
          border-2 border-dashed border-blue-400 
          ring-4 ring-blue-200 ring-opacity-30
          shadow-lg transform scale-[1.01]
        `;
      }
    }
    
    return 'bg-gray-50';
  }
  
  export const blockTypeIcons: Record<string, string> = {
    welcome: '👋',
    strand: '📚',
    tip: '💡',
    rich: '📝',
    tab: '📝', // Same as rich for now
    evaluation: '📈',
    embed: '🎥',
    iframe: '🌐',
    pdf: '📄',
    mcq: '❓',
    short: '✍️',
    extended: '📖',
    fill: '📝',
    default: '📦'
  };
  
  export function getBlockIcon(blockType: string): string {
    return blockTypeIcons[blockType] || blockTypeIcons.default;
  }
  
  export const colorSchemes = {
    emerald: {
      bg: 'bg-emerald-500',
      text: 'text-emerald-700',
      border: 'border-emerald-400',
      ring: 'ring-emerald-200'
    },
    blue: {
      bg: 'bg-blue-500',
      text: 'text-blue-700', 
      border: 'border-blue-400',
      ring: 'ring-blue-200'
    },
    gray: {
      bg: 'bg-gray-500',
      text: 'text-gray-700',
      border: 'border-gray-400', 
      ring: 'ring-gray-200'
    }
  } as const;