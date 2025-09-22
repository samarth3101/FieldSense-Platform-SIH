import type { ProfileData } from "../../types/profile";

export function readUserFromStorage(): ProfileData {
  const keys = ["fs_user","user","userData","loginResponse","auth_user"];
  let name = "", email = "", mobile = "", language: "hi"|"en" = (localStorage.getItem("fs_language") as any) || "hi";
  for (const k of keys) {
    try {
      const raw = localStorage.getItem(k);
      if (raw) {
        const p = JSON.parse(raw);
        name = p?.name || p?.fullName || p?.user?.name || name;
        email = p?.email || p?.user?.email || email;
        mobile = p?.phone || p?.mobile || p?.user?.phone || mobile;
      }
    } catch {}
  }
  const avatar = localStorage.getItem("fs_avatar") || "";
  return { name, email, mobile, language, avatar };
}

export function writeUserToStorage(upd: Partial<ProfileData>) {
  const current = readUserFromStorage();
  const merged: ProfileData = { ...current, ...upd };
  localStorage.setItem("fs_user", JSON.stringify({ name: merged.name, email: merged.email, phone: merged.mobile }));
  localStorage.setItem("user", JSON.stringify({ name: merged.name, email: merged.email, phone: merged.mobile }));
  localStorage.setItem("fs_language", merged.language);
  if (upd.avatar !== undefined) localStorage.setItem("fs_avatar", upd.avatar || "");
}
