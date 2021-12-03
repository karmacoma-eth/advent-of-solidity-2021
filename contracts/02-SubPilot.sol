// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SubPilot {
    mapping(bytes1 => int) toInt;

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

    function getLastChar(bytes memory bstr) public pure returns (bytes1) {
        return bstr[bstr.length - 1];
    }

    function computeCourse(string[] calldata course) public view returns(int) {
        int forward = 0;
        int depth = 0;

        for (uint i = 0; i < course.length; i++) {
            bytes memory bstr = bytes(course[i]);
            int value = toInt[getLastChar(bstr)];

            if (bstr[0] == "f") {
                forward += value;
            } else if (bstr[0] == "d") {
                depth += value;
            } else if (bstr[0] == "u") {
                depth -= value;
            } else {
                revert("unexpected character");
            }
        }

        return forward * depth;
    }

    function computeCourseWithAim(string[] calldata course) public view returns(int) {
        int forward = 0;
        int depth = 0;
        int aim = 0;

        for (uint i = 0; i < course.length; i++) {
            bytes memory bstr = bytes(course[i]);
            int value = toInt[getLastChar(bstr)];

            if (bstr[0] == "f") {
                forward += value;
                depth += value * aim;
            } else if (bstr[0] == "d") {
                aim += value;
            } else if (bstr[0] == "u") {
                aim -= value;
            } else {
                revert("unexpected character");
            }
        }

        return forward * depth;
    }
}