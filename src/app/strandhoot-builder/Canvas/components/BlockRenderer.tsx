'use client';

import React from 'react';
import WelcomeBlock from '../../blocks/WelcomeBlock';
import StrandPageBlock from '../../blocks/StrandPageBlock';
import TipBlock from '../../blocks/TipBlock';
import RichEditorBlock from '../../blocks/RichEditorBlock';
import EvaluationBoxBlock from '../../blocks/EvaluationBoxBlock';
import MultimediaEmbedBlock from '../../blocks/MultimediaEmbedBlock';
import MCQBlock from '../../blocks/MCQBlock';
import ShortAnswerBlock from '../../blocks/ShortAnswerBlock';
import ExtendedResponseBlock from '../../blocks/ExtendedResponseBlock';
import FillInTheBlankBlock from '../../blocks/FillInTheBlankBlock';
import IframeBlock  from '../../blocks/IframeBlock';
import PDFBlock from '../../blocks/IframeBlock';
import TabBlock from '../../blocks/TabBlock';
import type { BlockType, Badge } from '../../types/strandhoot';

interface BlockRendererProps {
  block: BlockType;
  index: number;
  questionId?: string;
  readOnly?: boolean;
  onUpdate: (updated: BlockType) => void;
  onDelete: () => void;
  onConfigure?: () => void;
  strandIndex?: number;
  totalStrands?: number;
  allStrandBlocks?: BlockType[];
  badges?: Badge[];
  onNext?: () => void;
  onFinish?: () => void;
  onStructureConfirmed?: (params: {
    subject: string;
    criteria: string;
    mypYear: string;
  }) => void;
  onGenerateSkeleton?: (structure: {
    subject: string;
    criteria: string;
    mypYear: string;
  }) => void;
}

export default function BlockRenderer({
  block,
  index: _index, // Prefixed to indicate it's intentionally unused
  questionId,
  readOnly = false,
  onUpdate,
  onDelete,
  onConfigure,
  strandIndex = 0,
  totalStrands = 1,
  allStrandBlocks = [],
  badges = [],
  onNext = () => {},
  onFinish = () => {},
  onStructureConfirmed,
  onGenerateSkeleton,
}: BlockRendererProps) {
  const handleConfigure = () => {
    console.log('🛠️ Configure called for block:', block.type, questionId);
    if (onConfigure) {
      onConfigure();
    }
  };

  const safeBadges: Badge[] = badges.length > 0 ? badges : [];

  switch (block.type) {
    case 'welcome':
      return (
        <WelcomeBlock
          block={block}
          onUpdate={onUpdate}
          onDelete={onDelete}
          readOnly={readOnly}
          onStructureConfirmed={onStructureConfirmed}
          onGenerateSkeleton={onGenerateSkeleton}
        />
      );

    case 'strand':
      return (
        <StrandPageBlock
          block={block}
          strandIndex={strandIndex}
          totalStrands={totalStrands}
          allStrandBlocks={allStrandBlocks}
          badges={safeBadges}
          onNext={onNext}
          onFinish={onFinish}
          onUpdate={onUpdate}
          onDelete={onDelete}
          readOnly={readOnly}
        />
      );

    case 'tip':
      return <TipBlock />;

    case 'rich':
      return (
        <RichEditorBlock
          block={block}
          questionId={questionId}
          onConfigure={readOnly ? undefined : handleConfigure}
        />
      );

    case 'tab':
      return (
        <TabBlock
          block={block}
          readOnly={readOnly}
          onUpdate={onUpdate}
        />
      );

    case 'evaluation':
      return <EvaluationBoxBlock />;

    case 'embed':
      return <MultimediaEmbedBlock />;

    case 'iframe':
      return (
        <IframeBlock
          block={block}
          onUpdate={onUpdate}
          onDelete={onDelete}
          readOnly={readOnly}
        />
      );

    case 'pdf':
      return (
        <PDFBlock
          block={block}
          onUpdate={onUpdate}
          onDelete={onDelete}
          readOnly={readOnly}
        />
      );

    case 'mcq':
      return (
        <MCQBlock
          block={block}
          questionId={questionId}
          onConfigure={readOnly ? undefined : handleConfigure}
        />
      );

    case 'short':
      return (
        <ShortAnswerBlock
          block={block}
          questionId={questionId}
          onConfigure={readOnly ? undefined : handleConfigure}
        />
      );

    case 'extended':
      return (
        <ExtendedResponseBlock
          block={block}
          questionId={questionId}
          onConfigure={readOnly ? undefined : handleConfigure}
        />
      );

    case 'fill':
      return (
        <FillInTheBlankBlock
          block={block}
          questionId={questionId}
          onConfigure={readOnly ? undefined : handleConfigure}
        />
      );

    default:
      return (
        <div className="p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50">
          <div className="text-center text-gray-500">
            <div className="text-2xl mb-2">🧩</div>
            <div className="text-sm font-medium">Unknown Block Type</div>
            <div className="text-xs text-gray-400 mt-1">
              Block type &quot;{block.type}&quot; is not supported
            </div>
            <div className="text-xs text-gray-400 mt-2">
              Block ID: {block.id}
            </div>
          </div>
        </div>
      );
  }
}