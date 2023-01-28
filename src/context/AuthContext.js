import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../firebase';
import APIService from '../api/APIService';

const UserContext = createContext();

export const UserAuth = () => {
  return useContext(UserContext);
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [userData, setUserData] = useState({});

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const userSignOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if(currentUser && currentUser.uid) {
        APIService.getInstance()
          .getUserByUID(currentUser.uid)
          .then((data) => {
            setUserData(data);
          })
          .catch((e) => {
            console.log(e)
          })
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ createUser, user, userData, userSignOut, signIn }}>
      {children}
    </UserContext.Provider>
  );
};
