import { createContext, useContext } from "react";

const CommunityContext = createContext(undefined);

export function CommunityProvider({ communityDetails, children }) {
  return (
    <CommunityContext.Provider value={{ communityDetails }}>
      {children}
    </CommunityContext.Provider>
  );
}

export function useCommunityContext() {
  return useContext(CommunityContext);
}
