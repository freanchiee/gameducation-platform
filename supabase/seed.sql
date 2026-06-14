-- Seed data for local/dev. Applied by `supabase db reset`.
-- Worlds are kept in sync with lib/worlds/templates.ts (ported in Phase 4).

INSERT INTO worlds (slug, display_name, subject_accent) VALUES
  ('cellbook',      'CellBook',      '{"accent":"bg-mint text-navy","cover":"bg-gradient-to-br from-green to-mint","avatar":"🧫"}'),
  ('organistagram', 'Organistagram', '{"accent":"bg-green text-white","cover":"bg-gradient-to-br from-green to-mint","avatar":"🌿"}'),
  ('reactagram',    'Reactagram',    '{"accent":"bg-red text-white","cover":"bg-gradient-to-br from-red-deep to-red","avatar":"⚗️"}'),
  ('physigram',     'Physigram',     '{"accent":"bg-blue-band text-white","cover":"bg-gradient-to-br from-blue-band to-navy-2","avatar":"🧲"}')
ON CONFLICT (slug) DO NOTHING;
