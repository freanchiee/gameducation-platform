// DashboardModal.tsx - Complete version with comprehensive debugging
'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card } from '@/app/components/ui/card';
import { 
  Edit3, 
  Eye, 
  Copy, 
  Trash2, 
  Search, 
  FileText, 
  Globe, 
  Lock,
  Calendar,
  BookOpen,
  Filter,
  RefreshCw,
  Loader2,
  Plus,
  Bug,
  Database,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/utils/supabase';
import { toast } from 'sonner';

// Types based on your actual schema
interface StrandhootTemplate {
  id: string;
  title: string;
  description: string | null;
  criteria: string | null;
  subject: string | null;
  myp_year: number | null;
  context: string | null; // JSON string
  simulation_link: string | null;
  research_material_link: string | null;
  strands: any; // JSONB
  created_by: string; // UUID
  created_at: string;
  updated_at: string;
  is_public: boolean | null;
  tags: string[] | null;
  version: number | null;
  thumbnail_url: string | null;
  creator_name: string | null;
}

interface DashboardModalProps {
  open: boolean;
  onClose: () => void;
  onEditStrandhoot: (id: string) => void;
  onCreateNew?: () => void;
  userId: string;
}

interface DashboardStats {
  total: number;
  drafts: number;
  published: number;
  public: number;
}

interface DashboardFilters {
  search: string;
  status: 'all' | 'drafts' | 'published';
  sortBy: 'updated' | 'created' | 'title';
}

interface DebugInfo {
  step: string;
  timestamp: string;
  data?: any;
  error?: any;
  success?: boolean;
}

export function DashboardModal({ 
  open, 
  onClose, 
  onEditStrandhoot, 
  onCreateNew,
  userId 
}: DashboardModalProps) {
  // State management
  const [strandhoots, setStrandhoots] = useState<StrandhootTemplate[]>([]);
  const [filteredStrandhoots, setFilteredStrandhoots] = useState<StrandhootTemplate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    total: 0,
    drafts: 0,
    published: 0,
    public: 0
  });
  const [filters, setFilters] = useState<DashboardFilters>({
    search: '',
    status: 'all',
    sortBy: 'updated'
  });

  // 🐛 NEW: Debug state
  const [debugMode, setDebugMode] = useState(false);
  const [debugLogs, setDebugLogs] = useState<DebugInfo[]>([]);
  const [showDebugPanel, setShowDebugPanel] = useState(false);

  // 🐛 Enhanced debug logging
  const log = (message: string, data?: any) => {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry: DebugInfo = {
      step: message,
      timestamp,
      data: data || null,
      success: true
    };
    
    console.log(`🗂️ [DASHBOARD] ${message}`, data || '');
    setDebugLogs(prev => [...prev.slice(-20), logEntry]); // Keep last 20 logs
  };

  const logError = (message: string, error?: any) => {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry: DebugInfo = {
      step: message,
      timestamp,
      error: error || null,
      success: false
    };
    
    console.error(`❌ [DASHBOARD] ${message}`, error || '');
    setDebugLogs(prev => [...prev.slice(-20), logEntry]);
  };

  const logSuccess = (message: string, data?: any) => {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry: DebugInfo = {
      step: message,
      timestamp,
      data: data || null,
      success: true
    };
    
    console.log(`✅ [DASHBOARD] ${message}`, data || '');
    setDebugLogs(prev => [...prev.slice(-20), logEntry]);
  };

  // 🐛 NEW: Clear debug logs
  const clearDebugLogs = () => {
    setDebugLogs([]);
    log('Debug logs cleared');
  };

  // Validate UUID format
  const isValidUUID = (uuid: string): boolean => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  };

  // Generate a proper UUID for development/testing
  const ensureValidUserId = (inputUserId: string): string => {
    if (isValidUUID(inputUserId)) {
      return inputUserId;
    }
    
    log('Converting non-UUID userId to valid UUID', { original: inputUserId });
    
    // Simple hash to UUID conversion for development
    let hash = 0;
    for (let i = 0; i < inputUserId.length; i++) {
      const char = inputUserId.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    
    // Convert hash to a UUID-like format
    const hexHash = Math.abs(hash).toString(16).padStart(8, '0');
    const devUuid = `${hexHash.slice(0, 8)}-${hexHash.slice(0, 4)}-4${hexHash.slice(1, 4)}-8${hexHash.slice(0, 3)}-${hexHash.slice(0, 12).padEnd(12, '0')}`;
    
    log('Generated development UUID', { devUuid });
    return devUuid;
  };

  // 🐛 NEW: Enhanced connection test
  const testConnection = async () => {
    log('🧪 Starting connection test');
    setDebugMode(true);
    
    try {
      // Test 1: Basic Supabase client check
      log('Test 1: Checking Supabase client');
      if (!supabase) {
        logError('Supabase client is null/undefined');
        return false;
      }
      logSuccess('Supabase client exists');

      // Test 2: Simple count query
      log('Test 2: Testing count query');
      const { count: totalCount, error: countError } = await supabase
        .from('strandhoot_templates')
        .select('*', { count: 'exact', head: true });

      if (countError) {
        logError('Count query failed', countError);
        return false;
      }
      logSuccess('Count query successful', { totalCount });

      // Test 3: Sample data query
      log('Test 3: Testing sample data query');
      const { data: sampleData, error: sampleError } = await supabase
        .from('strandhoot_templates')
        .select('id, title, created_by, creator_name, is_public, created_at')
        .limit(3);

      if (sampleError) {
        logError('Sample data query failed', sampleError);
        return false;
      }
      logSuccess('Sample data query successful', { 
        count: sampleData?.length,
        sample: sampleData 
      });

      // Test 4: User-specific query
      log('Test 4: Testing user-specific query');
      const validUserId = ensureValidUserId(userId);
      const { data: userData, error: userError } = await supabase
        .from('strandhoot_templates')
        .select('id, title, created_by, creator_name')
        .eq('created_by', validUserId);

      if (userError) {
        logError('User-specific query failed', userError);
      } else {
        logSuccess('User-specific query successful', {
          userId: validUserId,
          count: userData?.length,
          userData
        });
      }

      return true;
    } catch (error) {
      logError('Connection test failed', error);
      return false;
    }
  };

  // 🐛 NEW: Create test strandhoot
  const createTestStrandhoot = async () => {
    log('🧪 Creating test strandhoot');
    
    try {
      const validUserId = ensureValidUserId(userId);
      const testStrandhoot = {
        title: `Test Strandhoot - ${new Date().toLocaleTimeString()}`,
        description: 'This is a test strandhoot created for debugging purposes',
        criteria: 'A',
        subject: 'Sciences',
        myp_year: 3,
        context: JSON.stringify({ 
          blocks: [
            { type: 'welcome', id: '1', label: 'Welcome Block' },
            { type: 'strand', id: '2', label: 'Test Strand' }
          ] 
        }),
        strands: {},
        created_by: validUserId,
        creator_name: userId,
        is_public: false
      };

      log('Inserting test strandhoot', testStrandhoot);

      const { data: newStrandhoot, error: createError } = await supabase
        .from('strandhoot_templates')
        .insert([testStrandhoot])
        .select()
        .single();

      if (createError) {
        logError('Failed to create test strandhoot', createError);
        toast.error(`Failed to create test: ${createError.message}`);
        return null;
      } else {
        logSuccess('Test strandhoot created successfully', newStrandhoot);
        toast.success('✅ Test strandhoot created!');
        return newStrandhoot;
      }
    } catch (error) {
      logError('Error creating test strandhoot', error);
      toast.error('Error creating test strandhoot');
      return null;
    }
  };

  // Fetch strandhoots from Supabase - ENHANCED WITH DEBUG
  const fetchStrandhoots = async () => {
    setLoading(true);
    setError(null);
    log('🚀 Starting fetchStrandhoots', { userId, isValidUUID: isValidUUID(userId) });

    try {
      // Step 1: Test database connection and get total count
      log('Step 1: Testing database connection and checking total count');
      const { count: totalCount, error: countError } = await supabase
        .from('strandhoot_templates')
        .select('*', { count: 'exact', head: true });

      log('Count query result', { totalCount, countError });

      if (countError) {
        logError('Failed to get total count', countError);
        setError(`Database connection failed: ${countError.message}`);
        return;
      }

      logSuccess('Database connection successful', { totalCount });

      // Step 2: If database is empty, show empty state
      if (totalCount === 0) {
        log('Database is completely empty');
        setStrandhoots([]);
        setStats({ total: 0, drafts: 0, published: 0, public: 0 });
        return;
      }

      // Step 3: Fetch all strandhoots first to see what's available
      log('Step 3: Fetching all strandhoots for debugging');
      
      const { data: allStrandhoots, error: allError } = await supabase
        .from('strandhoot_templates')
        .select('*')
        .order('updated_at', { ascending: false });

      log('All strandhoots query result', { 
        count: allStrandhoots?.length, 
        error: allError?.message || 'no error',
        sampleTitles: allStrandhoots?.slice(0, 3).map(s => s.title) || []
      });

      if (allError) {
        logError('Failed to fetch all strandhoots', allError);
        setError(`Failed to load strandhoots: ${allError.message}`);
        return;
      }

      // Step 4: Analyze user matching
      log('Step 4: Analyzing user matching strategies');
      const validUserId = ensureValidUserId(userId);
      
      // Strategy 1: Exact UUID match
      const exactMatches = (allStrandhoots || []).filter(s => s.created_by === userId);
      log('Strategy 1 - Exact UUID match', { userId, count: exactMatches.length });
      
      // Strategy 2: Converted UUID match
      const convertedMatches = (allStrandhoots || []).filter(s => s.created_by === validUserId);
      log('Strategy 2 - Converted UUID match', { validUserId, count: convertedMatches.length });
      
      // Strategy 3: Creator name match
      const nameMatches = (allStrandhoots || []).filter(s => 
        s.creator_name?.toLowerCase().includes(userId.toLowerCase())
      );
      log('Strategy 3 - Creator name match', { userId, count: nameMatches.length });

      // Step 5: Determine which strandhoots to show
      let userStrandhoots: StrandhootTemplate[] = [];
      
      if (exactMatches.length > 0) {
        userStrandhoots = exactMatches;
        log('Using exact matches');
      } else if (convertedMatches.length > 0) {
        userStrandhoots = convertedMatches;
        log('Using converted UUID matches');
      } else if (nameMatches.length > 0) {
        userStrandhoots = nameMatches;
        log('Using creator name matches');
      } else if (userId === 'current-user' || !isValidUUID(userId)) {
        // Development mode - show all strandhoots
        userStrandhoots = allStrandhoots || [];
        log('Development mode: Showing all strandhoots');
        
        if (userStrandhoots.length > 0) {
          toast.info(`🔧 Dev mode: Showing all ${userStrandhoots.length} strandhoots`);
        }
      } else {
        log('No matches found for user');
        userStrandhoots = [];
      }

      // Step 6: Set the results
      log('Step 6: Setting results', { count: userStrandhoots.length });
      setStrandhoots(userStrandhoots);
      
      // Calculate stats
      const newStats: DashboardStats = {
        total: userStrandhoots.length,
        drafts: userStrandhoots.filter(s => !s.is_public).length,
        published: userStrandhoots.filter(s => s.is_public === true).length,
        public: userStrandhoots.filter(s => s.is_public === true).length,
      };
      
      logSuccess('Stats calculated', newStats);
      setStats(newStats);
      
      if (userStrandhoots.length === 0) {
        log('No strandhoots found - showing debug info');
        setError(`No strandhoots found for user "${userId}". Found ${totalCount} total strandhoots in database. Check debug panel for details.`);
        
        // Show debug table
        console.log('📊 All strandhoots in database:');
        console.table((allStrandhoots || []).map(s => ({
          id: s.id.slice(0, 8) + '...',
          title: s.title,
          created_by: s.created_by?.slice(0, 8) + '...',
          creator_name: s.creator_name,
          is_public: s.is_public
        })));
      } else {
        logSuccess(`Successfully loaded ${userStrandhoots.length} strandhoots`);
        toast.success(`Found ${userStrandhoots.length} strandhoots!`);
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logError('Error in fetchStrandhoots', error);
      setError(`Error loading strandhoots: ${errorMessage}`);
      toast.error('Error loading your strandhoots');
    } finally {
      setLoading(false);
      log('Fetch operation completed');
    }
  };

  // Update filters
  const updateFilters = (newFilters: Partial<DashboardFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...strandhoots];

    // Apply search filter
    if (filters.search.trim()) {
      const query = filters.search.toLowerCase();
      filtered = filtered.filter(s => 
        s.title.toLowerCase().includes(query) ||
        s.description?.toLowerCase().includes(query) ||
        s.subject?.toLowerCase().includes(query) ||
        s.creator_name?.toLowerCase().includes(query)
      );
    }

    // Apply status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(s => {
        if (filters.status === 'published') return s.is_public === true;
        if (filters.status === 'drafts') return s.is_public !== true;
        return true;
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'updated':
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        case 'created':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    log('Applied filters', { 
      original: strandhoots.length, 
      filtered: filtered.length, 
      filters 
    });

    setFilteredStrandhoots(filtered);
  }, [strandhoots, filters]);

  // Duplicate strandhoot
  const duplicateStrandhoot = async (strandhoot: StrandhootTemplate) => {
    const validUserId = ensureValidUserId(userId);
    log('Duplicating strandhoot', { id: strandhoot.id, title: strandhoot.title });

    try {
      const duplicatedStrandhoot = {
        title: `${strandhoot.title} (Copy)`,
        description: strandhoot.description,
        criteria: strandhoot.criteria,
        subject: strandhoot.subject,
        myp_year: strandhoot.myp_year,
        context: strandhoot.context,
        simulation_link: strandhoot.simulation_link,
        research_material_link: strandhoot.research_material_link,
        strands: strandhoot.strands,
        created_by: validUserId,
        is_public: false,
        tags: strandhoot.tags,
        creator_name: strandhoot.creator_name
      };

      const { data, error: duplicateError } = await supabase
        .from('strandhoot_templates')
        .insert([duplicatedStrandhoot])
        .select()
        .single();

      if (duplicateError) {
        logError('Failed to duplicate strandhoot', duplicateError);
        toast.error('Failed to duplicate strandhoot');
      } else {
        logSuccess('Successfully duplicated strandhoot', data);
        toast.success(`"${strandhoot.title}" duplicated successfully`);
        
        // Refresh the list
        await fetchStrandhoots();
        return data;
      }
    } catch (error) {
      logError('Error duplicating strandhoot', error);
      toast.error('Error duplicating strandhoot');
    }
  };

  // Delete strandhoot
  const deleteStrandhoot = async (strandhootId: string) => {
    const validUserId = ensureValidUserId(userId);
    log('Deleting strandhoot', { id: strandhootId });

    try {
      const { error: deleteError } = await supabase
        .from('strandhoot_templates')
        .delete()
        .eq('id', strandhootId)
        .eq('created_by', validUserId);

      if (deleteError) {
        logError('Failed to delete strandhoot', deleteError);
        toast.error('Failed to delete strandhoot');
      } else {
        logSuccess('Successfully deleted strandhoot');
        toast.success('Strandhoot deleted successfully');
        
        // Remove from local state
        const updatedStrandhoots = strandhoots.filter(s => s.id !== strandhootId);
        setStrandhoots(updatedStrandhoots);
      }
    } catch (error) {
      logError('Error deleting strandhoot', error);
      toast.error('Error deleting strandhoot');
    }
  };

  // Toggle publish status
  const togglePublishStatus = async (strandhoot: StrandhootTemplate) => {
    const validUserId = ensureValidUserId(userId);
    log('Toggling publish status', { id: strandhoot.id, currentStatus: strandhoot.is_public });

    try {
      const { error: updateError } = await supabase
        .from('strandhoot_templates')
        .update({ is_public: !strandhoot.is_public })
        .eq('id', strandhoot.id)
        .eq('created_by', validUserId);

      if (updateError) {
        logError('Failed to toggle publish status', updateError);
        toast.error('Failed to update publish status');
      } else {
        logSuccess('Successfully toggled publish status');
        toast.success(strandhoot.is_public ? 'Made private' : 'Published successfully');
        
        // Refresh the list
        await fetchStrandhoots();
      }
    } catch (error) {
      logError('Error toggling publish status', error);
      toast.error('Error updating publish status');
    }
  };

  // Fetch strandhoots when modal opens
  useEffect(() => {
    if (open && userId) {
      log('Modal opened, fetching strandhoots', { userId });
      fetchStrandhoots();
    }
  }, [open, userId]);

  // Helper functions
  const handleEdit = (id: string) => {
    log('Edit requested', { id });
    onEditStrandhoot(id);
    onClose();
  };

  const handleDuplicate = async (strandhoot: StrandhootTemplate) => {
    try {
      const newStrandhoot = await duplicateStrandhoot(strandhoot);
      if (newStrandhoot) {
        handleEdit(newStrandhoot.id);
      }
    } catch (error) {
      // Error already handled in duplicateStrandhoot
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      await deleteStrandhoot(id);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusBadge = (strandhoot: StrandhootTemplate) => {
    if (strandhoot.is_public) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
          <Globe size={10} />
          Public
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
        <FileText size={10} />
        Draft
      </span>
    );
  };

  // Get block count from context
  const getBlockCount = (strandhoot: StrandhootTemplate): number => {
    try {
      if (strandhoot.context) {
        const context = JSON.parse(strandhoot.context);
        return context.blocks?.length || 0;
      }
      return 0;
    } catch {
      return 0;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen size={20} />
            My Strandhoots
            {!loading && (
              <span className="text-sm font-normal text-gray-500">
                ({filteredStrandhoots.length} of {stats.total})
              </span>
            )}
            
            {/* 🐛 NEW: Debug Toggle */}
            <Button
              onClick={() => setShowDebugPanel(!showDebugPanel)}
              variant="outline"
              size="sm"
              className={`ml-2 ${showDebugPanel ? 'bg-red-100 text-red-700' : 'bg-gray-100'}`}
            >
              <Bug size={12} className="mr-1" />
              Debug {showDebugPanel ? 'ON' : 'OFF'}
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex flex-col">
          {/* 🐛 NEW: Debug Panel */}
          {showDebugPanel && (
            <Card className="p-3 mb-4 bg-yellow-50 border-yellow-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-bold text-yellow-800 flex items-center gap-1">
                  <Bug size={14} />
                  Debug Panel
                </h4>
                <div className="flex gap-1">
                  <Button onClick={testConnection} size="sm" variant="outline">
                    <Database size={12} className="mr-1" />
                    Test DB
                  </Button>
                  <Button onClick={createTestStrandhoot} size="sm" variant="outline">
                    <Plus size={12} className="mr-1" />
                    Create Test
                  </Button>
                  <Button onClick={clearDebugLogs} size="sm" variant="outline">
                    Clear Logs
                  </Button>
                </div>
              </div>
              
              <div className="text-xs space-y-1 mb-2">
                <div><strong>User ID:</strong> {userId}</div>
                <div><strong>Valid UUID:</strong> {isValidUUID(userId) ? '✅ Yes' : '❌ No'}</div>
                <div><strong>Converted ID:</strong> {ensureValidUserId(userId)}</div>
                <div><strong>Strandhoots Found:</strong> {strandhoots.length}</div>
                <div><strong>Debug Logs:</strong> {debugLogs.length}</div>
              </div>
              
              {debugLogs.length > 0 && (
                <details className="text-xs">
                  <summary className="cursor-pointer text-yellow-700 font-medium">
                    Recent Debug Logs ({debugLogs.length})
                  </summary>
                  <div className="mt-2 max-h-32 overflow-y-auto bg-yellow-100 p-2 rounded">
                    {debugLogs.slice(-10).map((log, index) => (
                      <div key={index} className={`mb-1 ${log.success ? 'text-green-700' : 'text-red-700'}`}>
                        <span className="text-gray-600">{log.timestamp}</span> - {log.step}
                        {log.data && <div className="ml-2 text-gray-600">Data: {JSON.stringify(log.data).slice(0, 100)}...</div>}
                        {log.error && <div className="ml-2 text-red-600">Error: {log.error.message || log.error}</div>}
                      </div>
                    ))}
                  </div>
                </details>
              )}
            </Card>
          )}

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <p className="text-red-800 text-sm">{error}</p>
              <div className="mt-2 flex gap-2">
                <Button 
                  onClick={fetchStrandhoots}
                  variant="outline"
                  size="sm"
                >
                  <RefreshCw size={14} className="mr-1" />
                  Try Again
                </Button>
                <Button 
                  onClick={createTestStrandhoot}
                  variant="outline"
                  size="sm"
                >
                  <Plus size={14} className="mr-1" />
                  Create Test Data
                </Button>
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-4">
            <Card className="p-3 text-center">
              <div className="text-lg font-bold text-blue-600">{stats.total}</div>
              <div className="text-xs text-gray-600">Total</div>
            </Card>
            <Card className="p-3 text-center">
              <div className="text-lg font-bold text-yellow-600">{stats.drafts}</div>
              <div className="text-xs text-gray-600">Drafts</div>
            </Card>
            <Card className="p-3 text-center">
              <div className="text-lg font-bold text-green-600">{stats.published}</div>
              <div className="text-xs text-gray-600">Published</div>
            </Card>
            <Card className="p-3 text-center">
              <div className="text-lg font-bold text-purple-600">{stats.public}</div>
              <div className="text-xs text-gray-600">Public</div>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input
                placeholder="Search strandhoots..."
                value={filters.search}
                onChange={(e) => updateFilters({ search: e.target.value })}
                className="pl-10"
              />
            </div>
            
            <select 
              value={filters.status} 
              onChange={(e) => updateFilters({ status: e.target.value as any })}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="all">All</option>
              <option value="drafts">Drafts</option>
              <option value="published">Published</option>
            </select>

            <select 
              value={filters.sortBy} 
              onChange={(e) => updateFilters({ sortBy: e.target.value as any })}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="updated">Recent</option>
              <option value="created">Created</option>
              <option value="title">Title</option>
            </select>

            <Button 
              onClick={fetchStrandhoots} 
              variant="outline" 
              size="icon"
              disabled={loading}
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-blue-600 mr-2" />
                <span className="text-sm text-gray-600">Loading your strandhoots...</span>
              </div>
            ) : filteredStrandhoots.length === 0 ? (
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                {filters.search || filters.status !== 'all' ? (
                  <>
                    <p className="text-gray-600 mb-4">No strandhoots match your criteria</p>
                    <Button 
                      onClick={() => setFilters({ search: '', status: 'all', sortBy: 'updated' })}
                      variant="outline"
                    >
                      Clear Filters
                    </Button>
                  </>
                ) : (
                  <>
                    <p className="text-gray-600 mb-4">No strandhoots found</p>
                    {onCreateNew && (
                      <Button onClick={onCreateNew} className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Plus size={16} className="mr-2" />
                        Create Your First Strandhoot
                      </Button>
                    )}
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg text-left">
                      <p className="text-sm text-gray-600 mb-2">💡 <strong>Debug Tips:</strong></p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        <li>• Enable debug panel to see detailed logs</li>
                        <li>• Check if your user ID matches any strandhoots</li>
                        <li>• Try creating test data to verify the system works</li>
                        <li>• Current user: <code className="bg-gray-200 px-1 rounded">{userId}</code></li>
                      </ul>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <AnimatePresence>
                  {filteredStrandhoots.map((strandhoot) => (
                    <motion.div
                      key={strandhoot.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card className="p-4 hover:shadow-md transition-shadow group">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-gray-900 truncate text-sm group-hover:text-blue-600 transition-colors">
                              {strandhoot.title || 'Untitled'}
                            </h3>
                            <p className="text-xs text-gray-500 mt-1">
                              {strandhoot.subject} • {strandhoot.criteria} • MYP {strandhoot.myp_year}
                            </p>
                            {/* 🐛 NEW: Debug info for each strandhoot */}
                            {showDebugPanel && (
                              <div className="text-xs text-gray-400 mt-1 space-y-1">
                                <div>ID: {strandhoot.id.slice(0, 8)}...</div>
                                <div>Created by: {strandhoot.created_by?.slice(0, 8)}...</div>
                                <div>Creator: {strandhoot.creator_name || 'None'}</div>
                              </div>
                            )}
                          </div>
                          {getStatusBadge(strandhoot)}
                        </div>

                        {/* Description */}
                        <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                          {strandhoot.description || 'No description'}
                        </p>

                        {/* Metadata */}
                        <div className="flex items-center text-xs text-gray-500 mb-3 space-x-3">
                          <span>{getBlockCount(strandhoot)} blocks</span>
                          <span>{formatDate(strandhoot.updated_at)}</span>
                          {strandhoot.creator_name && (
                            <span>by {strandhoot.creator_name}</span>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                          <Button
                            size="sm"
                            onClick={() => handleEdit(strandhoot.id)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 text-xs"
                          >
                            <Edit3 size={10} className="mr-1" />
                            Edit
                          </Button>
                          
                          <div className="flex items-center space-x-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => togglePublishStatus(strandhoot)}
                              className="p-1 h-6 w-6"
                              title={strandhoot.is_public ? "Make Private" : "Publish"}
                            >
                              {strandhoot.is_public ? <Lock size={10} /> : <Globe size={10} />}
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDuplicate(strandhoot)}
                              className="p-1 h-6 w-6"
                              title="Duplicate"
                            >
                              <Copy size={10} />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDelete(strandhoot.id, strandhoot.title)}
                              className="p-1 h-6 w-6 text-red-600 hover:text-red-700"
                              title="Delete"
                            >
                              <Trash2 size={10} />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <User size={14} />
              <span>User: <code className="bg-gray-100 px-1 rounded text-xs">{userId}</code></span>
              {!isValidUUID(userId) && (
                <span className="text-yellow-600 text-xs">(dev mode)</span>
              )}
              {showDebugPanel && (
                <span className="text-xs text-blue-600">
                  | Logs: {debugLogs.length} | DB: {strandhoots.length} found
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            {onCreateNew && (
              <Button onClick={onCreateNew} variant="outline">
                <Plus size={16} className="mr-1" />
                Create New
              </Button>
            )}
            <Button onClick={onClose}>Close</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}