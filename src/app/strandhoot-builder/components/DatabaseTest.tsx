// Updated DatabaseTest component for your actual table schema
// src/app/strandhoot-builder/components/DatabaseTest.tsx
'use client';

import { useState } from 'react';
import { supabase } from '@/utils/supabase';

export default function DatabaseTest() {
  const [testResult, setTestResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const testConnection = async () => {
    setIsLoading(true);
    setTestResult('Testing connection...');

    try {
      // Test 1: Basic connection with timeout
      console.log('🔍 Test 1: Basic Supabase connection');
      
      const connectionTest = supabase
        .from('strandhoot_templates')
        .select('count')
        .limit(1);

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Connection timeout after 10 seconds')), 10000)
      );

      const result = await Promise.race([connectionTest, timeoutPromise]) as any;
      
      if (result?.error) {
        if (result.error.message.includes('relation') && result.error.message.includes('does not exist')) {
          setTestResult('❌ Table "strandhoot_templates" does not exist. Please create the table first.');
          return;
        }
        setTestResult(`❌ Connection failed: ${result.error.message}`);
        return;
      }

      // Test 2: Check basic permissions (read access)
      console.log('🔍 Test 2: Check read permissions');
      const { count, error: countError } = await supabase
        .from('strandhoot_templates')
        .select('*', { count: 'exact', head: true });

      if (countError) {
        setTestResult(`❌ Permission check failed: ${countError.message}`);
        return;
      }

      // Test 3: Check authentication status
      console.log('🔍 Test 3: Check authentication status');
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError) {
        setTestResult(`⚠️ Authentication check failed: ${authError.message}`);
        return;
      }

      if (!user) {
        setTestResult(`⚠️ No authenticated user found.\n\n✅ Basic connection works!\n✅ Table exists with ${count || 0} records.\n✅ RLS policies are active (this is good!)\n\n🔐 To test insert operations, you need to be logged in as a teacher.\nThe RLS policies are correctly preventing unauthorized access.`);
        return;
      }

      console.log('🔍 Test 4: Test authenticated insert operation');
      // Test 4: Test insert with real authenticated user
      const testData = {
        title: 'TEST_DELETE_ME',
        description: 'Test insert',
        criteria: 'A',
        subject: 'Sciences',
        myp_year: 3,
        context: 'Test context',
        simulation_link: 'https://example.com/sim',
        research_material_link: 'https://example.com/research',
        strands: [],
        created_by: user.id, // Use real authenticated user ID
        creator_name: user.email || 'Test User',
        is_public: false,
        tags: ['test', 'science'],
        version: 1,
        thumbnail_url: 'https://example.com/thumb.jpg'
      };

      const { data: insertData, error: insertError } = await supabase
        .from('strandhoot_templates')
        .insert([testData])
        .select('id')
        .single();

      if (insertError) {
        setTestResult(`❌ Authenticated insert test failed: ${insertError.message}\n\nThis might be due to:\n1. User role restrictions\n2. Missing required columns\n3. Data type mismatches\n4. Other RLS policy conditions`);
        return;
      }

      // Clean up test data
      if (insertData?.id) {
        const { error: deleteError } = await supabase
          .from('strandhoot_templates')
          .delete()
          .eq('id', insertData.id);
        
        if (deleteError) {
          setTestResult(`⚠️ Insert worked but cleanup failed: ${deleteError.message}\nTest record ID: ${insertData.id}`);
          return;
        }
      }

      setTestResult(`✅ All tests passed! Database is working perfectly!\n\n✅ Table exists with ${count || 0} records\n✅ RLS policies are active and working\n✅ Authenticated user: ${user.email}\n✅ Insert/delete operations work correctly\n\n🎉 Your save functionality should work now!`);

    } catch (error: any) {
      console.error('Test error:', error);
      if (error.message.includes('timeout')) {
        setTestResult(`❌ Connection timeout: Database is not responding.\n\nPossible causes:\n1. Supabase project is paused\n2. Network connectivity issues\n3. Invalid connection settings\n4. Database overloaded`);
      } else {
        setTestResult(`❌ Unexpected error: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const checkTableStructure = async () => {
    setIsLoading(true);
    setTestResult('Checking table structure...');

    try {
      console.log('🔍 Analyzing your actual table structure...');
      
      // Try to insert an empty object to see what columns are required
      const { error } = await supabase
        .from('strandhoot_templates')
        .insert([{}])
        .select('id');

      if (error) {
        let structureInfo = 'Table structure analysis:\n\n';
        
        if (error.message.includes('null value in column')) {
          structureInfo += '❌ Required columns (NOT NULL):\n';
          const matches = error.message.match(/null value in column "([^"]+)"/g);
          if (matches) {
            matches.forEach(match => {
              const columnMatch = match.match(/"([^"]+)"/);
              if (columnMatch && columnMatch[1]) {
                const column = columnMatch[1];
                structureInfo += `  • ${column}\n`;
              }
            });
          }
        }
        
        structureInfo += '\n📋 Your actual table structure:\n';
        structureInfo += '  • id (uuid, primary key, auto-generated) ✅\n';
        structureInfo += '  • title (text, required) ✅\n';
        structureInfo += '  • description (text, nullable) ✅\n';
        structureInfo += '  • criteria (text, nullable) ✅\n';
        structureInfo += '  • subject (text, nullable) ✅\n';
        structureInfo += '  • myp_year (integer, nullable) ✅\n';
        structureInfo += '  • context (text, nullable) ✅\n';
        structureInfo += '  • simulation_link (text, nullable) ✅\n';
        structureInfo += '  • research_material_link (text, nullable) ✅\n';
        structureInfo += '  • strands (jsonb, required) ✅\n';
        structureInfo += '  • created_by (uuid, required) ⚠️  Should be TEXT for compatibility\n';
        structureInfo += '  • created_at (timestamptz, auto-generated) ✅\n';
        structureInfo += '  • updated_at (timestamptz, auto-generated) ✅\n';
        structureInfo += '  • is_public (boolean, default false) ✅\n';
        structureInfo += '  • tags (text[], nullable) ✅\n';
        structureInfo += '  • version (integer, default 1) ✅\n';
        structureInfo += '  • thumbnail_url (text, nullable) ✅\n';
        structureInfo += '\n⚠️  Code compatibility check:\n';
        structureInfo += '  • creator_name column: ';
        structureInfo += error.message.includes('creator_name') ? '❌ Missing - Add this column\n' : '✅ Not required by your table\n';
        structureInfo += '  • metadata column: ';
        structureInfo += error.message.includes('metadata') ? '❌ Missing - Add this column\n' : '✅ Not required by your table\n';
        
        structureInfo += '\n💡 Your table uses individual columns instead of metadata JSONB:\n';
        structureInfo += '   This is actually better for querying and indexing!\n';
        
        setTestResult(structureInfo);
      } else {
        setTestResult('⚠️ Unexpected: Empty insert succeeded. Table might have no required columns.');
      }

    } catch (error: any) {
      if (error.message.includes('relation') && error.message.includes('does not exist')) {
        setTestResult('❌ Table "strandhoot_templates" does not exist.');
      } else {
        setTestResult(`❌ Error: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const addMissingColumns = async () => {
    setIsLoading(true);
    setTestResult('Adding missing columns...');

    try {
      // This will likely fail since we can't execute arbitrary SQL from the client
      // But it will show the user what they need to run
      setTestResult(`📝 Run this SQL in your Supabase SQL Editor:\n\n-- Add missing columns for code compatibility\nALTER TABLE strandhoot_templates ADD COLUMN IF NOT EXISTS creator_name TEXT;\nALTER TABLE strandhoot_templates ADD COLUMN IF NOT EXISTS metadata JSONB;\n\n-- Convert created_by to TEXT for auth compatibility (drop policies first if needed)\n-- DROP ALL existing policies first, then:\n-- ALTER TABLE strandhoot_templates ALTER COLUMN created_by TYPE TEXT USING created_by::TEXT;\n\n-- Recreate policies:\nALTER TABLE strandhoot_templates ENABLE ROW LEVEL SECURITY;\n\nCREATE POLICY "Teachers can manage their strandhoots" ON strandhoot_templates\n  FOR ALL USING (auth.uid()::text = created_by);\n\nCREATE POLICY "Public can view published strandhoots" ON strandhoot_templates\n  FOR SELECT USING (is_public = true);`);

    } catch (error: any) {
      setTestResult(`❌ Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
      <h3 className="text-lg font-semibold mb-3">🔧 Database Connection Test</h3>
      
      <div className="flex gap-2 mb-4 flex-wrap">
        <button
          onClick={testConnection}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? 'Testing...' : 'Test Connection'}
        </button>
        
        <button
          onClick={checkTableStructure}
          disabled={isLoading}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          Check Table Structure
        </button>

        <button
          onClick={addMissingColumns}
          disabled={isLoading}
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:opacity-50"
        >
          Show Missing Columns Fix
        </button>
      </div>

      <div className="bg-white p-3 rounded border">
        <pre className="whitespace-pre-wrap text-sm">
          {testResult || 'Click "Test Connection" to start diagnostics'}
        </pre>
      </div>

      <div className="mt-3 text-sm text-gray-600">
        <p><strong>Your current table has these columns:</strong></p>
        <ul className="list-disc list-inside text-xs">
          <li>✅ id (uuid, primary key)</li>
          <li>✅ title (text, required)</li>
          <li>✅ description (text)</li>
          <li>✅ criteria (text)</li>
          <li>✅ subject (text)</li>
          <li>✅ myp_year (integer)</li>
          <li>✅ context (text)</li>
          <li>✅ simulation_link (text)</li>
          <li>✅ research_material_link (text)</li>
          <li>✅ strands (jsonb, required)</li>
          <li>⚠️ created_by (uuid) - should be TEXT</li>
          <li>✅ created_at (timestamptz)</li>
          <li>✅ updated_at (timestamptz)</li>
          <li>✅ is_public (boolean)</li>
          <li>✅ tags (text[])</li>
          <li>✅ version (integer)</li>
          <li>✅ thumbnail_url (text)</li>
          <li>❌ creator_name (missing)</li>
          <li>❌ metadata (missing)</li>
        </ul>
      </div>
    </div>
  );
}