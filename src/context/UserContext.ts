
import { create } from "zustand";
interface userType {
  name: string,
  _id: string,
  userPFP: string,
  email: string,
  About?: string
  role: string
}
interface userState {
  userData: userType | null;
  setUserData: (user: userType | null) => void;
};

export const useUserContext = create<userState>((set) => ({
  userData: null,
  setUserData: (userData) => set({ userData: userData }),
}));