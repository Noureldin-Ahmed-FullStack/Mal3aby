// src/store/themeStore.ts

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

// export const useUserContext = create<userState>((set) => ({
//   // Initialize the user from local storage and apply the class
//   userData: (() => {
//     const loadedUser = loadFromLocalStorage('userDataStorage');

//     if (loadedUser && loadedUser != "undefined") {

//       return JSON.parse(loadedUser);
//     }
//     else return null
//   })(),

//   // Function to set a specific theme
//   setUserData: (userData) => {
//     saveToLocalStorage('userDataStorage', JSON.stringify(userData)); // Save the userDataValues to local storage
//     set({ userData });
//   },


// }));
export const useUserContext = create<userState>((set) => ({
  userData: null,
  setUserData: (userData) => set({ userData: userData }),
}));