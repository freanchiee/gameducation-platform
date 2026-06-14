// hooks/useDashboard.ts
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/utils/supabase';
import { toast } from 'sonner';

export interface DashboardStrandhoot {
  id: string;
  title: string;
  description: string;
  subject: string;
  criteria: string;
  myp_year: string;
  blocks_count: number;
  is_published: boolean;
  is_public: boolean;
  created_at: string;
  updated_at: string;
  created_by: string;
  thumbnail_url?: string;
  tags?: string[];
  version: number;
  context?: any;
}

export interface DashboardFilters {
  search: string;
  subject: string;
  criteria: string;
  status: 'all' | 'drafts' | 'published';
  sortBy: 'updated' | 'created' | 'title';
}

export interface DashboardStats {
  total: number;
  drafts: number;
  published: number;
  public: number;
}

export function useDashboard(userId: string = 'current-user') {
  const [strandhoots, setStrandhoots] = useState<DashboardStrandhoot[]>([]);
  const [filteredStrandhoots, setFilteredStrandhoots] = useState<DashboardStrandhoot[]>([]);
  const [stats, setStats] = useState<DashboardStats>({ total: 0, drafts: 0, published: 0, public: 0 });
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<DashboardFilters>({
    search: '',
    subject: '',
    criteria: '',
    status: 'all',
    sortBy: 'updated'
  });

  // Load strandhoots from database
  const loadStrandhoots = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('strandhoot_templates')
        .select(`
          id,
          title,
          description,
          subject,
          criteria,
          myp_year,
          is_published,
          is_public,
          created_at,
          updated_at,
          created_by,
          thumbnail_url,
          tags,
          version,
          context
        `)
        .eq('created_by', userId)
        .order('updated_at', { ascending: false });

      if (error) throw error;

      const processedData: DashboardStrandhoot[] = data.map(item => ({
        ...item,
        blocks_count: item.context?.blocks?.length || 0,
        subject: item.subject || 'Sciences',
        criteria: item.criteria || 'A',
        myp_year: item.myp_year || '3',
        tags: item.tags || []
      }));

      setStrandhoots(processedData);
      
      // Calculate stats
      const newStats = {
        total: processedData.length,
        drafts: processedData.filter(s => !s.is_published).length,
        published: processedData.filter(s => s.is_published).length,
        public: processedData.filter(s => s.is_public).length
      };
      setStats(newStats);

    } catch (error) {
      console.error('Error loading strandhoots:', error);
      toast.error('Failed to load your strandhoots');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Apply filters and search
  useEffect(() => {
    let filtered = [...strandhoots];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(s => 
        s.title.toLowerCase().includes(searchLower) ||
        s.description.toLowerCase().includes(searchLower) ||
        s.tags?.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Subject filter
    if (filters.subject) {
      filtered = filtered.filter(s => s.subject === filters.subject);
    }

    // Criteria filter
    if (filters.criteria) {
      filtered = filtered.filter(s => s.criteria === filters.criteria);
    }

    // Status filter
    if (filters.status === 'drafts') {
      filtered = filtered.filter(s => !s.is_published);
    } else if (filters.status === 'published') {
      filtered = filtered.filter(s => s.is_published);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'created':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'updated':
        default:
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      }
    });

    setFilteredStrandhoots(filtered);
  }, [strandhoots, filters]);

  // Update filters
  const updateFilters = useCallback((newFilters: Partial<DashboardFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Actions
  const duplicateStrandhoot = useCallback(async (strandhoot: DashboardStrandhoot) => {
    try {
      const { data, error } = await supabase
        .from('strandhoot_templates')
        .insert({
          title: `${strandhoot.title} (Copy)`,
          description: strandhoot.description,
          subject: strandhoot.subject,
          criteria: strandhoot.criteria,
          myp_year: strandhoot.myp_year,
          context: strandhoot.context,
          created_by: userId,
          is_published: false,
          is_public: false,
          tags: strandhoot.tags
        })
        .select()
        .single();

      if (error) throw error;

      toast.success('Strandhoot duplicated successfully!');
      await loadStrandhoots(); // Refresh the list
      return data;
    } catch (error) {
      console.error('Error duplicating strandhoot:', error);
      toast.error('Failed to duplicate strandhoot');
      throw error;
    }
  }, [userId, loadStrandhoots]);

  const deleteStrandhoot = useCallback(async (id: string) => {
    try {
      const { error } = await supabase
        .from('strandhoot_templates')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Strandhoot deleted successfully');
      await loadStrandhoots(); // Refresh the list
    } catch (error) {
      console.error('Error deleting strandhoot:', error);
      toast.error('Failed to delete strandhoot');
      throw error;
    }
  }, [loadStrandhoots]);

  const updateStrandhootTags = useCallback(async (id: string, tags: string[]) => {
    try {
      const { error } = await supabase
        .from('strandhoot_templates')
        .update({ tags })
        .eq('id', id);

      if (error) throw error;

      toast.success('Tags updated successfully');
      await loadStrandhoots(); // Refresh the list
    } catch (error) {
      console.error('Error updating tags:', error);
      toast.error('Failed to update tags');
      throw error;
    }
  }, [loadStrandhoots]);

  const togglePublishStatus = useCallback(async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('strandhoot_templates')
        .update({ 
          is_published: !currentStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;

      toast.success(`Strandhoot ${!currentStatus ? 'published' : 'unpublished'} successfully`);
      await loadStrandhoots(); // Refresh the list
    } catch (error) {
      console.error('Error toggling publish status:', error);
      toast.error('Failed to update publish status');
      throw error;
    }
  }, [loadStrandhoots]);

  const togglePublicStatus = useCallback(async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('strandhoot_templates')
        .update({ 
          is_public: !currentStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;

      toast.success(`Strandhoot made ${!currentStatus ? 'public' : 'private'} successfully`);
      await loadStrandhoots(); // Refresh the list
    } catch (error) {
      console.error('Error toggling public status:', error);
      toast.error('Failed to update visibility');
      throw error;
    }
  }, [loadStrandhoots]);

  // Load data on mount
  useEffect(() => {
    loadStrandhoots();
  }, [loadStrandhoots]);

  // Utility functions
  const getStrandhootById = useCallback((id: string) => {
    return strandhoots.find(s => s.id === id);
  }, [strandhoots]);

  const getRecentStrandhoots = useCallback((limit: number = 5) => {
    return strandhoots
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
      .slice(0, limit);
  }, [strandhoots]);

  const getDraftCount = useCallback(() => {
    return strandhoots.filter(s => !s.is_published).length;
  }, [strandhoots]);

  const getPublishedCount = useCallback(() => {
    return strandhoots.filter(s => s.is_published).length;
  }, [strandhoots]);

  const searchStrandhoots = useCallback((query: string) => {
    if (!query.trim()) return strandhoots;
    
    const searchLower = query.toLowerCase();
    return strandhoots.filter(s => 
      s.title.toLowerCase().includes(searchLower) ||
      s.description.toLowerCase().includes(searchLower) ||
      s.subject.toLowerCase().includes(searchLower) ||
      s.tags?.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }, [strandhoots]);

  const getStrandhootsBySubject = useCallback((subject: string) => {
    return strandhoots.filter(s => s.subject === subject);
  }, [strandhoots]);

  const getStrandhootsByCriteria = useCallback((criteria: string) => {
    return strandhoots.filter(s => s.criteria === criteria);
  }, [strandhoots]);

  const bulkUpdateStrandhoots = useCallback(async (ids: string[], updates: Partial<DashboardStrandhoot>) => {
    try {
      const { error } = await supabase
        .from('strandhoot_templates')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .in('id', ids);

      if (error) throw error;

      toast.success(`${ids.length} strandhoots updated successfully`);
      await loadStrandhoots();
    } catch (error) {
      console.error('Error bulk updating strandhoots:', error);
      toast.error('Failed to update strandhoots');
      throw error;
    }
  }, [loadStrandhoots]);

  const exportStrandhootData = useCallback((id: string) => {
    const strandhoot = getStrandhootById(id);
    if (!strandhoot) return null;

    const exportData = {
      id: strandhoot.id,
      title: strandhoot.title,
      description: strandhoot.description,
      subject: strandhoot.subject,
      criteria: strandhoot.criteria,
      myp_year: strandhoot.myp_year,
      context: strandhoot.context,
      tags: strandhoot.tags,
      exported_at: new Date().toISOString(),
      version: strandhoot.version
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${strandhoot.title || 'strandhoot'}-export.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success('Strandhoot exported successfully');
    return exportData;
  }, [getStrandhootById]);

  const importStrandhootData = useCallback(async (file: File) => {
    try {
      const text = await file.text();
      const importData = JSON.parse(text);
      
      // Validate import data structure
      if (!importData.title || !importData.context) {
        throw new Error('Invalid strandhoot file format');
      }

      const { data, error } = await supabase
        .from('strandhoot_templates')
        .insert({
          title: `${importData.title} (Imported)`,
          description: importData.description || '',
          subject: importData.subject || 'Sciences',
          criteria: importData.criteria || 'A',
          myp_year: importData.myp_year || '3',
          context: importData.context,
          created_by: userId,
          is_published: false,
          is_public: false,
          tags: importData.tags || []
        })
        .select()
        .single();

      if (error) throw error;

      toast.success('Strandhoot imported successfully!');
      await loadStrandhoots();
      return data;
    } catch (error) {
      console.error('Error importing strandhoot:', error);
      toast.error('Failed to import strandhoot. Please check the file format.');
      throw error;
    }
  }, [userId, loadStrandhoots]);

  const createNewStrandhoot = useCallback(async (templateData?: Partial<DashboardStrandhoot>) => {
    try {
      const defaultData = {
        title: 'Untitled Strandhoot',
        description: '',
        subject: 'Sciences',
        criteria: 'A',
        myp_year: '3',
        context: { blocks: [] },
        created_by: userId,
        is_published: false,
        is_public: false,
        tags: []
      };

      const strandhootData = { ...defaultData, ...templateData };

      const { data, error } = await supabase
        .from('strandhoot_templates')
        .insert(strandhootData)
        .select()
        .single();

      if (error) throw error;

      toast.success('New strandhoot created!');
      await loadStrandhoots();
      return data;
    } catch (error) {
      console.error('Error creating strandhoot:', error);
      toast.error('Failed to create new strandhoot');
      throw error;
    }
  }, [userId, loadStrandhoots]);

  const updateStrandhootMetadata = useCallback(async (
    id: string, 
    metadata: Pick<DashboardStrandhoot, 'title' | 'description' | 'subject' | 'criteria' | 'myp_year'>
  ) => {
    try {
      const { error } = await supabase
        .from('strandhoot_templates')
        .update({
          ...metadata,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;

      toast.success('Strandhoot updated successfully');
      await loadStrandhoots();
    } catch (error) {
      console.error('Error updating strandhoot metadata:', error);
      toast.error('Failed to update strandhoot');
      throw error;
    }
  }, [loadStrandhoots]);

  const clearAllFilters = useCallback(() => {
    setFilters({
      search: '',
      subject: '',
      criteria: '',
      status: 'all',
      sortBy: 'updated'
    });
  }, []);

  const hasActiveFilters = useCallback(() => {
    return filters.search !== '' || 
           filters.subject !== '' || 
           filters.criteria !== '' || 
           filters.status !== 'all';
  }, [filters]);

  return {
    // Data
    strandhoots,
    filteredStrandhoots,
    stats,
    loading,
    filters,
    
    // Actions
    loadStrandhoots,
    updateFilters,
    clearAllFilters,
    duplicateStrandhoot,
    deleteStrandhoot,
    updateStrandhootTags,
    updateStrandhootMetadata,
    togglePublishStatus,
    togglePublicStatus,
    bulkUpdateStrandhoots,
    createNewStrandhoot,
    
    // Utility functions
    getStrandhootById,
    getRecentStrandhoots,
    getDraftCount,
    getPublishedCount,
    searchStrandhoots,
    getStrandhootsBySubject,
    getStrandhootsByCriteria,
    hasActiveFilters,
    
    // Import/Export
    exportStrandhootData,
    importStrandhootData,
  };
}