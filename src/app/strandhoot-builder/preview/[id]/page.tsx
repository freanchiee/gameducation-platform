'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';
import { toast } from 'sonner';

// Import your block components
import WelcomeBlock from '@/app/strandhoot-builder/blocks/WelcomeBlock';
import StrandPageBlock from '@/app/strandhoot-builder/blocks/StrandPageBlock';
import TipBlock from '@/app/strandhoot-builder/blocks/TipBlock';
import MCQBlock from '@/app/strandhoot-builder/blocks/MCQBlock';
import ShortAnswerBlock from '@/app/strandhoot-builder/blocks/ShortAnswerBlock';
import ExtendedResponseBlock from '@/app/strandhoot-builder/blocks/ExtendedResponseBlock';
import RichEditorBlock from '@/app/strandhoot-builder/blocks/RichEditorBlock';
import EvaluationBoxBlock from '@/app/strandhoot-builder/blocks/EvaluationBoxBlock';
import MultimediaEmbedBlock from '@/app/strandhoot-builder/blocks/MultimediaEmbedBlock';

import type { BlockType } from '@/app/strandhoot-builder/types/strandhoot';

interface StrandhootData {
  id: string;
  title: string;
  blocks: BlockType[];
  description?: string;
  subject?: string;
  criteria?: string;
  myp_year?: string;
}

interface PageParams {
  id: string;
}

interface PageProps {
  params: Promise<PageParams>;
}

// Create a single Supabase client instance to avoid multiple instances warning
const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  }
);

export default function DebugPreviewPage({ params }: PageProps) {
  const router = useRouter();
  
  // ✅ Use React.use() to unwrap the params Promise
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  
  const [strandhootData, setStrandhootData] = useState<StrandhootData | null>(null);
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<any>(null);

  useEffect(() => {
    console.log('🚀 DEBUG PREVIEW - Component mounted');
    console.log('🚀 ID from params:', id);
  }, [id]);

  useEffect(() => {
    async function loadStrandhoot() {
      console.log('📥 loadStrandhoot called with ID:', id);
      
      if (!id) {
        console.log('❌ No ID provided');
        setError('No strandhoot ID provided');
        setLoading(false);
        return;
      }

      console.log('🔍 Starting strandhoot load process...');

      try {
        setLoading(true);
        setError(null);

        let foundData = null;
        const debugSteps: string[] = [];

        // 1. Handle temporary IDs (from localStorage)
        if (id.startsWith('temp-')) {
          console.log('🔧 Detected temporary ID, checking localStorage...');
          debugSteps.push('Detected temporary ID');
          
          const tempKey = `strandhoot-temp-${id}`;
          console.log('🔧 Looking for key:', tempKey);
          
          try {
            const tempData = localStorage.getItem(tempKey);
            
            if (tempData) {
              console.log('✅ Found temporary data:', tempData.substring(0, 100) + '...');
              debugSteps.push('Found temporary data in localStorage');
              foundData = JSON.parse(tempData);
              console.log('✅ Parsed temporary strandhoot:', foundData);
              debugSteps.push('Successfully parsed temporary data');
            } else {
              console.log('❌ No temporary data found');
              debugSteps.push('No temporary data found');
            }
          } catch (e) {
            console.error('❌ Failed to access localStorage:', e);
            debugSteps.push('Failed to access localStorage: ' + (e instanceof Error ? e.message : String(e)));
          }
        } else {
          // 2. Load from Supabase for regular IDs
          console.log('📊 Regular ID detected, loading from Supabase...');
          debugSteps.push('Regular ID - querying Supabase');
          
          console.log('📊 Making Supabase query for ID:', id);
          
          const { data, error: fetchError } = await supabaseClient
            .from('strandhoot_templates')
            .select('*')
            .eq('id', id)
            .single();

          console.log('📊 Supabase query response:', { data, error: fetchError });

          if (fetchError) {
            console.error('❌ Supabase fetch error:', fetchError);
            debugSteps.push('Supabase error: ' + fetchError.message);
            
            if (fetchError.code === 'PGRST116') {
              setError('Strandhoot not found in database.');
            } else {
              setError(`Failed to load from database: ${fetchError.message}`);
            }
            setDebugInfo({ steps: debugSteps, supabaseError: fetchError });
            setLoading(false);
            return;
          }

          console.log('✅ Loaded strandhoot from Supabase:', data);
          debugSteps.push('Successfully loaded from Supabase');
          foundData = data;
        }

        // 3. Fallback: Try other localStorage keys
        if (!foundData) {
          console.log('🔄 No data found yet, trying fallback keys...');
          debugSteps.push('Trying fallback localStorage keys');
          
          const possibleKeys = [
            `strandhoot-preview-${id}`,
            `preview-${id}`,
            'strandhoot-preview',
            id
          ];
          
          for (const key of possibleKeys) {
            console.log(`🔍 Trying key: ${key}`);
            try {
              const data = localStorage.getItem(key);
              if (data) {
                console.log(`✅ Found data with key '${key}':`, data.substring(0, 100) + '...');
                debugSteps.push(`Found data with key: ${key}`);
                foundData = JSON.parse(data);
                console.log(`✅ Parsed data from key '${key}':`, foundData);
                debugSteps.push(`Successfully parsed data from key: ${key}`);
                break;
              } else {
                console.log(`❌ No data found for key: ${key}`);
              }
            } catch (e) {
              console.error(`❌ Failed to process key '${key}':`, e);
              debugSteps.push(`Failed to process key ${key}: ${e instanceof Error ? e.message : String(e)}`);
            }
          }
        }

        if (foundData) {
          console.log('🎉 Data found! Processing...');
          console.log('🔍 Raw foundData:', foundData);
          
          debugSteps.push('Found data, processing...');

          // Extract blocks with multiple fallbacks
          const extractedBlocks = foundData.strands || foundData.context?.blocks || foundData.blocks || [];
          
          console.log('📦 Extracted blocks:', extractedBlocks);
          console.log('📦 Blocks type:', typeof extractedBlocks);
          console.log('📦 Is blocks array?', Array.isArray(extractedBlocks));
          console.log('📦 Blocks length:', extractedBlocks?.length);

          if (Array.isArray(extractedBlocks) && extractedBlocks.length > 0) {
            console.log('📦 First block:', extractedBlocks[0]);
            debugSteps.push(`Found ${extractedBlocks.length} blocks`);
          } else {
            console.log('⚠️ No blocks found or not an array');
            debugSteps.push('No blocks found or invalid format');
          }

          // Transform the data structure to what we need
          const strandhootData: StrandhootData = {
            id: foundData.id || id,
            title: foundData.title || 'Untitled Strandhoot',
            description: foundData.description || '',
            subject: foundData.subject,
            criteria: foundData.criteria,
            myp_year: foundData.myp_year,
            blocks: extractedBlocks,
          };
          
          console.log('✅ Final strandhoot data:', strandhootData);
          debugSteps.push('Successfully transformed data');
          
          setStrandhootData(strandhootData);
          setDebugInfo({ 
            steps: debugSteps, 
            rawData: foundData, 
            finalData: strandhootData,
            blocksFound: extractedBlocks.length
          });
        } else {
          console.log('❌ No strandhoot data found anywhere');
          debugSteps.push('No data found in any source');
          setError('Strandhoot not found. Please save your strandhoot first before previewing.');
          setDebugInfo({ steps: debugSteps });
        }

      } catch (err) {
        console.error('💥 Error loading strandhoot:', err);
        setError('An unexpected error occurred while loading the strandhoot.');
        setDebugInfo({ error: err, steps: debugInfo?.steps || [] });
      } finally {
        console.log('🏁 Loading complete, setting loading to false');
        setLoading(false);
      }
    }

    if (id) {
      console.log('✅ Conditions met, starting load...');
      loadStrandhoot();
    } else {
      console.log('⏳ Waiting for ID...');
      setLoading(false);
      setError('No ID provided');
    }
  }, [id]);

  const handleNext = () => {
    console.log('➡️ Next button clicked');
    if (strandhootData && currentBlockIndex < strandhootData.blocks.length - 1) {
      setCurrentBlockIndex(prev => {
        const newIndex = prev + 1;
        console.log('➡️ Moving to block index:', newIndex);
        return newIndex;
      });
    }
  };

  const handlePrevious = () => {
    console.log('⬅️ Previous button clicked');
    if (currentBlockIndex > 0) {
      setCurrentBlockIndex(prev => {
        const newIndex = prev - 1;
        console.log('⬅️ Moving to block index:', newIndex);
        return newIndex;
      });
    }
  };

  const handleBackToBuilder = () => {
    console.log('🏠 Back to builder clicked');
    if (id.startsWith('temp-')) {
      router.push('/strandhoot-builder');
    } else {
      router.push(`/strandhoot-builder?edit=${id}`);
    }
  };

  const renderBlock = (block: BlockType, index: number) => {
    console.log('🎨 Rendering block:', { type: block.type, index, block });
    
    const commonProps = {
      block,
      readOnly: true,
      onUpdate: () => {
        console.log('📝 Block update called (no-op in preview)');
      },
      onDelete: () => {
        console.log('🗑️ Block delete called (no-op in preview)');
      },
    };

    const questionId = block.questionId || `Q${index + 1}`;

    try {
      switch (block.type) {
        case 'welcome':
          console.log('🎨 Rendering WelcomeBlock');
          return (
            <WelcomeBlock
              {...commonProps}
              onStructureConfirmed={() => console.log('📋 Structure confirmed')}
              onGenerateSkeleton={() => console.log('🦴 Generate skeleton')}
            />
          );
        case 'strand':
          console.log('🎨 Rendering StrandPageBlock');
          return (
            <StrandPageBlock
              {...commonProps}
              strandIndex={index}
              totalStrands={strandhootData?.blocks.filter(b => b.type === 'strand').length || 1}
              allStrandBlocks={strandhootData?.blocks || []}
              badges={[]}
              onNext={handleNext}
              onFinish={() => {
                console.log('🎉 Strandhoot finished');
                toast.success('Strandhoot completed!');
              }}
            />
          );
        case 'tip':
          console.log('🎨 Rendering TipBlock');
          return <TipBlock />;
        case 'mcq':
          console.log('🎨 Rendering MCQBlock');
          return (
            <MCQBlock
              {...commonProps}
              questionId={questionId}
              onConfigure={() => console.log('⚙️ MCQ configure')}
            />
          );
        case 'short':
          console.log('🎨 Rendering ShortAnswerBlock');
          return (
            <ShortAnswerBlock
              {...commonProps}
              questionId={questionId}
              onConfigure={() => console.log('⚙️ Short answer configure')}
            />
          );
        case 'extended':
          console.log('🎨 Rendering ExtendedResponseBlock');
          return (
            <ExtendedResponseBlock
              {...commonProps}
              questionId={questionId}
              onConfigure={() => console.log('⚙️ Extended response configure')}
            />
          );
        case 'rich':
          console.log('🎨 Rendering RichEditorBlock');
          return (
            <RichEditorBlock
              {...commonProps}
              questionId={questionId}
              onConfigure={() => console.log('⚙️ Rich editor configure')}
            />
          );
        case 'evaluation':
          console.log('🎨 Rendering EvaluationBoxBlock');
          return <EvaluationBoxBlock />;
        case 'embed':
          console.log('🎨 Rendering MultimediaEmbedBlock');
          return <MultimediaEmbedBlock />;
        default:
          console.log('🎨 Rendering unknown block type:', block.type);
          return (
            <Card className="p-4 border-2 border-dashed border-gray-300">
              <div className="text-center py-4">
                <p className="text-gray-500 font-medium">🧩 {block.type.toUpperCase()} Block</p>
                <p className="text-sm text-gray-400 mt-1">
                  {block.label || 'Untitled Block'}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Preview not implemented for this block type
                </p>
              </div>
            </Card>
          );
      }
    } catch (error) {
      console.error(`❌ Error rendering block ${block.type}:`, error);
      return (
        <Card className="p-4 border-red-300 bg-red-50">
          <div className="text-center py-4">
            <p className="text-red-600 font-medium">⚠️ Render Error</p>
            <p className="text-sm text-red-500 mt-1">
              Failed to render {block.type} block
            </p>
            <p className="text-xs text-red-400 mt-1">
              Check console for details
            </p>
          </div>
        </Card>
      );
    }
  };

  if (loading) {
    console.log('⏳ Showing loading state...');
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading preview...</p>
          <p className="text-gray-400 text-sm">ID: {id}</p>
        </div>
      </div>
    );
  }

  if (error || !strandhootData) {
    console.log('❌ Showing error state...', { error, strandhootData });
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 max-w-lg w-full mx-4">
          <div className="text-center">
            <div className="text-red-500 text-4xl mb-4">⚠️</div>
            <h1 className="text-xl font-bold mb-2">Preview Not Available</h1>
            <p className="text-gray-600 mb-4">
              {error || 'Unable to load strandhoot data'}
            </p>
            <p className="text-gray-400 text-sm mb-4">ID: {id}</p>
            
            {/* Debug Info */}
            {debugInfo && (
              <details className="text-left mb-4 bg-gray-50 p-3 rounded">
                <summary className="cursor-pointer text-sm font-medium">🐛 Debug Info</summary>
                <div className="mt-2 text-xs space-y-1">
                  <div><strong>Steps:</strong></div>
                  {debugInfo.steps?.map((step: string, i: number) => (
                    <div key={i} className="pl-2">• {step}</div>
                  ))}
                  
                  {debugInfo.blocksFound !== undefined && (
                    <div className="mt-2"><strong>Blocks Found:</strong> {debugInfo.blocksFound}</div>
                  )}
                  
                  {debugInfo.supabaseError && (
                    <div className="mt-2">
                      <strong>Supabase Error:</strong> {debugInfo.supabaseError.message}
                    </div>
                  )}
                  
                  <div className="mt-2">
                    <strong>Type:</strong> {id.startsWith('temp-') ? 'Temporary' : 'Database'}
                  </div>
                </div>
              </details>
            )}
            
            <Button onClick={handleBackToBuilder} variant="outline">
              <ArrowLeft size={16} className="mr-2" />
              Back to Builder
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const currentBlock = strandhootData.blocks[currentBlockIndex];
  const isFirst = currentBlockIndex === 0;
  const isLast = currentBlockIndex === strandhootData.blocks.length - 1;

  console.log('🎨 Rendering main UI...', { 
    currentBlockIndex, 
    totalBlocks: strandhootData.blocks.length,
    currentBlock: currentBlock?.type 
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                📋 {strandhootData.title}
              </h1>
              <p className="text-sm text-gray-500">
                Debug Preview • Block {currentBlockIndex + 1} of {strandhootData.blocks.length}
              </p>
            </div>
            <Button 
              onClick={handleBackToBuilder} 
              variant="ghost" 
              size="sm"
              className="text-gray-600"
            >
              <Home size={16} className="mr-2" />
              Close Preview
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{currentBlockIndex + 1} / {strandhootData.blocks.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${((currentBlockIndex + 1) / strandhootData.blocks.length) * 100}%` 
              }}
            />
          </div>
        </div>

        {/* Debug Panel */}
        {debugInfo && (
          <Card className="p-4 mb-6 bg-yellow-50 border-yellow-200">
            <details>
              <summary className="cursor-pointer text-sm font-medium text-yellow-800">
                🐛 Debug Panel (Click to expand)
              </summary>
              <div className="mt-2 text-xs text-yellow-700 space-y-1">
                <div><strong>Blocks loaded:</strong> {debugInfo.blocksFound || 0}</div>
                <div><strong>Current block:</strong> {currentBlock?.type || 'None'}</div>
                <div><strong>Data source:</strong> {id.startsWith('temp-') ? 'LocalStorage' : 'Supabase'}</div>
              </div>
            </details>
          </Card>
        )}

        {/* Current Block */}
        <div className="mb-6">
          {currentBlock ? renderBlock(currentBlock, currentBlockIndex) : (
            <Card className="p-8 text-center">
              <p className="text-gray-500">No block to display</p>
              <p className="text-xs text-gray-400 mt-2">
                Block index: {currentBlockIndex} | Total blocks: {strandhootData.blocks.length}
              </p>
            </Card>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button 
            onClick={handlePrevious}
            disabled={isFirst}
            variant="outline"
            className="gap-2"
          >
            <ArrowLeft size={16} />
            Previous
          </Button>

          <div className="text-sm text-gray-500 text-center">
            <div>Block {currentBlockIndex + 1}: {currentBlock?.label || currentBlock?.type}</div>
            <div className="text-xs text-gray-400 mt-1">ID: {id}</div>
          </div>

          <Button 
            onClick={handleNext}
            disabled={isLast}
            className="gap-2"
          >
            Next
            <ArrowRight size={16} />
          </Button>
        </div>

        {isLast && (
          <div className="mt-6 text-center">
            <Card className="p-6 bg-green-50 border-green-200">
              <div className="text-green-600 text-3xl mb-2">🎉</div>
              <h3 className="text-lg font-semibold text-green-800 mb-1">
                Preview Complete!
              </h3>
              <p className="text-green-700 text-sm">
                You've reached the end of this strandhoot.
              </p>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}