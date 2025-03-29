import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import {
  setGlobalLoadingFunction,
  setGlobalMessageFunction,
  setGlobalUserFunction,
} from "../services/appState";
import { User } from "../interfaces/mentorr-interfaces";

interface AppContextType {
  isLoading: boolean;
  showMessage: (
    message: string,
    type?: "success" | "error",
    duration?: number
  ) => void;
  setLoading: (loading: boolean) => void;
  message: string | null;
  messageType: "success" | "error";
  user: User | null;
  setUser: (user: User | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success"
  );
  const [user, setUser] = useState<User | null>(null);

  // Definição da função antes de passá-la ao estado global
  const showMessage = (
    msg: string,
    type: "success" | "error" = "success",
    duration = 3000
  ) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(null), duration); // Esconde a mensagem após 3s
  };

  useEffect(() => {
    setGlobalLoadingFunction(setIsLoading);
    setGlobalMessageFunction(showMessage);
    setGlobalUserFunction(setUser);
  }, []);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        showMessage,
        setLoading: setIsLoading,
        message,
        messageType,
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppContext deve ser usado dentro de um AppProvider");
  return context;
};
