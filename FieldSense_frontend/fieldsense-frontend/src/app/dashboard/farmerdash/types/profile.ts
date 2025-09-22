export interface ProfileData {
  name: string;
  email: string;
  mobile: string;
  language: "hi" | "en";
  avatar?: string;
}

export interface PasswordPayload {
  email: string;
  new_password: string;
}
