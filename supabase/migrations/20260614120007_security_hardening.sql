-- =============================================================================
-- Security hardening — addresses Supabase advisor `function_search_path_mutable`.
-- Pins search_path = '' on the SECURITY DEFINER RLS helpers and fully-qualifies
-- their table references, preventing search_path-injection (e.g. via pg_temp).
-- Bodies are otherwise unchanged from 0001_learnbook_base. Idempotent.
-- =============================================================================

CREATE OR REPLACE FUNCTION public.current_student_id()
RETURNS uuid
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT CASE
    WHEN auth.uid() IS NOT NULL
      THEN (SELECT id FROM public.students WHERE auth_user_id = auth.uid())
    ELSE (auth.jwt() ->> 'student_id')::uuid
  END;
$$;

CREATE OR REPLACE FUNCTION public.teacher_owns_class(p_class_id uuid)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.classes
    WHERE id = p_class_id
      AND teacher_id = auth.uid()
  );
$$;
