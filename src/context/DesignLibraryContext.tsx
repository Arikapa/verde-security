import React, { createContext, useContext, useState } from "react";

type DesignLibrary = "tailwind" | "bootstrap" | "materialui";

interface DesignLibraryContextType {
    library: DesignLibrary;
    setLibrary: (lib: DesignLibrary) => void;
    }

const DesignLibraryContext = createContext<DesignLibraryContextType | undefined>(undefined);

export const DesignLibraryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [library, setLibrary] = useState<DesignLibrary>("tailwind");

    return (
        <DesignLibraryContext.Provider value={{ library, setLibrary }}>
        {children}
        </DesignLibraryContext.Provider>
    );
};

export const useDesignLibrary = () => {
    const context = useContext(DesignLibraryContext);
    if (!context) throw new Error("useDesignLibrary debe usarse dentro de DesignLibraryProvider");
    return context;
};
