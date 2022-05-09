import React from "react";
import { InspectedPetContextType } from "./InspectedPetContextType";

export const InspectedPetContext = React.createContext<InspectedPetContextType>({} as InspectedPetContextType);