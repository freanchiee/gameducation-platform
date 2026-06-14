// Complete Enhanced src/app/strandhoot-builder/types/strandhoot.ts
// Unified type definitions for the entire Strandhoot Builder system

import { ReactNode } from 'react';

// ====================================
// CORE BLOCK TYPES
// ====================================

/**
 * Core block type that represents any draggable/droppable component in the builder
 * ✅ UPDATED: Added 'iframe' and 'pdf' to the type union
 */
export type BlockType = {
  id: string;
  type: 'welcome' | 'strand' | 'tip' | 'rich' | 'evaluation' | 'embed' | 'mcq' | 'short' | 'extended' | 'fill' | 'iframe' | 'pdf'| 'tab';
  label?: string;
  icon?: string;
  content: Record<string, unknown>;
  questionId?: string;
  // Metadata fields
  _createdAt?: string;
  _updatedAt?: string;
  _builderId?: string;
  _copiedFrom?: string;
  _isSkeletonGenerated?: boolean;
};

/**
 * Block content types for different block types
 * ✅ NEW: Added IframeBlockContent and PDFBlockContent
 */
export interface WelcomeBlockContent {
  title?: string;
  subtitle?: string;
  subject?: string;
  criteria?: string;
  myp_year?: string;
  color?: string;
  explorerTitle?: string;
  timeEstimate?: string;
  description?: string;
  badges?: Badge[];
  experiments?: ExperimentType[];
  // Form data
  mainTitle?: string;
  tagline?: string;
  explorerEmoji?: string;
  badgesSectionEmoji?: string;
  badgesSectionTitle?: string;
  experimentsSectionEmoji?: string;
  experimentsSectionTitle?: string;
}

export interface StrandBlockContent {
  title?: string;
  strandId?: string;
  description?: string;
  subject?: string;
  criteria?: string;
  mypYear?: string;
  strandIndex?: number;
  totalStrands?: number;
  level?: number;
  tabs?: Tab[];
  droppedBlocks?: BlockType[];
  evaluationLogic?: EvaluationLogic;
  studentId?: string;
  sessionCode?: string;
  experimentChoice?: 'distance' | 'magnets';
}

export interface MCQBlockContent {
  question?: string;
  questionImage?: string;
  options?: MCQOption[];
  correctIndex?: number;
  evaluation?: EvaluationConfig;
}

export interface QuestionBlockContent {
  question?: string;
  evaluation?: EvaluationConfig;
  correctAnswer?: string;
}

// ✅ NEW: Iframe block content interface
export interface IframeBlockContent {
  url?: string;
  title?: string;
  description?: string;
  width?: string | number;
  height?: string | number;
  allowFullscreen?: boolean;
  sandbox?: string[];
  loading?: 'lazy' | 'eager';
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  customCSS?: string;
  responsive?: boolean;
  aspectRatio?: string;
  showBorder?: boolean;
  borderRadius?: number;
}

// ✅ NEW: PDF block content interface
export interface PDFBlockContent {
  url?: string;
  title?: string;
  description?: string;
  fileName?: string;
  fileSize?: string;
  uploadedAt?: string;
  displayMode?: 'embedded' | 'link' | 'download';
  height?: number;
  allowFullscreen?: boolean;
  showControls?: boolean;
}

// ====================================
// COMPONENT PROP INTERFACES
// ====================================

/**
 * Base props shared by all block components
 */
export interface BaseBlockProps {
  block: BlockType;
  questionId?: string;
  onConfigure?: () => void;
  readOnly?: boolean;
}

/**
 * Props for question-type blocks (MCQ, Short Answer, etc.)
 */
export interface QuestionBlockProps extends BaseBlockProps {
  onUpdate?: (updated: BlockType) => void;
  onDelete?: () => void;
}

/**
 * ✅ NEW: Props for Iframe Block component
 */
export interface IframeBlockProps extends BaseBlockProps {
  onUpdate: (updated: BlockType) => void;
  onDelete: () => void;
}

/**
 * ✅ NEW: Props for PDF Block component
 */
export interface PDFBlockProps extends BaseBlockProps {
  onUpdate: (updated: BlockType) => void;
  onDelete: () => void;
}

/**
 * Props for Strand Page Block component
 */
export interface StrandBlockProps extends BaseBlockProps {
  strandIndex: number;
  totalStrands: number;
  allStrandBlocks: BlockType[];
  badges: Badge[];
  onNext: () => void;
  onFinish: () => void;
  onUpdate: (updated: BlockType) => void;
  onDelete: () => void;
}

/**
 * Props for Welcome Block component
 */
export interface WelcomeBlockProps extends BaseBlockProps {
  onUpdate: (updated: BlockType) => void;
  onDelete: () => void;
  onStructureConfirmed?: (details: StructureDetails) => void;
  onGenerateSkeleton?: (structure: StructureDetails) => void;
}

/**
 * Props for Canvas Preview component
 */
export interface CanvasPreviewProps {
  blocks: BlockType[];
  onDrop: (block: BlockType) => void;
  onUpdate: (index: number, updated: BlockType) => void;
  onDelete: (index: number) => void;
  onConfigure?: (index: number) => void;
  onDuplicate?: (index: number) => void;
  onMove?: (fromIndex: number, toIndex: number) => void;
  onStructureConfirmed?: (params: StructureDetails) => void;
  onGenerateSkeleton?: (structure: StructureDetails) => void;
  selectedIndex?: number | null;
  onSelectBlock?: (index: number | null) => void;
  readOnly?: boolean;
}

// ====================================
// TAB SYSTEM TYPES
// ====================================

/**
 * Tab interface for StrandPageBlock tabbed content
 */
export interface Tab {
  id: string;
  title: string;
  content: string; // Rich text HTML content
  droppedBlocks: BlockType[]; // Blocks dropped in this tab
  _createdAt?: string;
  _updatedAt?: string;
}

/**
 * Tab management props
 */
export interface TabManagerProps {
  tabs: Tab[];
  activeTabId: string;
  readOnly?: boolean;
  onTabChange: (tabId: string) => void;
  onTabUpdate: (tabId: string, updated: Partial<Tab>) => void;
  onTabAdd: () => void;
  onTabRemove: (tabId: string) => void;
}

// ====================================
// DRAG & DROP TYPES
// ====================================

/**
 * React DnD drag item type
 */
export interface DragItem extends BlockType {
  // Additional drag-specific properties can be added here
}

/**
 * React DnD drop result type
 */
export interface DropResult {
  handled: boolean;
  tabId?: string;
  blockId?: string;
  targetType?: 'canvas' | 'strand';
}

/**
 * Drag and drop refs for type safety
 */
export type DragRef = React.RefObject<HTMLDivElement>;
export type DropRef = React.RefObject<HTMLDivElement>;

/**
 * Drag state interface
 */
export interface DragState {
  isDragging: boolean;
  dragTarget: 'canvas' | 'strand' | null;
  dragItem: DragItem | null;
  dropTarget?: 'canvas' | 'strand' | null;
  strandId?: string | null;
}

// ====================================
// BUILDER STATE TYPES
// ====================================

/**
 * Main builder state interface
 */
export interface BuilderState {
  blocks: BlockType[];
  title: string;
  description: string;
  unsavedChanges: boolean;
  lastSaved: Date | null;
}

/**
 * Builder statistics
 * ✅ UPDATED: Added iframeBlocks and pdfBlocks to stats
 */
export interface BuilderStats {
  totalBlocks: number;
  questionBlocks: number;
  strandBlocks: number;
  welcomeBlocks: number;
  tipBlocks: number;
  richBlocks: number;
  embedBlocks: number;
  evaluationBlocks: number;
  iframeBlocks: number;
  pdfBlocks: number;
}

// ====================================
// EVALUATION SYSTEM TYPES
// ====================================

/**
 * Evaluation configuration for question blocks
 */
export interface EvaluationConfig {
  keywords?: string[];
  concepts?: string[];
  exemplars?: string[];
  suggestions?: string[];
  correctAnswer?: string;
  correctIndex?: number; // For MCQ
}

/**
 * Advanced evaluation logic for strand blocks
 */
export interface EvaluationLogic {
  keywords: string[];
  concepts: string[];
  exemplars?: string[];
  suggestions?: string[];
}

/**
 * Evaluation result from strand processing
 */
export interface EvaluationResult {
  level: number;
  keywords: string[];
  concepts: string[];
  suggestions: string[];
  matchedKeywords?: Array<{ label: string; level: number }>;
  matchedConcepts?: Array<{ label: string; level: number }>;
}

// ====================================
// CONTENT TYPES
// ====================================

/**
 * Badge interface with all required fields
 */
export interface Badge {
  emoji: string;
  label: string;
  description: string; // Required for consistency
}

/**
 * Experiment type for welcome blocks
 */
export interface ExperimentType {
  title: string;
  subtitle: string;
}

/**
 * MCQ Option interface
 */
export interface MCQOption {
  text: string;
  imageUrl?: string;
}

/**
 * Structure details for subject/criteria configuration
 */
export interface StructureDetails {
  subject: string;
  criteria: string;
  mypYear: string;
}

/**
 * Welcome form data with all possible fields
 */
export interface WelcomeFormData {
  mainTitle: string;
  tagline: string;
  explorerEmoji: string;
  explorerTitle: string;
  timeEstimate: string;
  description: string;
  subject: string;
  criteria: string;
  mypYear: string;
  badgesSectionEmoji: string;
  badgesSectionTitle: string;
  experimentsSectionEmoji: string;
  experimentsSectionTitle: string;
  badges: Badge[];
  experiments: ExperimentType[];
  color: string;
}

// ====================================
// VALIDATION & FILE UPLOAD TYPES
// ====================================

/**
 * ✅ NEW: File upload result interface
 */
export interface FileUploadResult {
  success: boolean;
  url?: string;
  error?: string;
  fileName?: string;
  fileSize?: number;
  fileType?: string;
}

/**
 * ✅ NEW: URL validation result interface
 */
export interface URLValidationResult {
  isValid: boolean;
  isEmbeddable: boolean;
  contentType?: string;
  error?: string;
  suggestions?: string[];
}

/**
 * ✅ NEW: Sandbox permission options for iframe
 */
export type SandboxPermission = 
  | 'allow-forms'
  | 'allow-scripts'
  | 'allow-same-origin'
  | 'allow-popups'
  | 'allow-downloads'
  | 'allow-presentation'
  | 'allow-modals'
  | 'allow-orientation-lock'
  | 'allow-pointer-lock'
  | 'allow-top-navigation';

/**
 * ✅ NEW: PDF display modes
 */
export type PDFDisplayMode = 'embedded' | 'link' | 'download';

/**
 * ✅ NEW: Device preview modes for responsive testing
 */
export type DevicePreviewMode = 'desktop' | 'tablet' | 'mobile';

// ====================================
// BACKWARD COMPATIBILITY ALIASES
// ====================================

/**
 * @deprecated Use Badge instead
 */
export type BadgeType = Badge;

// ====================================
// RESPONSE & SESSION TYPES
// ====================================

/**
 * Response record for database storage
 */
export interface ResponseRecord {
  id: string;
  session_code: string;
  student_id: string;
  player_name: string;
  is_typing?: boolean;
  updated_at?: string;
  strand1_level?: number;
  strand2_level?: number;
  strand3_level?: number;
  strand4_level?: number;
  strand5_level?: number;
  participants?: {
    avatar_svg?: string;
  };
  [key: string]: string | number | boolean | null | undefined | object;
}

/**
 * Session management types
 */
export interface SessionConfig {
  sessionCode: string;
  studentId: string;
  experimentChoice?: 'distance' | 'magnets';
  currentStrand?: number;
}

// ====================================
// MODAL & UI TYPES
// ====================================

/**
 * Configuration modal props
 */
export interface ConfigureEvaluationModalProps {
  open: boolean;
  onClose: () => void;
  initial?: EvaluationLogic;
  onSave: (logic: EvaluationLogic) => void;
  mode?: 'open' | 'mcq';
  options?: MCQOption[];
  questionId?: string;
}

/**
 * Block wrapper props for canvas rendering
 */
export interface BlockWrapperProps {
  children: ReactNode;
  block: BlockType;
  index: number;
  isSelected?: boolean;
  onSelect?: () => void;
  onConfigure?: () => void;
  onDuplicate?: () => void;
  onDelete?: () => void;
  readOnly?: boolean;
}

// ====================================
// UTILITY TYPES
// ====================================

/**
 * Color options for theming
 */
export type ColorOption = 'orange' | 'blue' | 'green' | 'purple';

/**
 * MYP Years
 */
export type MYPYear = '1' | '2' | '3' | '4' | '5';

/**
 * MYP Criteria
 */
export type MYPCriteria = 'A' | 'B' | 'C' | 'D';

/**
 * Experiment choices
 */
export type ExperimentChoice = 'distance' | 'magnets';

/**
 * Block action types for context menus
 * ✅ UPDATED: Added iframe and pdf specific actions
 */
export type BlockAction = 
  | 'configure' 
  | 'duplicate' 
  | 'delete' 
  | 'move-up' 
  | 'move-down'
  | 'validate-url'
  | 'preview-iframe'
  | 'download-pdf'
  | 'fullscreen';

/**
 * Save format for export/import
 */
export interface StrandhootSaveFormat {
  id: string;
  version: string;
  title: string;
  description: string;
  blocks: BlockType[];
  createdAt: string;
  updatedAt: string;
  stats: BuilderStats;
  metadata?: {
    builderId: string;
    exportedAt: string;
    [key: string]: unknown;
  };
}

// ====================================
// CONTEXT TYPES
// ====================================

/**
 * Strandhoot builder context value
 */
export interface StrandhootBuilderContextValue {
  builderState: BuilderState;
  updateBuilderState: (updates: Partial<BuilderState>) => void;
  selectedBlockIndex: number | null;
  setSelectedBlockIndex: (index: number | null) => void;
  isPreviewMode: boolean;
  setIsPreviewMode: (preview: boolean) => void;
  dragState: DragState;
  setDragState: (state: Partial<DragState>) => void;
}

// ====================================
// VALIDATION TYPES
// ====================================

/**
 * Validation result interface
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  score?: number;
}

/**
 * Block validation function type
 */
export type BlockValidator = (block: BlockType) => ValidationResult;

// ====================================
// DRAG & DROP CONTEXT TYPES
// ====================================

/**
 * ✅ NEW: Drag and drop context interface
 */
export interface DragDropContextValue {
  dragState: DragState;
  setDragState: (state: Partial<DragState>) => void;
  completeDrop: () => void;
}

// ====================================
// SAVE & PUBLISH TYPES
// ====================================

/**
 * ✅ NEW: Save data interface for SavePublishPanel
 */
export interface SaveData {
  title: string;
  description: string;
  blocks: BlockType[];
  metadata: {
    subject?: string;
    criteria?: string;
    mypYear?: string;
    tags?: string[];
    estimatedDuration?: number;
    targetAudience?: string;
    difficulty?: 'beginner' | 'intermediate' | 'advanced';
    category?: string;
  };
  settings: {
    visibility: 'private' | 'public' | 'unlisted';
    allowComments?: boolean;
    allowRating?: boolean;
    allowCopying?: boolean;
    requireLogin?: boolean;
  };
}

/**
 * ✅ NEW: Save result interface
 */
export interface SaveResult {
  success: boolean;
  id?: string;
  error?: string;
}

/**
 * ✅ NEW: Publish result interface
 */
export interface PublishResult {
  success: boolean;
  error?: string;
}

// ====================================
// TYPE RE-EXPORTS FOR CONVENIENCE
// ====================================

// Main export - all types are already exported above individually
// This section is just for documentation of available types

/*
 * Available Type Exports:
 * 
 * Core Types:
 * - BlockType (✅ UPDATED with iframe/pdf)
 * - Badge
 * - ExperimentType
 * - StructureDetails
 * - Tab
 * - MCQOption
 * 
 * ✅ NEW Content Types:
 * - IframeBlockContent
 * - PDFBlockContent
 * - FileUploadResult
 * - URLValidationResult
 * 
 * ✅ NEW Component Props:
 * - IframeBlockProps
 * - PDFBlockProps
 * 
 * Component Props:
 * - BaseBlockProps
 * - StrandBlockProps
 * - WelcomeBlockProps
 * - CanvasPreviewProps
 * - QuestionBlockProps
 * - TabManagerProps
 * 
 * Content Types:
 * - WelcomeBlockContent
 * - StrandBlockContent
 * - MCQBlockContent
 * - QuestionBlockContent
 * - WelcomeFormData
 * 
 * State Management:
 * - BuilderState
 * - BuilderStats (✅ UPDATED with new block counts)
 * - SessionConfig
 * 
 * Evaluation System:
 * - EvaluationConfig
 * - EvaluationLogic
 * - EvaluationResult
 * 
 * Drag & Drop:
 * - DragItem
 * - DropResult
 * - DragRef
 * - DropRef
 * - DragState (✅ UPDATED)
 * - DragDropContextValue (✅ NEW)
 * 
 * UI & Modal:
 * - ConfigureEvaluationModalProps
 * - BlockWrapperProps
 * 
 * ✅ NEW Utility Types:
 * - SandboxPermission
 * - PDFDisplayMode
 * - DevicePreviewMode
 * - BlockAction (✅ UPDATED)
 * 
 * ✅ NEW Save & Publish:
 * - SaveData
 * - SaveResult
 * - PublishResult
 * 
 * Utility Types:
 * - ColorOption
 * - MYPYear
 * - MYPCriteria
 * - ExperimentChoice
 * 
 * Validation:
 * - ValidationResult
 * - BlockValidator
 * 
 * Data Storage:
 * - ResponseRecord
 * - StrandhootSaveFormat
 * 
 * Context:
 * - StrandhootBuilderContextValue
 */