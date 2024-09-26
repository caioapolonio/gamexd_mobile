import { Session, User } from "@supabase/supabase-js";
import { useContext, useState, useEffect, createContext } from "react";
import { supabase } from "../db/supabase";
import { router } from "expo-router"; // Importando o hook de navegação

const AuthContext = createContext<{
  session: Session | null | undefined;
  user: User | null | undefined;
  signOut: () => void;
  setSession: (session: Session | null) => void;
}>({ session: null, user: null, signOut: () => {}, setSession: () => {} });

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>();
  const [session, setSession] = useState<Session | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setData = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) throw error;
      setSession(session);
      setUser(session?.user);
      setLoading(false);
    };

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user);
        setLoading(false);
      }
    );

    setData();

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  // Redirecionar após carregar a sessão
  useEffect(() => {
    if (!loading) {
      if (session) {
        router.push('/home');
      } else {
        router.replace('/')
      }
    }
  }, [loading, session]);

  const value = {
    session,
    setSession,
    user,
    signOut: () => supabase.auth.signOut(),
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// export the useAuth hook
export const useAuth = () => {
  return useContext(AuthContext);
};
