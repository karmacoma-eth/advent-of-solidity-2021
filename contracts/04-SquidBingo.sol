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

    function readBoardLine(bytes memory line) public view returns (int256[5] memory numbers) {
        bytes[] memory tokens = split(line, bytes1(" "));
        uint currNum = 0;
        for (uint256 i = 0; i < tokens.length; i++) {
            if (tokens[i].length > 0) {
                numbers[currNum++] = int(bytesToUInt(tokens[i]));
            }
        }
    }

    function readBoard(bytes[] memory lines, uint lineNumber) public view returns (int256[5][5] memory numbers) {
        numbers[0] = readBoardLine(lines[lineNumber]);
        numbers[1] = readBoardLine(lines[lineNumber + 1]);
        numbers[2] = readBoardLine(lines[lineNumber + 2]);
        numbers[3] = readBoardLine(lines[lineNumber + 3]);
        numbers[4] = readBoardLine(lines[lineNumber + 4]);
    }

    function readBoards(bytes[] memory lines) public view returns (int256[5][5][] memory boards) {
        uint numBoards = lines.length / 6;
        boards = new int256[5][5][](numBoards);

        for (uint256 i = 0; i < numBoards; i++) {
            boards[i] = readBoard(lines, i * 6 + 2);
        }
    }

    function mark(uint number, int[5][5] memory board) public pure returns (bool marked) {
        for (uint256 i = 0; i < 5; i++) {
            for (uint256 j = 0; j < 5; j++) {
                if (board[i][j] == int(number)) {
                    board[i][j] = ~board[i][j];
                    marked = true;
                }
            }
        }
    }

    function isWinningRow(int256[5] memory line) public pure returns (bool) {
        for (uint256 i = 0; i < 5; i++) {
            if (line[i] > 0) {
                return false;
            }
        }

        return true;
    }

    function isWinningColumn(int256[5][5] memory board, uint column) public pure returns (bool) {
        for (uint256 i = 0; i < 5; i++) {
            if (board[i][column] > 0) {
                return false;
            }
        }

        return true;
    }

    function isWinningBoard(int[5][5] memory board) public view returns (bool) {
        for (uint256 i = 0; i < 5; i++) {
            if (isWinningRow(board[i])) {
                console.log("winning row %d", i);
                return true;
            }
        }

        for (uint256 i = 0; i < 5; i++) {
            if (isWinningColumn(board, i)) {
                console.log("winning column %d", i);
                return true;
            }
        }

        return false;
    }

    function sumOfUnmarked(int[5][5] memory board) public pure returns (uint256 sum) {
        for (uint256 i = 0; i < 5; i++) {
            for (uint256 j = 0; j < 5; j++) {
                if (board[i][j] > 0) {
                    sum += uint256(board[i][j]);
                }
            }
        }
    }

    function playGame(string calldata input) public view returns(uint) {
        bytes[] memory lines = splitString(input, bytes1("\n"));
        uint256[] memory numbers = readNumbersLine(lines[0]);
        int256[5][5][] memory boards = readBoards(lines);

        for (uint256 i = 0; i < numbers.length; i++) {
            uint number = numbers[i];
            console.log("playing number %d", number);

            for (uint256 j = 0; j < boards.length; j++) {
                int[5][5] memory board = boards[j];
                mark(number, board);

                if (isWinningBoard(board)) {
                    console.log("winning board %d!", j);
                    return number * sumOfUnmarked(board);
                }
            }
        }

        return 0;
    }
}
