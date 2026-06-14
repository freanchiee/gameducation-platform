import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import MCQBlock from './MCQBlock';
import ShortAnswerBlock from './ShortAnswerBlock';
import ExtendedResponseBlock from './ExtendedResponseBlock';
import FillInTheBlankBlock from './FillInTheBlankBlock';
import TipBlock from './TipBlock';
import EvaluationBoxBlock from './EvaluationBoxBlock';
import MultimediaEmbedBlock from './MultimediaEmbedBlock';

// Define Tab interface with blocks support
interface Tab {
  id: string;
  title: string;
  content: string;
  blocks?: TabBlock[];
}

interface TabBlock {
  id: string;
  type: 'mcq' | 'short' | 'extended' | 'fill' | 'tip' | 'evaluation' | 'embed';
  label?: string;
  icon?: string;
  content: Record<string, unknown>;
  questionId?: string;
}

// Available blocks for tabs
const availableTabBlocks: Omit<TabBlock, 'id'>[] = [
  {
    type: 'mcq',
    label: 'MCQ Block',
    icon: '❓',
    content: {},
  },
  {
    type: 'short',
    label: 'Short Answer Block',
    icon: '✍️',
    content: {},
  },
  {
    type: 'extended',
    label: 'Extended Response Block',
    icon: '📖',
    content: {},
  },
  {
    type: 'fill',
    label: 'Fill in the Blank Block',
    icon: '📝',
    content: {},
  },
  {
    type: 'tip',
    label: 'Tip Block',
    icon: '💡',
    content: {},
  },
  {
    type: 'evaluation',
    label: 'Evaluation Block',
    icon: '📈',
    content: {},
  },
  {
    type: 'embed',
    label: 'Embed Media Block',
    icon: '🎥',
    content: {},
  },
];

// Add Block Button for Tabs
function TabAddBlockButton({ 
  onAddBlock, 
  existingBlockCount 
}: { 
  onAddBlock: (block: TabBlock) => void;
  existingBlockCount: number;
}) {
  const [showMenu, setShowMenu] = useState(false);

  const handleAddBlock = (blockType: Omit<TabBlock, 'id'>) => {
    const newBlock: TabBlock = {
      ...blockType,
      id: uuidv4(),
      questionId: `Q${existingBlockCount + 1}`,
    };
    
    console.log('🎯 Tab: Adding new block:', newBlock);
    onAddBlock(newBlock);
    setShowMenu(false);
  };

  return (
    <div className="relative mb-4">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="w-full py-2 px-3 border-2 border-dashed border-green-300 hover:border-green-500 hover:bg-green-50 transition-colors rounded-md bg-white text-gray-700 text-sm font-medium flex items-center justify-center"
      >
        <span className="mr-2">+</span>
        Add Block to Tab
      </button>

      {showMenu && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-20 z-40"
            onClick={() => setShowMenu(false)}
          />
          
          {/* Block Menu */}
          <div className="absolute top-full left-0 right-0 mt-2 p-3 shadow-lg z-50 bg-white border rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold text-xs text-gray-700">Add block to this tab:</h4>
              <button
                onClick={() => setShowMenu(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <span className="text-sm">×</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-1">
              {availableTabBlocks.map((block, index) => (
                <button
                  key={index}
                  onClick={() => handleAddBlock(block)}
                  className="flex items-center gap-2 p-2 rounded-md border border-gray-200 hover:border-green-400 hover:bg-green-50 transition-colors text-left"
                >
                  <span className="text-sm">{block.icon}</span>
                  <div>
                    <div className="font-medium text-xs text-gray-800">{block.label}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

interface TabBlockProps {
  block: {
    id: string;
    type: string;
    content: {
      tabs?: Tab[];
      activeTab?: string;
    };
  };
  readOnly?: boolean;
  onUpdate?: (updatedContent: any) => void;
}

export default function TabBlock({ block, readOnly = false, onUpdate }: TabBlockProps) {
  const [tabs, setTabs] = useState<Tab[]>(
    block.content?.tabs || [
      { id: 'guided', title: 'Guided Example', content: '', blocks: [] },
      { id: 'your-work', title: 'Your Work', content: '', blocks: [] },
    ]
  );
  
  const [activeTab, setActiveTab] = useState(
    block.content?.activeTab || tabs[0]?.id || 'guided'
  );

  // Use ref to track last sent data to prevent infinite loops
  const lastSentData = useRef<string>('');

  // Update parent when tabs or activeTab changes - with deep comparison
  useEffect(() => {
    const newData = JSON.stringify({ tabs, activeTab });
    
    if (lastSentData.current !== newData) {
      lastSentData.current = newData;
      if (onUpdate) {
        onUpdate({
          tabs,
          activeTab,
        });
      }
    }
  }, [tabs, activeTab, onUpdate]);

  const updateTabTitle = (tabId: string, newTitle: string) => {
    setTabs(prev => prev.map(tab => 
      tab.id === tabId ? { ...tab, title: newTitle } : tab
    ));
  };

  const updateTabContent = (tabId: string, newContent: string) => {
    setTabs(prev => prev.map(tab => 
      tab.id === tabId ? { ...tab, content: newContent } : tab
    ));
  };

  const addBlockToTab = (tabId: string, newBlock: TabBlock) => {
    setTabs(prev => prev.map(tab => 
      tab.id === tabId 
        ? { ...tab, blocks: [...(tab.blocks || []), newBlock] }
        : tab
    ));
  };

  const removeBlockFromTab = (tabId: string, blockId: string) => {
    setTabs(prev => prev.map(tab => 
      tab.id === tabId 
        ? { ...tab, blocks: (tab.blocks || []).filter(block => block.id !== blockId) }
        : tab
    ));
  };

  const addTab = () => {
    const newTab: Tab = {
      id: `tab-${Date.now()}`,
      title: `New Tab ${tabs.length + 1}`,
      content: '',
      blocks: [],
    };
    setTabs(prev => [...prev, newTab]);
    setActiveTab(newTab.id);
  };

  const removeTab = (tabId: string) => {
    if (tabs.length <= 1) return; // Don't remove if it's the last tab
    
    setTabs(prev => prev.filter(tab => tab.id !== tabId));
    
    // If we're removing the active tab, switch to the first remaining tab
    if (activeTab === tabId) {
      const remainingTabs = tabs.filter(tab => tab.id !== tabId);
      setActiveTab(remainingTabs[0]?.id || '');
    }
  };

  const currentTab = tabs.find(tab => tab.id === activeTab);
  const isYourWorkTab = currentTab?.title.toLowerCase().includes('your') || 
                       currentTab?.title.toLowerCase().includes('work');
  const hasBlocks = currentTab?.blocks && currentTab.blocks.length > 0;
  
  // Render individual block in tab
  const renderTabBlock = (tabBlock: TabBlock) => {
    const onConfigure = () => {
      console.log('🛠️ Configure evaluation for tab block:', tabBlock.questionId);
    };

    const blockWrapper = (children: React.ReactNode) => (
      <div key={tabBlock.id} className="relative mb-3 group">
        {!readOnly && (
          <button
            onClick={() => removeBlockFromTab(currentTab!.id, tabBlock.id)}
            className="absolute top-2 right-2 z-10 text-red-500 hover:text-red-700 bg-white rounded-full w-6 h-6 flex items-center justify-center text-xs border border-red-200 hover:border-red-400 transition-colors opacity-0 group-hover:opacity-100"
            title="Remove block"
          >
            ✕
          </button>
        )}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          {children}
        </div>
      </div>
    );

    // Pass readOnly prop to all blocks
    const commonProps = {
      block: tabBlock,
      questionId: tabBlock.questionId,
      readOnly: readOnly,
      onConfigure: readOnly ? undefined : onConfigure,
      onUpdate: readOnly ? undefined : (updatedContent: any) => {
        // Update the specific block in the current tab
        setTabs(prev => prev.map(tab => 
          tab.id === currentTab!.id 
            ? { 
                ...tab, 
                blocks: (tab.blocks || []).map(b => 
                  b.id === tabBlock.id 
                    ? { ...b, content: { ...b.content, ...updatedContent } }
                    : b
                )
              }
            : tab
        ));
      }
    };

    switch (tabBlock.type) {
      case 'mcq':
        return blockWrapper(<MCQBlock {...commonProps} />);
      case 'short':
        return blockWrapper(<ShortAnswerBlock {...commonProps} />);
      case 'extended':
        return blockWrapper(<ExtendedResponseBlock {...commonProps} />);
      case 'fill':
        return blockWrapper(<FillInTheBlankBlock {...commonProps} />);
      case 'tip':
        return blockWrapper(<TipBlock />);
      case 'evaluation':
        return blockWrapper(<EvaluationBoxBlock />);
      case 'embed':
        return blockWrapper(<MultimediaEmbedBlock />);
      default:
        return blockWrapper(
          <div className="p-3 bg-red-50 border border-red-200">
            <span className="text-red-600 text-sm font-semibold">Unknown block type: {tabBlock.type}</span>
          </div>
        );
    }
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Tab Headers */}
      <div className="flex bg-gray-100 border-b">
        {tabs.map((tab) => (
          <div key={tab.id} className="flex items-center group">
            <button
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 font-medium transition-colors ${
                activeTab === tab.id 
                  ? 'bg-white text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {readOnly ? (
                tab.title
              ) : (
                <input
                  type="text"
                  value={tab.title}
                  onChange={(e) => updateTabTitle(tab.id, e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-transparent border-none outline-none text-sm min-w-[80px]"
                />
              )}
            </button>
            
            {!readOnly && tabs.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeTab(tab.id);
                }}
                className="ml-1 mr-2 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
            )}
          </div>
        ))}
        
        {!readOnly && (
          <button
            onClick={addTab}
            className="px-3 py-3 text-gray-500 hover:text-gray-700 text-sm"
          >
            + Add Tab
          </button>
        )}
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {currentTab && (
          <div>
            {/* Add Block Button - Only in edit mode */}
            {!readOnly && (
              <TabAddBlockButton 
                onAddBlock={(newBlock) => addBlockToTab(currentTab.id, newBlock)}
                existingBlockCount={currentTab.blocks?.length || 0}
              />
            )}

            {hasBlocks ? (
              // Show blocks if tab has blocks
              <div className="space-y-3">
                {currentTab.blocks!.map((tabBlock) => (
                  <div key={tabBlock.id}>
                    {renderTabBlock(tabBlock)}
                  </div>
                ))}
              </div>
            ) : (
              // Show rich editor if no blocks
              <div>
                {isYourWorkTab ? (
                  // Rich Editor for "Your Work" tab
                  <div className="space-y-4">
                    {/* Tip Section */}
                    <div className="bg-yellow-50 p-3 rounded border-l-4 border-yellow-400">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">💡</span>
                        <span className="font-semibold text-yellow-800">Tip</span>
                      </div>
                      <p className="text-yellow-800 text-sm">
                        Write your best response using the rich editor below!
                      </p>
                    </div>

                    {/* Rich Text Editor */}
                    <div className="border border-gray-300 rounded-lg overflow-hidden">
                      {/* Toolbar */}
                      <div className="bg-gray-100 px-4 py-2 border-b border-gray-300 flex flex-wrap gap-2 items-center text-sm">
                        <button className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50">
                          <strong>B</strong>
                        </button>
                        <button className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50">
                          <em>I</em>
                        </button>
                        <button className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50">
                          • List
                        </button>
                        <button className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50">
                          H2
                        </button>
                        <button className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50">
                          ➕ Table
                        </button>
                        <button className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50">
                          📷 Image
                        </button>
                        <button className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50">
                          📈 Graph
                        </button>
                      </div>
                      
                      {/* Editor Content */}
                      {readOnly ? (
                        <div 
                          className="p-4 min-h-[200px] prose max-w-none"
                          dangerouslySetInnerHTML={{ __html: currentTab.content }}
                        />
                      ) : (
                        <textarea
                          value={currentTab.content}
                          onChange={(e) => updateTabContent(currentTab.id, e.target.value)}
                          className="w-full p-4 min-h-[200px] border-none outline-none resize-none"
                          placeholder="Start typing your response here..."
                        />
                      )}
                    </div>

                    {/* Live Evaluation */}
                    <div className="bg-gray-50 p-4 rounded border">
                      <h4 className="font-semibold text-sm text-gray-700 mb-2">🔍 Live Evaluation</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p><strong>Level:</strong> 4 / 8</p>
                        <p><strong>Keywords matched:</strong> <span className="bg-green-100 px-1 rounded">magnetic</span></p>
                        <p><strong>Concepts matched:</strong> <span className="bg-blue-100 px-1 rounded">field strength</span></p>
                        <p><strong>Suggestions:</strong> Try adding more scientific terminology and explain the relationship.</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Regular content for other tabs
                  <div>
                    {readOnly ? (
                      <div 
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: currentTab.content }}
                      />
                    ) : (
                      <textarea
                        value={currentTab.content}
                        onChange={(e) => updateTabContent(currentTab.id, e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded min-h-[200px] resize-none"
                        placeholder={`Content for ${currentTab.title}...`}
                      />
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Show message when tab has blocks but is empty in readOnly */}
            {readOnly && hasBlocks && currentTab.blocks!.length === 0 && (
              <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <p className="text-sm">No blocks in this tab yet.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}