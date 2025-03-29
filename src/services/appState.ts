import { User } from '../interfaces/mentorr-interfaces';

let setLoading: (loading: boolean) => void = () => {};
let showMessage: (
  message: string,
  type?: "success" | "error",
  duration?: number
) => void = () => {};
let setUser: (user: User | null) => void = () => {};

export const setGlobalLoadingFunction = (fn: (loading: boolean) => void) => {
  setLoading = fn;
};

export const setGlobalMessageFunction = (
  fn: (message: string, type?: "success" | "error", duration?: number) => void
) => {
  showMessage = fn;
};

export const setGlobalUserFunction = (fn: (user: User | null) => void) => {
  setUser = fn;
};

export const globalLoading = (loading: boolean) => setLoading(loading);
export const globalMessage = (
  message: string,
  type?: "success" | "error",
  duration?: number
) => showMessage(message, type, duration);
export const globalUser = (user: User | null) => setUser(user);
