// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SonarSweep {
    function countDepthIncreases(uint[] calldata depthReadings) public pure returns(uint) {
        uint increases = 0;
        for (uint i = 1; i < depthReadings.length; i++) {
            if (depthReadings[i] > depthReadings[i-1]) {
                increases++;
            }
        }
        return increases;
    }

    function countDepthIncreasesWithSlidingWindow(uint[] calldata depthReadings) public pure returns(uint) {
        uint increases = 0;

        uint previousWindowReading = depthReadings[0] + depthReadings[1] + depthReadings[2];

        for (uint i = 3; i < depthReadings.length; i++) {
            uint currentWindowReading = previousWindowReading - depthReadings[i-3] + depthReadings[i];

            if (currentWindowReading > previousWindowReading) {
                increases++;
            }

            previousWindowReading = currentWindowReading;
        }
        return increases;
    }
}