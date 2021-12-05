// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract SquidBingo {
    mapping(bytes1 => uint256) toInt;

    constructor() {
        toInt["0"] = 0;
        toInt["1"] = 1;
        toInt["2"] = 2;
        toInt["3"] = 3;
        toInt["4"] = 4;
        toInt["5"] = 5;
        toInt["6"] = 6;
        toInt["7"] = 7;
        toInt["8"] = 8;
        toInt["9"] = 9;
    }

    function bytesToUInt(bytes memory str) public view returns (uint256 result) {
        for (uint256 i = 0; i < str.length; i++) {
            result = result * 10 + toInt[str[i]];
        }
    }

    function stringToUInt(string memory str) public view returns (uint256) {
        return bytesToUInt(bytes(str));
    }

    function substring(bytes memory str, uint256 start, uint256 end) public pure returns (bytes memory result) {
        uint length = end - start;
        result = new bytes(length);
        for (uint256 i = 0; i < length; i++) {
            result[i] = str[start + i];
        }
    }

    function split(bytes memory str, bytes1 delimiter)
        public
        pure
        returns (bytes[] memory tokens)
    {
        // works in 2 passes:
        // the first pass counts the number of tokens
        uint256 numTokens = 1;
        bytes memory bstr = bytes(str);
        for (uint256 i = 0; i < bstr.length; i++) {
            if (bstr[i] == delimiter) {
                numTokens++;
            }
        }

        // now we can allocate the result in memory
        // the second pass splits the string into tokens
        tokens = new bytes[](numTokens);
        uint256 currToken = 0;
        uint256 tokenStart = 0;
        for (uint256 i = 0; i < bstr.length; i++) {
            if (bstr[i] == delimiter) {
                tokens[currToken++] = substring(bstr, tokenStart, i);
                tokenStart = i + 1;
            }
        }

        // also add the last token
        tokens[currToken++] = substring(bstr, tokenStart, bstr.length);
    }

    function splitString(string memory str, bytes1 delimiter) public pure returns (bytes[] memory) {
        return split(bytes(str), delimiter);
    }

    ////////////////////////////////////////////////////////////////////////////////
    /// Bingo specific functions

    function readNumbersLine(bytes memory line) public view returns (uint256[] memory numbers) {
        bytes[] memory tokens = split(line, bytes1(","));
        numbers = new uint256[](tokens.length);
        for (uint256 i = 0; i < tokens.length; i++) {
            numbers[i] = bytesToUInt(tokens[i]);
        }
    }

    // TODO: read the starting grids
    // TODO: process the random numbers and mark the grids
    // TODO: detect if there is a winning grid
    // TODO: compute the sum of all the unmarked numbers
}
