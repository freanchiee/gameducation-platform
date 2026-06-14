// src/app/strandhoot-builder/GoogleSitesToolbox.tsx
'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { Input } from '@/app/components/ui/input';
import { useDragDrop } from './context/DragDropContext';
import { 
  ChevronRight,
  Search

} from 'lucide-react';
import type { BlockType } from './types/strandhoot';

// Define block data with proper BlockType compliance - Only using existing types
const BLOCK_CATEGORIES: Record<string, BlockType[]> = {
  'Foundation': [
    {
      id: 'welcome-template',
      type: 'welcome' as const,
      label: 'Welcome Block',
      icon: '🏠',
      content: {
        title: 'Welcome to My Strandhoot',
        subtitle: 'An interactive learning experience',
        subject: '',
        criteria: '',
        myp_year: '',
        explorerTitle: '',
        timeEstimate: '',
        description: '',
        badges: [],
        experiments: [],
        color: 'orange',
      },
    },
    {
      id: 'strand-template',
      type: 'strand' as const,
      label: 'Strand Page',
      icon: '📚',
      content: {
        title: 'New Strand',
        tabs: [
          { title: 'Guided Example', content: '' },
          { title: 'Your Work', content: '' },
        ],
        droppedBlocks: [],
        strandId: '',
        description: '',
      },
    },
  ],
  'Content': [
    {
      id: 'rich-template',
      type: 'rich' as const,
      label: 'Rich Text Block',
      icon: '📝',
      content: {
        content: '<p>Enter your rich text content here...</p>',
      },
    },
    {
      id: 'tip-template',
      type: 'tip' as const,
      label: 'Tip Block',
      icon: '💡',
      content: {
        tip: 'Add a helpful tip here',
      },
    },
    {
      id: 'evaluation-template',
      type: 'evaluation' as const,
      label: 'Evaluation Box',
      icon: '📊',
      content: {
        level: 0,
        keywords: [],
        concepts: [],
        suggestions: [],
      },
    },
  ],
  'Media': [
    {
      id: 'embed-template',
      type: 'embed' as const,
      label: 'Video Embed',
      icon: '🎥',
      content: {
        url: '',
        title: 'Embedded Video',
        width: '100%',
        height: '400px',
      },
    },
    {
      id: 'iframe-template',
      type: 'iframe' as const,
      label: 'Website Embed',
      icon: '🌐',
      content: {
        url: '',
        title: 'Embedded Website',
        width: '100%',
        height: '500px',
        allowFullscreen: true,
        responsive: true,
      },
    },
    {
      id: 'pdf-template',
      type: 'pdf' as const,
      label: 'PDF Document',
      icon: '📄',
      content: {
        url: '',
        title: 'PDF Document',
        displayMode: 'embedded',
        height: 600,
      },
    },
  ],
  'Questions': [
    {
      id: 'mcq-template',
      type: 'mcq' as const,
      label: 'Multiple Choice',
      icon: '❓',
      content: {
        question: 'Enter your question here',
        questionImage: '',
        options: [
          { text: 'Option A' },
          { text: 'Option B' },
          { text: 'Option C' },
          { text: 'Option D' },
        ],
        correctIndex: 0,
        evaluation: {},
      },
    },
    {
      id: 'short-template',
      type: 'short' as const,
      label: 'Short Answer',
      icon: '✍️',
      content: {
        question: 'Enter your question here',
        placeholder: 'Student response...',
        evaluation: {},
      },
    },
    {
      id: 'extended-template',
      type: 'extended' as const,
      label: 'Extended Response',
      icon: '📖',
      content: {
        question: 'Enter your extended response question here',
        placeholder: 'Student extended response...',
        minWords: 50,
        evaluation: {},
      },
    },
    {
      id: 'fill-template',
      type: 'fill' as const,
      label: 'Fill in the Blank',
      icon: '📋',
      content: {
        question: 'Complete this sentence: The capital of France is ___.',
        answer: '',
        placeholder: 'Student response...',
        evaluation: {},
      },
    },
  ],
};

// ✅ FIXED: Simplified drag block - ONLY HTML5 native drag (no React DnD)
function DraggableBlock({ block }: { block: BlockType }) {
  const ref = useRef<HTMLDivElement>(null);
  const { startDrag, setHTML5DragData, dragState, clearDropTarget } = useDragDrop();
  const [isDragging, setIsDragging] = useState(false);
  const [dragStarted, setDragStarted] = useState(false);
  
  // Create a stable drag item with unique ID for each drag
  const dragItem = useMemo(() => ({
    ...block,
    id: `${block.type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // Always unique
    content: JSON.parse(JSON.stringify(block.content)), // Deep clone
  }), [block]); // Removed 'dragStarted' from dependencies as it's not needed

  // ✅ KEEP: Only HTML5 Drag & Drop with enhanced data handling
  const handleDragStart = (e: React.DragEvent) => {
    console.log('🎯 Toolbox HTML5: Drag started', block.type);
    
    // Re-create drag item for this specific drag
    const freshDragItem = {
      ...block,
      id: `${block.type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      content: JSON.parse(JSON.stringify(block.content)),
    };
    
    setIsDragging(true);
    setDragStarted(prev => !prev); // Force re-creation
    startDrag(freshDragItem, 'toolbox', 'html5');
    setHTML5DragData(freshDragItem);
    
    // Set multiple data formats for maximum compatibility
    const blockData = JSON.stringify(freshDragItem);
    try {
      e.dataTransfer.setData('application/json', blockData);
      e.dataTransfer.setData('text/plain', blockData);
      e.dataTransfer.setData('text/x-block-data', blockData);
      e.dataTransfer.setData('application/x-strandhoot-block', blockData);
    } catch (_error) {
      console.warn('Failed to set some drag data formats:', _error);
    }
    
    e.dataTransfer.effectAllowed = 'copy';
    
    // Create enhanced drag image
    const dragImage = document.createElement('div');
    dragImage.innerHTML = `
      <div style="
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
        border: 2px solid #4f46e5; 
        border-radius: 12px; 
        padding: 12px 16px; 
        font-size: 14px; 
        box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        gap: 10px;
        color: white;
        font-weight: 600;
        min-width: 150px;
        backdrop-filter: blur(10px);
      ">
        <span style="font-size: 20px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">${block.icon}</span>
        <span style="text-shadow: 0 1px 2px rgba(0,0,0,0.3);">${block.label}</span>
      </div>
    `;
    dragImage.style.position = 'absolute';
    dragImage.style.top = '-1000px';
    dragImage.style.left = '-1000px';
    document.body.appendChild(dragImage);
    
    try {
      e.dataTransfer.setDragImage(dragImage.firstElementChild as Element, 75, 25);
    } catch (_error) {
      console.warn('Failed to set drag image:', _error);
    }
    
    // Clean up drag image
    setTimeout(() => {
      try {
        document.body.removeChild(dragImage);
      } catch (_error) {
        // Ignore cleanup errors
      }
    }, 100);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    console.log('🎯 Toolbox HTML5: Drag ended', {
      dropEffect: e.dataTransfer.dropEffect,
      effectAllowed: e.dataTransfer.effectAllowed
    });
    setIsDragging(false);
    
    // Clear drop target after a short delay to allow drop handlers to complete
    setTimeout(() => {
      clearDropTarget();
    }, 100);
  };

  const getDescription = (type: BlockType['type']): string => {
    const descriptions: Partial<Record<BlockType['type'], string>> = {
      welcome: 'Start your Strandhoot with welcome info',
      rich: 'Rich text content with formatting',
      tip: 'Helpful hints and tips',
      strand: 'Interactive learning strand',
      embed: 'Videos and multimedia content',
      evaluation: 'Show assessment results',
      mcq: 'Multiple choice questions',
      short: 'Brief text responses',
      extended: 'Detailed written responses',
      fill: 'Fill-in-the-blank questions',
      iframe: 'Embed external websites and apps',
      pdf: 'Display PDF documents',
    };
    return descriptions[type] || 'Custom block';
  };

  // ✅ FIXED: Only check native drag state (removed React DnD state)
  const isCurrentlyDragging = isDragging;

  return (
    <div
      ref={ref}
      draggable={true}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`group cursor-grab active:cursor-grabbing p-3 rounded-lg border transition-all select-none relative ${
        isCurrentlyDragging 
          ? 'opacity-50 scale-95 ring-2 ring-blue-500 bg-blue-100 border-blue-400 shadow-lg transform rotate-2' 
          : 'border-gray-200 bg-white hover:shadow-md hover:border-blue-300 hover:bg-blue-50 hover:scale-[1.02]'
      }`}
      title={getDescription(block.type)}
    >
      <div className="flex items-center gap-3">
        <div className={`text-lg flex-shrink-0 transition-transform ${isCurrentlyDragging ? 'scale-110' : ''}`}>
          {block.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-gray-900 truncate">{block.label}</div>
          <div className="text-xs text-gray-500 truncate">{block.type}</div>
        </div>
        
        {/* Enhanced drag indicator */}
        <div className={`flex-shrink-0 transition-all duration-200 ${
          isCurrentlyDragging ? 'opacity-100 scale-110' : 'opacity-0 group-hover:opacity-100'
        }`}>
          <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M7 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM7 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM7 14a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM13 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM13 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM13 14a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/>
          </svg>
        </div>
      </div>
      
      {/* Enhanced visual indicator when dragging */}
      {isCurrentlyDragging && (
        <div className="absolute -top-2 -right-2 text-xs font-bold px-2 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg z-10 animate-pulse">
          <span className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></div>
            Dragging
          </span>
        </div>
      )}

      {/* ✅ FIXED: Updated drag type indicator for debugging (removed React DnD reference) */}
      {process.env.NODE_ENV === 'development' && isCurrentlyDragging && (
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs px-2 py-0.5 bg-gray-800 text-white rounded-full font-mono">
          HTML5
        </div>
      )}
    </div>
  );
}

function CategorySection({ 
  category, 
  blocks, 
  isExpanded, 
  onToggle 
}: { 
  category: string;
  blocks: BlockType[];
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-gray-100 last:border-b-0">
      {/* Category Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left group"
      >
        <span className="text-sm font-medium text-gray-900">{category}</span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
            {blocks.length}
          </span>
          <ChevronRight 
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
              isExpanded ? 'rotate-90' : ''
            }`} 
          />
        </div>
      </button>

      {/* Category Content */}
      {isExpanded && (
        <div className="px-2 pb-4 space-y-2 animate-in slide-in-from-top-2 duration-200">
          {blocks.map((block) => (
            <DraggableBlock key={`${block.id}-${block.type}`} block={block} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function GoogleSitesToolbox() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(['Foundation']) // Default to Foundation category expanded
  );
  
  const { dragState } = useDragDrop();

  // Filter categories based on search term
  const filteredCategories = Object.entries(BLOCK_CATEGORIES).reduce((acc, [category, blocks]) => {
    const filteredBlocks = blocks.filter(block =>
      block.label?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      block.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (filteredBlocks.length > 0) {
      acc[category] = filteredBlocks;
    }
    
    return acc;
  }, {} as Record<string, BlockType[]>);

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  // Expand all categories when searching
  useEffect(() => {
    if (searchTerm) {
      setExpandedCategories(new Set(Object.keys(filteredCategories)));
    }
  }, [searchTerm, filteredCategories]);

  const totalBlocks = Object.values(BLOCK_CATEGORIES).flat().length;
  const visibleBlocks = Object.values(filteredCategories).flat().length;

  return (
    <div className="w-80 bg-white border-l border-gray-200 shadow-sm flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-2 mb-3">
          <div className={`w-2 h-2 rounded-full transition-colors ${
            dragState.isDragging ? 'bg-green-500 animate-pulse' : 'bg-blue-500'
          }`}></div>
          <h2 className="text-sm font-semibold text-gray-900">Block Library</h2>
          <span className="text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full font-medium">
            {visibleBlocks}/{totalBlocks}
          </span>
          {dragState.isDragging && (
            <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full font-medium animate-pulse">
              Dragging...
            </span>
          )}
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search blocks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-9 text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className={`p-3 border-b text-xs transition-colors ${
        dragState.isDragging 
          ? 'bg-green-50 border-green-200 text-green-800' 
          : 'bg-blue-50 border-blue-200 text-blue-800'
      }`}>
        <div className="flex items-center gap-2 mb-1">
          <span>{dragState.isDragging ? '🎯' : '🎯'}</span>
          <span className="font-medium">
            {dragState.isDragging ? 'Drop Instructions:' : 'Drag & Drop Instructions:'}
          </span>
        </div>
        <div className={`space-y-1 ${dragState.isDragging ? 'text-green-700' : 'text-blue-700'}`}>
          {dragState.isDragging ? (
            <>
              <div>• Drop on <strong>Canvas</strong> to add to main flow</div>
              <div>• Drop on <strong>Strand tabs</strong> to add components</div>
              <div className="text-xs opacity-75 mt-1">
                Target: {dragState.dropTarget || 'canvas'} 
                {dragState.strandId && ` (${dragState.strandId.slice(-8)})`}
              </div>
            </>
          ) : (
            <>
              <div>• Drop on <strong>Canvas</strong> to add to main flow</div>
              <div>• Drop on <strong>Strand tabs</strong> to add components</div>
            </>
          )}
        </div>
      </div>

      {/* Block Categories */}
      <div className="flex-1 overflow-y-auto">
        {Object.keys(filteredCategories).length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
            <p className="text-sm font-medium">No blocks found</p>
            <p className="text-xs text-gray-400 mt-1">Try a different search term</p>
          </div>
        ) : (
          Object.entries(filteredCategories).map(([category, blocks]) => (
            <CategorySection
              key={category}
              category={category}
              blocks={blocks}
              isExpanded={expandedCategories.has(category)}
              onToggle={() => toggleCategory(category)}
            />
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <div className="w-4 h-4 border border-dashed border-gray-400 rounded flex items-center justify-center">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          </div>
          <span>Drag blocks to canvas or strand tabs</span>
        </div>
        
        {/* Quick actions */}
        <div className="flex gap-1 mb-2">
          <button
            onClick={() => setExpandedCategories(new Set(Object.keys(BLOCK_CATEGORIES)))}
            className="flex-1 text-xs py-1 px-2 bg-gray-200 hover:bg-gray-300 rounded text-gray-700 transition-colors font-medium"
          >
            Expand All
          </button>
          <button
            onClick={() => setExpandedCategories(new Set())}
            className="flex-1 text-xs py-1 px-2 bg-gray-200 hover:bg-gray-300 rounded text-gray-700 transition-colors font-medium"
          >
            Collapse All
          </button>
        </div>
        
        {/* Status indicator */}
        {dragState.isDragging && (
          <div className="text-xs text-center p-2 bg-green-100 text-green-700 rounded-md font-medium">
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
              <span>Drag active - {dragState.draggedBlock?.type}</span>
            </div>
            <div className="text-xs opacity-75 mt-1">
              Source: {dragState.dragSource} | Type: {dragState.dragType}
            </div>
          </div>
        )}
        
        {/* ✅ FIXED: Updated debug info (removed React DnD reference) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-2 text-xs text-gray-400 font-mono space-y-1">
            <div>Drag System: HTML5 Native</div>
            <div>Block Types: {Object.keys(BLOCK_CATEGORIES).join(', ')}</div>
            {dragState.isDragging && (
              <div className="text-green-600">
                Active: {dragState.draggedBlock?.type} → {dragState.dropTarget || 'canvas'}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}