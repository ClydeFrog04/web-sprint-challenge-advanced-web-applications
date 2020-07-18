import * as React from "react";
import {Context, createContext, useState} from "react";
import { useHistory } from 'react-router-dom';

export const BubbleContext: Context<any> = createContext({});

export const BubbleProvider: React.FC = ({children}) => {
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const [colorList, setColorList] = useState([]);

    return (
        <BubbleContext.Provider
            value={{
                loading,
                setLoading,
                history,
                colorList,
                setColorList,
            }}
        >
            {children}
        </BubbleContext.Provider>
    );
}