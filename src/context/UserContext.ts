
import { create } from "zustand";
interface userType {
  userName: string,
  _id: string,
  userPFP: string,
}
interface userState {
  userData: userType | null;
  setUserData: (user: userType | null) => void;
};

export const useUserContext = create<userState>((set) => ({
  userData: null,
  setUserData: (userData) => set({ userData: userData }),
}));