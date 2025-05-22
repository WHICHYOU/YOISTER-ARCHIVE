export function getOrCreateUserId(): string {
  if (typeof window === "undefined") return "server-user";
  let id = localStorage.getItem("yoister_user");
  if (!id) {
    id = "user-" + Math.random().toString(36).substring(2, 15);
    localStorage.setItem("yoister_user", id);
  }
  return id;
}
