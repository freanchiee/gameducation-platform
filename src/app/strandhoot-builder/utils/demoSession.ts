// Phase 1: Demo Session Creation Utils
// src/app/strandhoot-builder/utils/demoSession.ts

import { supabase } from '@/utils/supabase';

export interface DemoSessionOptions {
  strandhootId: string;
  userId?: string;
  cleanupAfterMinutes?: number;
}

export async function createDemoSession({
  strandhootId,
  userId = 'preview-user',
  cleanupAfterMinutes = 30
}: DemoSessionOptions) {
  const demoCode = `DEMO-${Date.now().toString().slice(-6)}`;
  
  try {
    // Create demo session
    const { data: session, error: sessionError } = await supabase
      .from('sessions')
      .insert({
        session_code: demoCode,
        strandhoot_template_id: strandhootId,
        status: 'active',
        is_demo: true,
        created_by: userId,
        max_participants: 1,
        settings: {
          is_preview: true,
          cleanup_after: cleanupAfterMinutes * 60 * 1000,
          created_at: new Date().toISOString()
        }
      })
      .select()
      .single();

    if (sessionError) throw sessionError;

    // Create demo participant
    const { error: participantError } = await supabase
      .from('participants')
      .insert({
        session_code: demoCode,
        student_id: userId,
        player_name: 'Preview User',
        is_demo: true,
        status: 'active',
        avatar_svg: generatePreviewAvatar()
      });

    if (participantError) throw participantError;

    console.log('✅ Demo session created:', demoCode);
    return demoCode;

  } catch (error) {
    console.error('❌ Failed to create demo session:', error);
    throw error;
  }
}

export async function cleanupDemoSession(sessionCode: string) {
  try {
    console.log('🧹 Cleaning up demo session:', sessionCode);

    // Clean up in reverse order of dependencies
    await supabase.from('responses')
      .delete()
      .eq('session_code', sessionCode);

    await supabase.from('participants')
      .delete()
      .eq('session_code', sessionCode);

    await supabase.from('sessions')
      .delete()
      .eq('session_code', sessionCode)
      .eq('is_demo', true); // Safety check

    console.log('✅ Demo session cleaned up successfully');
  } catch (error) {
    console.error('❌ Failed to cleanup demo session:', error);
  }
}

export async function cleanupExpiredDemoSessions() {
  const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000).toISOString();
  
  try {
    const { data: expiredSessions } = await supabase
      .from('sessions')
      .select('session_code')
      .eq('is_demo', true)
      .lt('created_at', thirtyMinutesAgo);

    if (expiredSessions?.length) {
      for (const session of expiredSessions) {
        await cleanupDemoSession(session.session_code);
      }
      console.log(`🧹 Cleaned up ${expiredSessions.length} expired demo sessions`);
    }
  } catch (error) {
    console.error('❌ Failed to cleanup expired sessions:', error);
  }
}

function generatePreviewAvatar(): string {
  // Simple SVG avatar for preview user
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#3B82F6"/>
    <circle cx="50" cy="40" r="15" fill="white"/>
    <ellipse cx="50" cy="75" rx="20" ry="15" fill="white"/>
    <text x="50" y="95" text-anchor="middle" fill="#1E40AF" font-size="8">PREVIEW</text>
  </svg>`;
}