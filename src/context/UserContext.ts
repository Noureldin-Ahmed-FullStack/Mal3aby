
import { create } from "zustand";
import { response } from "../types";
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



interface UserFavsState {
  favsList: response[]; 
  setfavsList: (favsList: response[]) => void;
  favsLoading: boolean; 
  setfavsLoading: (favsLoading: boolean) => void;
}

export const useUserFavsContext = create<UserFavsState>((set) => ({
  favsList: [], 
  setfavsList: (favsList) => set({ favsList }),
  favsLoading: true,
  setfavsLoading: (favsLoading) => set({ favsLoading }),
}));