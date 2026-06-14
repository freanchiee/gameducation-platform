'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Label } from '@/app/components/ui/label';
import { Switch } from '@/app/components/ui/switch';
import { Card } from '@/app/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { AUTOSAVE_INTERVAL, BuilderSettings } from '../../constants/builder';

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
  settings: BuilderSettings;
  onUpdateSettings: (settings: Partial<BuilderSettings>) => void;
}

export default function SettingsModal({
  open,
  onClose,
  settings,
  onUpdateSettings,
}: SettingsModalProps) {
  const [localSettings, setLocalSettings] = useState<BuilderSettings>(settings);

  const handleSave = () => {
    onUpdateSettings(localSettings);
    onClose();
  };

  const handleReset = () => {
    setLocalSettings(settings);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Strandhoot Settings</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Basic Information</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Strandhoot Title</Label>
                  <Input
                    id="title"
                    value={localSettings.title}
                    onChange={(e) => setLocalSettings((prev: BuilderSettings) => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter strandhoot title"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={localSettings.description}
                    onChange={(e) => setLocalSettings((prev: BuilderSettings) => ({ ...prev, description: e.target.value }))}
                    placeholder="Enter strandhoot description"
                    rows={3}
                  />
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-4">Auto-Save</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Auto-Save</Label>
                    <p className="text-sm text-gray-600">Automatically save changes as you work</p>
                  </div>
                  <Switch
                    checked={localSettings.autoSave}
                    onCheckedChange={(checked) => 
                      setLocalSettings((prev: BuilderSettings) => ({ ...prev, autoSave: checked }))
                    }
                  />
                </div>

                {localSettings.autoSave && (
                  <div>
                    <Label htmlFor="autoSaveInterval">Auto-Save Interval (seconds)</Label>
                    <Input
                      id="autoSaveInterval"
                      type="number"
                      min="10"
                      max="300"
                      value={localSettings.autoSaveInterval / 1000}
                      onChange={(e) => setLocalSettings((prev: BuilderSettings) => ({ 
                        ...prev, 
                        autoSaveInterval: parseInt(e.target.value) * 1000 
                      }))}
                    />
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="editor" className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Visual Aids</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Show Grid</Label>
                    <p className="text-sm text-gray-600">Display alignment grid in the canvas</p>
                  </div>
                  <Switch
                    checked={localSettings.showGrid}
                    onCheckedChange={(checked) => 
                      setLocalSettings((prev: BuilderSettings) => ({ ...prev, showGrid: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Snap to Grid</Label>
                    <p className="text-sm text-gray-600">Automatically align blocks to grid</p>
                  </div>
                  <Switch
                    checked={localSettings.snapToGrid}
                    onCheckedChange={(checked) => 
                      setLocalSettings((prev: BuilderSettings) => ({ ...prev, snapToGrid: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Show Toolbox</Label>
                    <p className="text-sm text-gray-600">Display the component toolbox sidebar</p>
                  </div>
                  <Switch
                    checked={localSettings.showToolbox}
                    onCheckedChange={(checked) => 
                      setLocalSettings((prev: BuilderSettings) => ({ ...prev, showToolbox: checked }))
                    }
                  />
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-4">Theme</h3>
              
              <div className="space-y-2">
                {['light', 'dark', 'auto'].map((theme) => (
                  <div key={theme} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id={theme}
                      name="theme"
                      checked={localSettings.theme === theme}
                      onChange={() => setLocalSettings((prev: BuilderSettings) => ({ ...prev, theme: theme as 'light' | 'dark' | 'auto' }))}
                    />
                    <Label htmlFor={theme} className="capitalize">
                      {theme} {theme === 'auto' && '(Follow system)'}
                    </Label>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Export Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <Label>Default Export Format</Label>
                  <select 
                    className="w-full mt-1 p-2 border border-gray-300 rounded"
                    value="json"
                  >
                    <option value="json">JSON</option>
                    <option value="pdf">PDF</option>
                    <option value="html">HTML</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Include Student Data</Label>
                    <p className="text-sm text-gray-600">Include response data in exports</p>
                  </div>
                  <Switch defaultChecked={false} />
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-red-50 border-red-200">
              <h3 className="font-semibold mb-4 text-red-800">Danger Zone</h3>
              
              <div className="space-y-3">
                <div>
                  <Button variant="destructive" size="sm">
                    Clear All Data
                  </Button>
                  <p className="text-sm text-red-600 mt-1">
                    This will permanently delete all blocks and settings
                  </p>
                </div>

                <div>
                  <Button variant="outline" size="sm" className="border-red-300 text-red-600">
                    Reset to Defaults
                  </Button>
                  <p className="text-sm text-red-600 mt-1">
                    Reset all settings to default values
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="ghost" onClick={handleReset}>
            Reset
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Settings
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}