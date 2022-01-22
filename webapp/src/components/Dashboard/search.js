import React from 'react';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input';
import { BsSearch } from "react-icons/bs";

const Search = ({w, mr}) => {
    return (
        <InputGroup w={w} size="sm" marginTop="10px" marginRight={mr}>
            <InputLeftElement
                pointerEvents="none"
                children={<BsSearch color="black"/>}
            />
            <Input 
                color="black" 
                backgroundColor="white"
                borderRadius="0px" 
                type="text" 
                placeholder="Search"
                borderColor="rgba(236, 236, 236, 1)"
                _placeholder={{color:"#000"}}/>
        </InputGroup>
    );
};

export default Search;