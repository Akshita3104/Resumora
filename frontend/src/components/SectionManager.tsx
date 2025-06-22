
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { GripVertical, Plus, Settings, Trash2 } from 'lucide-react';
import { ResumeData } from '@/pages/Index';

interface SectionManagerProps {
  resumeData: ResumeData;
  setResumeData: (data: ResumeData) => void;
}

export const SectionManager = ({ resumeData, setResumeData }: SectionManagerProps) => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [newSectionTitle, setNewSectionTitle] = useState('');

  const sectionNames = {
    summary: 'Professional Summary',
    experience: 'Work Experience',
    education: 'Education',
    skills: 'Skills',
    projects: 'Projects',
    certifications: 'Certifications',
    awards: 'Awards & Achievements',
  };

  const handleDragStart = (sectionId: string) => {
    setDraggedItem(sectionId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (!draggedItem) return;

    const currentIndex = resumeData.sectionOrder.indexOf(draggedItem);
    if (currentIndex === -1) return;

    const newOrder = [...resumeData.sectionOrder];
    newOrder.splice(currentIndex, 1);
    newOrder.splice(targetIndex, 0, draggedItem);

    setResumeData({
      ...resumeData,
      sectionOrder: newOrder,
    });

    setDraggedItem(null);
  };

  const toggleSection = (sectionId: string, enabled: boolean) => {
    setResumeData({
      ...resumeData,
      enabledSections: {
        ...resumeData.enabledSections,
        [sectionId]: enabled,
      },
    });
  };

  const addCustomSection = () => {
    if (!newSectionTitle.trim()) return;

    const newSection = {
      id: `custom-${Date.now()}`,
      title: newSectionTitle,
      content: '',
    };

    setResumeData({
      ...resumeData,
      customSections: [...resumeData.customSections, newSection],
      sectionOrder: [...resumeData.sectionOrder, newSection.id],
      enabledSections: {
        ...resumeData.enabledSections,
        [newSection.id]: true,
      },
    });

    setNewSectionTitle('');
  };

  const removeCustomSection = (sectionId: string) => {
    setResumeData({
      ...resumeData,
      customSections: resumeData.customSections.filter(s => s.id !== sectionId),
      sectionOrder: resumeData.sectionOrder.filter(id => id !== sectionId),
      enabledSections: Object.fromEntries(
        Object.entries(resumeData.enabledSections).filter(([key]) => key !== sectionId)
      ),
    });
  };

  return (
    <Card className="bg-gray-900/30 border-purple-500/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-purple-400" />
          Section Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Section Order */}
        <div>
          <Label className="text-white mb-3 block">Section Order (Drag to reorder)</Label>
          <div className="space-y-2">
            {resumeData.sectionOrder.map((sectionId, index) => {
              const isCustom = sectionId.startsWith('custom-');
              const customSection = isCustom 
                ? resumeData.customSections.find(s => s.id === sectionId) 
                : null;
              const displayName = isCustom 
                ? customSection?.title || 'Custom Section'
                : sectionNames[sectionId as keyof typeof sectionNames] || sectionId;

              return (
                <div
                  key={sectionId}
                  draggable
                  onDragStart={() => handleDragStart(sectionId)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                  className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg border border-purple-500/20 cursor-move hover:border-purple-500/40 transition-colors"
                >
                  <GripVertical className="w-4 h-4 text-gray-400" />
                  <Checkbox
                    checked={resumeData.enabledSections[sectionId] || false}
                    onCheckedChange={(checked) => toggleSection(sectionId, checked as boolean)}
                  />
                  <span className="text-white flex-1">{displayName}</span>
                  {isCustom && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCustomSection(sectionId)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Add Custom Section */}
        <div className="pt-4 border-t border-purple-500/20">
          <Label className="text-white mb-2 block">Add Custom Section</Label>
          <div className="flex gap-2">
            <Input
              value={newSectionTitle}
              onChange={(e) => setNewSectionTitle(e.target.value)}
              placeholder="Section title (e.g., Languages, Volunteer Work)"
              className="bg-gray-800/50 border-purple-500/30 text-white focus:border-purple-500"
            />
            <Button
              onClick={addCustomSection}
              disabled={!newSectionTitle.trim()}
              className="bg-purple-500 hover:bg-purple-600 text-white"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
