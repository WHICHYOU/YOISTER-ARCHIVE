export function getOrCreateUserId(): string {
  let userId = localStorage.getItem('yoister_user');
  if (!userId) {
    userId = `anon-${Date.now()}`;
    localStorage.setItem('yoister_user', userId);
  }
  return userId;
}