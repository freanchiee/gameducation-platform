// UserDashboard.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { 
  Eye, 
  Edit3, 
  Trash2, 
  Copy, 
  Search, 
  Filter, 
  Calendar,
  Clock,
  BookOpen,
  Plus,
  FileText,
  Users,
  Globe,
  Lock
} from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/utils/supabase';

// Types
interface StrandhootCard {
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
}

interface DashboardStats {
  total: number;
  drafts: number;
  published: number;
  public: number;
}

interface UserDashboardProps {
  userId?: string;
  onEditStrandhoot?: (id: string) => void;
  onCreateNew?: () => void;
  onPreviewStrandhoot?: (id: string) => void;
}

const SUBJECTS = ['Sciences', 'Language and Literature', 'Language Acquisition', 'Individuals and Societies', 'Arts', 'Design & Technology'];
const CRITERIA = ['A', 'B', 'C', 'D'];
const MYP_YEARS = ['1', '2', '3', '4', '5'];

export default function UserDashboard({ 
  userId = 'current-user', 
  onEditStrandhoot, 
  onCreateNew,
  onPreviewStrandhoot 
}: UserDashboardProps) {
  // State
  const [strandhoots, setStrandhoots] = useState<StrandhootCard[]>([]);
  const [filteredStrandhoots, setFilteredStrandhoots] = useState<StrandhootCard[]>([]);
  const [stats, setStats] = useState<DashboardStats>({ total: 0, drafts: 0, published: 0, public: 0 });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const [filterCriteria, setFilterCriteria] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'drafts', 'published'
  const [sortBy, setSortBy] = useState<'updated' | 'created' | 'title'>('updated');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Load strandhoots from database
  const loadStrandhoots = async () => {
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

      const processedData: StrandhootCard[] = data.map(item => ({
        ...item,
        blocks_count: item.context?.blocks?.length || 0,
        subject: item.subject || 'Sciences',
        criteria: item.criteria || 'A',
        myp_year: item.myp_year || '3'
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
  };

  // Apply filters and search
  useEffect(() => {
    let filtered = [...strandhoots];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(s => 
        s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Subject filter
    if (filterSubject) {
      filtered = filtered.filter(s => s.subject === filterSubject);
    }

    // Criteria filter
    if (filterCriteria) {
      filtered = filtered.filter(s => s.criteria === filterCriteria);
    }

    // Status filter
    if (filterStatus === 'drafts') {
      filtered = filtered.filter(s => !s.is_published);
    } else if (filterStatus === 'published') {
      filtered = filtered.filter(s => s.is_published);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
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
  }, [strandhoots, searchTerm, filterSubject, filterCriteria, filterStatus, sortBy]);

  // Load data on mount
  useEffect(() => {
    loadStrandhoots();
  }, [userId]);

  // Actions
  const handleEdit = (id: string) => {
    if (onEditStrandhoot) {
      onEditStrandhoot(id);
    } else {
      window.location.href = `/strandhoot-builder?edit=${id}`;
    }
  };

  const handlePreview = (id: string) => {
    if (onPreviewStrandhoot) {
      onPreviewStrandhoot(id);
    } else {
      window.open(`/strandhoot-builder/preview/${id}`, '_blank');
    }
  };

  const handleDuplicate = async (strandhoot: StrandhootCard) => {
    try {
      const { data, error } = await supabase
        .from('strandhoot_templates')
        .insert({
          title: `${strandhoot.title} (Copy)`,
          description: strandhoot.description,
          subject: strandhoot.subject,
          criteria: strandhoot.criteria,
          myp_year: strandhoot.myp_year,
          context: await getStrandhootContext(strandhoot.id),
          created_by: userId,
          is_published: false,
          is_public: false,
          tags: strandhoot.tags
        })
        .select()
        .single();

      if (error) throw error;

      toast.success('Strandhoot duplicated successfully!');
      loadStrandhoots(); // Refresh the list
    } catch (error) {
      console.error('Error duplicating strandhoot:', error);
      toast.error('Failed to duplicate strandhoot');
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('strandhoot_templates')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Strandhoot deleted successfully');
      loadStrandhoots(); // Refresh the list
    } catch (error) {
      console.error('Error deleting strandhoot:', error);
      toast.error('Failed to delete strandhoot');
    }
  };

  const getStrandhootContext = async (id: string) => {
    const { data } = await supabase
      .from('strandhoot_templates')
      .select('context')
      .eq('id', id)
      .single();
    return data?.context;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const getStatusBadge = (strandhoot: StrandhootCard) => {
    if (strandhoot.is_published) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
          <Globe size={10} />
          {strandhoot.is_public ? 'Public' : 'Published'}
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Strandhoots</h1>
              <p className="text-gray-600 mt-1">Manage your educational content and lab reports</p>
            </div>
            <Button 
              onClick={onCreateNew}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus size={20} className="mr-2" />
              Create New Strandhoot
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Drafts</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.drafts}</p>
                </div>
                <FileText className="h-8 w-8 text-yellow-600" />
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Published</p>
                  <p className="text-2xl font-bold text-green-600">{stats.published}</p>
                </div>
                <Globe className="h-8 w-8 text-green-600" />
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Public</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.public}</p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card className="p-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  placeholder="Search strandhoots..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <select 
                value={filterSubject} 
                onChange={(e) => setFilterSubject(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="">All Subjects</option>
                {SUBJECTS.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>

              <select 
                value={filterCriteria} 
                onChange={(e) => setFilterCriteria(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="">All Criteria</option>
                {CRITERIA.map(criteria => (
                  <option key={criteria} value={criteria}>Criterion {criteria}</option>
                ))}
              </select>

              <select 
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Status</option>
                <option value="drafts">Drafts</option>
                <option value="published">Published</option>
              </select>

              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="updated">Last Updated</option>
                <option value="created">Date Created</option>
                <option value="title">Title</option>
              </select>
            </div>
          </Card>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Loading your strandhoots...</span>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredStrandhoots.length === 0 && strandhoots.length === 0 && (
          <Card className="p-12 text-center">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No strandhoots yet</h3>
            <p className="text-gray-600 mb-6">Get started by creating your first strandhoot</p>
            <Button onClick={onCreateNew} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus size={20} className="mr-2" />
              Create Your First Strandhoot
            </Button>
          </Card>
        )}

        {/* No Results */}
        {!loading && filteredStrandhoots.length === 0 && strandhoots.length > 0 && (
          <Card className="p-8 text-center">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </Card>
        )}

        {/* Strandhoots Grid */}
        {!loading && filteredStrandhoots.length > 0 && (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            layout
          >
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
                  <Card className="p-4 hover:shadow-lg transition-shadow duration-200 group">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                          {strandhoot.title || 'Untitled Strandhoot'}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {strandhoot.subject} • Criterion {strandhoot.criteria} • MYP {strandhoot.myp_year}
                        </p>
                      </div>
                      {getStatusBadge(strandhoot)}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {strandhoot.description || 'No description provided'}
                    </p>

                    {/* Metadata */}
                    <div className="flex items-center text-xs text-gray-500 mb-4 space-x-4">
                      <span className="flex items-center gap-1">
                        <FileText size={12} />
                        {strandhoot.blocks_count} blocks
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {formatDate(strandhoot.updated_at)}
                      </span>
                    </div>

                    {/* Tags */}
                    {strandhoot.tags && strandhoot.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {strandhoot.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                            {tag}
                          </span>
                        ))}
                        {strandhoot.tags.length > 3 && (
                          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                            +{strandhoot.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleEdit(strandhoot.id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 text-xs"
                        >
                          <Edit3 size={12} className="mr-1" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handlePreview(strandhoot.id)}
                          className="px-3 py-1 text-xs"
                        >
                          <Eye size={12} className="mr-1" />
                          Preview
                        </Button>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDuplicate(strandhoot)}
                          className="p-1 h-7 w-7"
                          title="Duplicate"
                        >
                          <Copy size={12} />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(strandhoot.id, strandhoot.title)}
                          className="p-1 h-7 w-7 text-red-600 hover:text-red-700"
                          title="Delete"
                        >
                          <Trash2 size={12} />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}