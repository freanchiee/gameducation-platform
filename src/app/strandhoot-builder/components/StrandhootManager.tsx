// src/app/strandhoot-builder/components/StrandhootManager.tsx
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';
import { 
  Plus, 
  FileText, 
  Copy, 
  Edit, 
  Globe, 
  Lock,
  Calendar,
  Search,
  Filter
} from 'lucide-react';
import { toast } from 'sonner';
import { strandhootSaveService, type StrandhootTemplate } from '../services/strandhootSaveService';

interface StrandhootManagerProps {
  onCreateNew: () => void;
  onEditStrandhoot: (id: string) => void;
  creatorId?: string;
}

// Extended type to include database timestamps
interface StrandhootWithTimestamps extends Partial<StrandhootTemplate> {
  created_at?: string;
  updated_at?: string;
}

export default function StrandhootManager({ 
  onCreateNew, 
  onEditStrandhoot,
  creatorId = 'demo-user' 
}: StrandhootManagerProps) {
  const [strandhoots, setStrandhoots] = useState<StrandhootWithTimestamps[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPublicOnly, setShowPublicOnly] = useState(false);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [duplicateTarget, setDuplicateTarget] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    loadStrandhoots();
  }, [showPublicOnly]);

  const loadStrandhoots = async () => {
    setLoading(true);
    try {
      const result = await strandhootSaveService.listStrandhoots(creatorId, showPublicOnly);
      if (result.success && result.data) {
        setStrandhoots(result.data);
      } else {
        toast.error(result.error || 'Failed to load strandhoots');
      }
    } catch (error) {
      toast.error('Error loading strandhoots');
      console.error('Load error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDuplicate = async () => {
    if (!duplicateTarget || !newTitle.trim()) {
      toast.error('Please enter a title');
      return;
    }

    try {
      const result = await strandhootSaveService.duplicateStrandhoot(
        duplicateTarget,
        newTitle.trim(),
        creatorId
      );

      if (result.success) {
        toast.success('Strandhoot duplicated successfully!');
        setShowDuplicateModal(false);
        setDuplicateTarget(null);
        setNewTitle('');
        loadStrandhoots();
      } else {
        toast.error(result.error || 'Failed to duplicate');
      }
    } catch (error) {
      toast.error('Error duplicating strandhoot');
      console.error('Duplicate error:', error);
    }
  };

  const filteredStrandhoots = strandhoots.filter(strandhoot => 
    strandhoot.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    strandhoot.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    strandhoot.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Loading strandhoots...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Strandhoots</h1>
          <p className="text-gray-600">Create and manage your educational strandhoots</p>
        </div>
        <Button onClick={onCreateNew} className="gap-2">
          <Plus size={16} />
          Create New Strandhoot
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search strandhoots..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-gray-400" />
          <Button
            variant={showPublicOnly ? "default" : "outline"}
            size="sm"
            onClick={() => setShowPublicOnly(!showPublicOnly)}
          >
            {showPublicOnly ? 'All Strandhoots' : 'Public Only'}
          </Button>
        </div>
      </div>

      {/* Strandhoots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStrandhoots.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <FileText size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              {searchQuery ? 'No strandhoots found' : 'No strandhoots yet'}
            </h3>
            <p className="text-gray-500 mb-4">
              {searchQuery 
                ? 'Try adjusting your search terms' 
                : 'Create your first strandhoot to get started'
              }
            </p>
            {!searchQuery && (
              <Button onClick={onCreateNew} className="gap-2">
                <Plus size={16} />
                Create New Strandhoot
              </Button>
            )}
          </div>
        ) : (
          filteredStrandhoots.map((strandhoot) => (
            <Card key={strandhoot.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg line-clamp-2">
                      {strandhoot.title}
                    </h3>
                    {strandhoot.description && (
                      <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                        {strandhoot.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-1 ml-2">
                    {strandhoot.is_public ? (
                      <div title="Published">
                        <Globe size={16} className="text-green-600" />
                      </div>
                    ) : (
                      <div title="Draft">
                        <Lock size={16} className="text-gray-400" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Metadata */}
                <div className="flex flex-wrap gap-2">
                  {strandhoot.subject && (
                    <Badge variant="outline" className="text-xs">
                      {strandhoot.subject}
                    </Badge>
                  )}
                  {strandhoot.criteria && (
                    <Badge variant="outline" className="text-xs">
                      Criteria {strandhoot.criteria}
                    </Badge>
                  )}
                  {strandhoot.myp_year && (
                    <Badge variant="outline" className="text-xs">
                      MYP {strandhoot.myp_year}
                    </Badge>
                  )}
                </div>

                {/* Timestamps */}
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar size={12} />
                    Created {formatDate(strandhoot.created_at)}
                  </div>
                  {strandhoot.updated_at && strandhoot.updated_at !== strandhoot.created_at && (
                    <div className="flex items-center gap-1">
                      <Edit size={12} />
                      Updated {formatDate(strandhoot.updated_at)}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2 border-t">
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => onEditStrandhoot(strandhoot.id!)}
                  >
                    <Edit size={14} className="mr-1" />
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      setDuplicateTarget(strandhoot.id!);
                      setNewTitle(`${strandhoot.title} (Copy)`);
                      setShowDuplicateModal(true);
                    }}
                  >
                    <Copy size={14} />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Duplicate Modal */}
      <Dialog open={showDuplicateModal} onOpenChange={setShowDuplicateModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Copy size={20} />
              Duplicate Strandhoot
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                New Title
              </label>
              <Input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Enter title for the duplicate"
                autoFocus
              />
            </div>
            
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowDuplicateModal(false);
                  setDuplicateTarget(null);
                  setNewTitle('');
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleDuplicate}>
                Duplicate
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}