import { Children, createContext, useState } from "react";

export const AppContext = createContext()

const AppContextProvider = ({children}) => {
    const [isLoding, setIsLoading] = useState(false)
    return (
       <AppContext.Provider value={{isLoding, setIsLoading}}>
        {children}
       </AppContext.Provider>
    )
}

export default AppContextProvider