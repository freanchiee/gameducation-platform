export function createJoinCode(length = 6): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < length; i += 1) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export function createSessionCode(length = 5): string {
  return createJoinCode(length);
}

export function buildJoinLink(origin: string, joinCode: string): string {
  return `${origin}/join/${joinCode}`;
}
