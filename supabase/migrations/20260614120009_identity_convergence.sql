-- =============================================================================
-- Identity convergence.
--
-- Two identity models coexist: `profiles(id, role)` (canonical role, keyed to
-- auth.users — used by flippity) and `students` (rich learner record keyed via
-- auth_user_id — used by Learnbook). Choose-role is the single onboarding path:
-- it writes the profile role for everyone, and for students it provisions the
-- linked `students` row via the primitive below.
--
-- ensure_current_student(): SECURITY DEFINER so it can create the caller's own
-- students row despite the service-role-only INSERT policy. It only ever writes
-- a row for auth.uid(), so it is safe to expose to authenticated users.
-- Idempotent.
-- =============================================================================

CREATE OR REPLACE FUNCTION public.ensure_current_student(p_display_name text DEFAULT NULL)
RETURNS uuid
LANGUAGE plpgsql VOLATILE SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_id    uuid;
  v_email text;
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN NULL;
  END IF;

  SELECT id INTO v_id FROM public.students WHERE auth_user_id = auth.uid();
  IF v_id IS NOT NULL THEN
    RETURN v_id;
  END IF;

  v_email := (auth.jwt() ->> 'email');

  INSERT INTO public.students (auth_user_id, display_name, email)
  VALUES (
    auth.uid(),
    COALESCE(NULLIF(p_display_name, ''), NULLIF(split_part(COALESCE(v_email, ''), '@', 1), ''), 'Student'),
    v_email
  )
  ON CONFLICT (auth_user_id) DO NOTHING;

  SELECT id INTO v_id FROM public.students WHERE auth_user_id = auth.uid();
  RETURN v_id;
END;
$$;

-- Callable by signed-in users only (it provisions a row for the caller).
REVOKE EXECUTE ON FUNCTION public.ensure_current_student(text) FROM anon;
GRANT  EXECUTE ON FUNCTION public.ensure_current_student(text) TO authenticated;
