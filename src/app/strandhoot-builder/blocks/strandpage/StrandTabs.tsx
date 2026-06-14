// src/app/strandhoot-builder/blocks/strandpage/StrandTabs.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { X, Plus, Edit3, BookOpen, Beaker, FileText } from 'lucide-react';
import { useState } from 'react';
import StrandRichEditor from '../StrandRichEditor';

interface Tab {
  id: string;
  title: string;
  content: string;
  droppedBlocks?: any[]; // BlockType[] but avoiding circular imports
}

interface Props {
  tabs: Tab[];
  activeTabId: string;
  onTabChange: (tabId: string) => void;
  onTitleChange: (tabId: string, newTitle: string) => void;
  onContentChange: (tabId: string, newContent: string) => void;
  onAddTab: () => void;
  onRemoveTab: (tabId: string) => void;
  readOnly?: boolean;
}

export default function StrandTabs({
  tabs,
  activeTabId,
  onTabChange,
  onTitleChange,
  onContentChange,
  onAddTab,
  onRemoveTab,
  readOnly = false,
}: Props) {
  const [editingTabId, setEditingTabId] = useState<string | null>(null);
  const activeTab = tabs.find(tab => tab.id === activeTabId);

  const getTabIcon = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('experiment') || lowerTitle.includes('work')) {
      return <Beaker className="w-4 h-4" />;
    }
    if (lowerTitle.includes('guide') || lowerTitle.includes('example')) {
      return <BookOpen className="w-4 h-4" />;
    }
    return <FileText className="w-4 h-4" />;
  };

  const handleTabTitleEdit = (tabId: string) => {
    if (!readOnly) {
      setEditingTabId(tabId);
    }
  };

  const handleTabTitleSave = () => {
    setEditingTabId(null);
  };

  const handleTabTitleKeyDown = (e: React.KeyboardEvent, tabId: string) => {
    if (e.key === 'Enter') {
      handleTabTitleSave();
    }
    if (e.key === 'Escape') {
      setEditingTabId(null);
    }
  };

  return (
    <div className="strand-tabs">
      {/* Tab Navigation */}
      <div className="flex items-center border-b border-gray-200 mb-6">
        <div className="flex flex-1 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300">
          {tabs.map((tab) => (
            <div key={tab.id} className="relative flex items-center flex-shrink-0 group">
              <div
                className={`flex items-center px-4 py-3 text-sm font-medium border-b-2 transition-all cursor-pointer min-w-0 ${
                  activeTabId === tab.id
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => onTabChange(tab.id)}
              >
                {/* Tab Icon */}
                <span className="mr-2 flex-shrink-0">
                  {getTabIcon(tab.title)}
                </span>
                
                {/* Tab Title */}
                <div className="flex items-center min-w-0">
                  {editingTabId === tab.id && !readOnly ? (
                    <Input
                      value={tab.title}
                      onChange={(e) => onTitleChange(tab.id, e.target.value)}
                      onBlur={handleTabTitleSave}
                      onKeyDown={(e) => handleTabTitleKeyDown(e, tab.id)}
                      className="w-32 h-6 text-sm border-blue-300 focus:border-blue-500"
                      autoFocus
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <span className="truncate max-w-[120px]" title={tab.title}>
                      {tab.title}
                    </span>
                  )}
                  
                  {!readOnly && editingTabId !== tab.id && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTabTitleEdit(tab.id);
                      }}
                      className="ml-1 p-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Edit3 size={12} />
                    </Button>
                  )}
                </div>

                {/* Component Count Badge */}
                {tab.droppedBlocks && tab.droppedBlocks.length > 0 && (
                  <span className="ml-2 px-1.5 py-0.5 bg-gray-200 text-gray-600 rounded-full text-xs font-medium">
                    {tab.droppedBlocks.length}
                  </span>
                )}
              </div>

              {/* Remove Tab Button */}
              {!readOnly && tabs.length > 1 && (
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveTab(tab.id);
                  }}
                  variant="ghost"
                  size="sm"
                  className="ml-1 p-1 h-6 w-6 text-red-500 hover:text-red-700 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove tab"
                >
                  <X size={12} />
                </Button>
              )}
            </div>
          ))}
        </div>
        
        {/* Add Tab Button */}
        {!readOnly && (
          <Button
            onClick={onAddTab}
            variant="ghost"
            size="sm"
            className="ml-4 text-blue-600 hover:text-blue-800 hover:bg-blue-50 flex-shrink-0"
          >
            <Plus size={16} className="mr-1" />
            Add Tab
          </Button>
        )}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab && (
          <motion.div
            key={activeTab.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="tab-content"
          >
            {/* Rich Text Content Section */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <FileText size={20} className="mr-2 text-green-600" />
                  <h4 className="font-semibold text-green-800">Content Editor</h4>
                </div>
                <div className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  {activeTab.content.length} characters
                </div>
              </div>
              
              <p className="text-sm text-green-700 mb-4">
                Add rich text content, instructions, examples, or explanations for this tab.
              </p>

              {readOnly ? (
                <div 
                  className="prose max-w-none text-sm bg-white border rounded-lg p-4"
                  dangerouslySetInnerHTML={{ __html: activeTab.content }} 
                />
              ) : (
                <div className="bg-white border rounded-lg overflow-hidden">
                  <StrandRichEditor
                    initialContent={activeTab.content}
                    onChange={(content) => onContentChange(activeTab.id, content)}
                    currentStudentId="demo-student"
                    strandKey={`tab-${activeTab.id}`}
                    experimentChoice="distance"
                    readOnly={readOnly}
                  />
                </div>
              )}
            </div>

            {/* Tab Statistics */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="text-sm font-medium text-blue-800">Content</div>
                <div className="text-2xl font-bold text-blue-600">
                  {activeTab.content.length > 0 ? '✓' : '○'}
                </div>
                <div className="text-xs text-blue-600">
                  {activeTab.content.length} chars
                </div>
              </div>
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                <div className="text-sm font-medium text-purple-800">Components</div>
                <div className="text-2xl font-bold text-purple-600">
                  {activeTab.droppedBlocks?.length || 0}
                </div>
                <div className="text-xs text-purple-600">
                  Interactive blocks
                </div>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="text-sm font-medium text-green-800">Status</div>
                <div className="text-2xl font-bold text-green-600">
                  {activeTab.content.length > 50 && (activeTab.droppedBlocks?.length || 0) > 0 ? '🎉' : '📝'}
                </div>
                <div className="text-xs text-green-600">
                  {activeTab.content.length > 50 && (activeTab.droppedBlocks?.length || 0) > 0 ? 'Complete' : 'In Progress'}
                </div>
              </div>
            </div>

            {/* Empty State for Content */}
            {!activeTab.content && !readOnly && (
              <div className="text-center py-8 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="text-3xl mb-3">📝</div>
                <p className="font-medium text-gray-700">Add content to this tab</p>
                <p className="text-sm text-gray-500 mt-1">
                  Use the rich text editor above to add instructions, examples, or explanations
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}