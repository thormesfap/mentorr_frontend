let setLoading: (loading: boolean) => void = () => {};
let showMessage: (
  message: string,
  type?: "success" | "error",
  duration?: number
) => void = () => {};

export const setGlobalLoadingFunction = (fn: (loading: boolean) => void) => {
  setLoading = fn;
};

export const setGlobalMessageFunction = (
  fn: (message: string, type?: "success" | "error", duration?:number) => void
) => {
  showMessage = fn;
};

export const globalLoading = (loading: boolean) => setLoading(loading);
export const globalMessage = (message: string, type?: "success" | "error", duration?:number) =>
  showMessage(message, type, duration);
