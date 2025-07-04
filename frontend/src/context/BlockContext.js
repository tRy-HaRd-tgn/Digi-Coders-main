import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const BlockContext = createContext();

const BlockProvider = ({children, currentBlock}) => {

    const [addedBlocks, setAddedBlocks] = useState([]);

    return <BlockContext.Provider value={{addedBlocks, setAddedBlocks}}>
        {children}
    </BlockContext.Provider>
}

export const useBlockContext = () => useContext(BlockContext);

export default BlockProvider;
