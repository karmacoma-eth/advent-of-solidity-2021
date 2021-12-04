// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract GammaEpsilon {
    function charAt(string memory str, uint256 i) public pure returns (bytes1) {
        return bytes(str)[i];
    }

    function countsOfBitOneAtIndex(string[] memory input, uint256 index)
        public
        pure
        returns (uint256 count)
    {
        for (uint256 i = 0; i < input.length; i++) {
            if (charAt(input[i], index) == "1") {
                count++;
            }
        }
    }

    function countsOfBitOne(string[] memory input)
        public
        pure
        returns (uint256[] memory)
    {
        uint256 numBits = bytes(input[0]).length;
        uint256[] memory bitOneCounts = new uint256[](numBits);

        for (uint256 index = 0; index < numBits; index++) {
            bitOneCounts[index] = countsOfBitOneAtIndex(input, index);
        }

        return bitOneCounts;
    }

    function computeGammaEpsilonProduct(string[] calldata input)
        public
        pure
        returns (uint256)
    {
        // we assume that all input strings are of the same length
        uint256 numBits = bytes(input[0]).length;
        uint256[] memory bitOneCounts = countsOfBitOne(input);
        uint256 gamma = 0;
        uint256 epsilon = 0;
        for (uint256 i = 0; i < numBits; i++) {
            // if we have a majority of ones at position i, then bit i of gamma is 1
            if (bitOneCounts[i] > input.length / 2) {
                gamma |= (1 << (numBits - i - 1));
            } else {
                epsilon |= (1 << (numBits - i - 1));
            }
        }

        return gamma * epsilon;
    }

    function filter(
        string[] memory input,
        bytes1 criterion,
        uint256 bitIndex,
        uint256 numToKeep
    ) public pure returns (string[] memory) {
        string[] memory keepers = new string[](numToKeep);

        uint256 numKept = 0;
        for (uint256 i = 0; i < input.length; i++) {
            string memory current = input[i];
            if (charAt(current, bitIndex) == criterion) {
                keepers[numKept++] = current;
            }
        }

        return keepers;
    }

    function computeOxygenGeneratorRating(string[] memory input)
        public
        pure
        returns (string memory)
    {
        uint256 bitIndex = 0;
        while (input.length > 1) {
            uint256 numOnes = countsOfBitOneAtIndex(input, bitIndex);
            bytes1 criterion = "0";
            uint256 numToKeep = input.length - numOnes;

            if (numOnes >= (input.length + 1) / 2) {
                criterion = "1";
                numToKeep = numOnes;
            }

            input = filter(input, criterion, bitIndex, numToKeep);
            bitIndex++;
        }

        return input[0];
    }

    function computeCO2ScrubberRating(string[] memory input)
        public
        pure
        returns (string memory)
    {
        uint256 bitIndex = 0;
        while (input.length > 1) {
            uint256 numOnes = countsOfBitOneAtIndex(input, bitIndex);
            bytes1 criterion = "1";
            uint256 numToKeep = numOnes;

            if (numOnes >= (input.length + 1) / 2) {
                criterion = "0";
                numToKeep = input.length - numOnes;
            }

            input = filter(input, criterion, bitIndex, numToKeep);
            bitIndex++;
        }

        return input[0];
    }

    function parseBinString(string memory input) public pure returns (uint256) {
        uint256 result = 0;

        for (uint256 i = 0; i < bytes(input).length; i++) {
            result |=
                uint256(charAt(input, i) == "1" ? 1 : 0) <<
                (bytes(input).length - i - 1);
        }

        return result;
    }

    function computeLifeSupportRating(string[] calldata input)
        public
        pure
        returns (uint256)
    {
        return
            parseBinString(computeOxygenGeneratorRating(input)) *
            parseBinString(computeCO2ScrubberRating(input));
    }
}
