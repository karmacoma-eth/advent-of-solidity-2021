const { expect } = require("chai");

describe("SquidBingo contract", function () {
  let SquidBingoDeployer;
  let squidBingo;
  const COMMA = "0x2c";

  before(async function () {
    SquidBingoDeployer = await ethers.getContractFactory("SquidBingo");
    squidBingo = await SquidBingoDeployer.deploy();
  });

  it("https://adventofcode.com/2021/day/4", async function () {
    // sanity checks
    expect(await squidBingo.stringToUInt("4242")).to.equal(4242);
    expect(await squidBingo.splitString("a,b,c", COMMA)).to.eql(["0x61", "0x62", "0x63"]);
    expect(await squidBingo.splitString("a,,c", COMMA)).to.eql(["0x61", "0x", "0x63"]);
    expect(await squidBingo.splitString("a,,c,", COMMA)).to.eql(["0x61", "0x", "0x63", "0x"]);
    expect(await squidBingo.splitString(", b , c", COMMA)).to.eql(["0x", "0x206220", "0x2063"]);

    expect(await squidBingo.playGame(exampleData)).to.equal(4512);
    expect(await squidBingo.playGame(challengeData, { gasLimit: 10 ** 8})).to.equal(10680);

  });


  it.only("https://adventofcode.com/2021/day/4#part2", async function () {
    expect(await squidBingo.callStatic.letTheSquidWin(exampleData)).to.equal(1924);
    expect(await squidBingo.callStatic.letTheSquidWin(challengeData, { gasLimit: 10 ** 9})).to.equal(31892);
  });

  let exampleData =
`7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
8  2 23  4 24
21  9 14 16  7
6 10  3 18  5
1 12 20 15 19

3 15  0  2 22
9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
2  0 12  3  7`;

  let challengeData =
`67,31,58,8,79,18,19,45,38,13,40,62,85,10,21,96,56,55,4,36,76,42,32,34,39,89,6,12,24,57,93,47,41,52,83,61,5,37,28,15,86,23,69,92,70,27,25,53,44,80,65,22,99,43,66,26,11,72,2,98,14,82,87,20,73,46,35,7,1,84,95,74,81,63,78,94,16,60,29,97,91,30,17,54,68,90,71,88,77,9,64,50,0,49,48,75,3,59,51,33

12 75 58 21 87
55 80 14 63 17
37 35 76 92 56
72 68 51 19 38
91 60 34 30 88

 0 66  5 51  8
45 57 31  3 62
 7 60 40 29 90
80 19 47 86 81
95 69 68 53 93

30 99 16 34 42
94 39 83 78 49
57 81 97 77 52
 9 61 98 11 89
85  1 60 90 55

87 49 12 85 88
67 89  7 35 70
37 45 93 84  9
80 58 54 13 22
 8 71 48 15 39

40 79 34 18 42
35  8 64  5 63
93 57 16 10 96
22 20 23  0 86
61 78 68 83 12

43 78 64 70 49
60 54 31 82  9
10 69  2  1 50
37 12 16 77 25
18 14 57 13 91

42 85 53 57 52
19 41 84 68 28
39 22 55 51 87
49 23  5 66 71
72 83 86 35 50

91 75  9 62 82
47 37 94  6 55
96 38  8 19 22
46 66 54 43 59
 1  0 26 36 74

19 78 25 10 80
23 88 95 42 11
54 85 52 92 31
73 87  9 17 93
 2 46 12 24 83

84 73 85 51 89
41 26 98 11 29
81  6 35 39 76
27 10 49  4 92
55 43 28 45 88

23  0 19 26 73
72 42 40 58 38
36 46 18 89 52
85 35 50 13  1
66 57 45 81 25

11 71 35  0 95
45 16 78 33 31
30 34 25 91 36
83 58  8  3 62
67 14 72 93 28

63 41 19 80 27
69 15 99 75 95
47 86 52 22 12
66 43 37  6 97
13  1  5 71 83

19 42 85 53 31
36 14 75 39 74
70 86 97 72 69
15 20 41  6 21
26 33 48 98 34

 1 79 21 38 44
63 71 14 17 87
41 76 56 49 59
 3 18  6  4 77
34 19 88 24 10

78 20 30 54 92
25 63 81  0 69
46 87 26 56 40
90 82 50 84 66
96 41 18 29 23

34  1 59 55 30
97 19 82 23 77
21 52 56 48 24
29 43 28 99 69
 4 37 84 76 58

96 10 11 79 40
90 29 59 73 84
16 62 74 42 92
43 32 58 46 34
75 12 57 22 15

29 82 47 16 12
78 84 83  0 77
51 64  5 37  7
49 70 19 69  8
67 63  6 43 79

87 67 52 64  8
55 43 82 50 13
 3 19 94 54 83
80 59 15 32 37
 0 58 12 89 96

95 31 14 77 83
26 68 33 39 85
71 56 45 46 30
44 93 16 17 52
86  8 27  3 25

27 67 81 30 95
48 89  7  4  3
82 90 78 85 44
22 16 97 92 11
15 87 47 79 62

49 51 35 87 75
 3 70  8 43  5
77 88 73 81 29
42 62 50 37 85
26 86 14 38 65

81  9 84  3 37
33 32  1 54 45
39 83 82 36  2
56 28 76 85 40
96 69 43 24 71

83 72 50 46 34
15 51 87 44 71
 8 78 10 94 11
67 40 85 93 35
17 23 24  0 61

62 55 47 77 95
81 20 35  8 78
 7  9 89 27 51
80 39 33 63 50
67 34  4 87 57

72 88 74 46 91
67 66 32  0  9
 3 69 94  6 81
40 95 29 83 20
80 68 55 54  2

72 68 65 91 81
52 34 88 46 48
66  4 54 27 62
83 60 69 26 56
19 11 35 22 84

72 69 92 87 83
55 95 85 66  1
16  3 86  5 99
24 22 29 53 90
76 73 48 80 42

38 22 94 50 20
40 52 61 39 62
 7 35 95 54 66
37 59 84 76  2
81 85  0 48  6

90 95 34 93  8
46 13  6 58 85
91 89 83 80 18
56 57 44 99 17
21 42 12 74 38

28 61 78 99 23
75 64 37 66 50
53 70 89 17 63
43 38 71 26 85
 4 13  2 27 18

35 12 60  7 29
87 65 17 81 10
42 62 99 38 51
 2 57 92 27 89
82 58 97 36 72

43 45  5 99 51
88  4 13 39 95
44 56 31 33 94
37 57 12  3 91
50 74  6 76 30

67 85 56 69 84
74 65 61 66  8
43 50 55 25 97
78 15 49 73 27
71 44 93 23 64

83 38 97 85 76
55 90 46 34 12
 1 52 18 59 48
62 63 30 82 92
68 95  0 72 84

40 10 62 77 75
93 94 32 27 60
26 12 14 35 57
88 53 97 95 24
66 46 33  3 63

25 44 90 34 17
91 93 42 37 86
95 41 82 92 31
65 35 52 40 84
85 57 71 19 29

77 38 15 12  9
65 78 39 81 33
35 64 96 76 71
68 93 79 22 40
88 87 27  7 29

10 81  7 92 64
60 25 11  6 87
34 49 20 13  0
48 38 14 61 75
71 86 39 37 22

63 67 82 98 18
11 95  4 55 44
42 10 84 73 19
17 57 53 61 49
 7 32 24 75 58

50 90  1 98 41
77  4 87 69 19
48 44 68 10 17
96 66 71 61 45
18 86 26 73 16

 5 58 68 34 85
44 89 72 21 27
 0 50 39 94 82
23 13 41 81  6
83 60 61 22 40

59 41 63 92 69
10 58 29 60  4
76 15 46 34 85
13 17 88 86 24
62 73 19 67 98

96 69 70 87 80
28 27 40 77  9
23 52 99  3 60
81 53 26 45 35
82 33 71 43 67

30  8 41 71 26
97 96  0 45 11
61 12 91  7 50
22 40 74 55 29
53 78 43 15  5

93 25 12 62 84
95 31 87 83 23
29 41  6 55 17
33 85 42 20 56
57  1 65 45 16

76 86 27 75 96
56 63 45 25 77
54 44 64 41 13
60 46 66 12 67
84 59 39 24  5

79 39 22 84 66
76 38 99 21 47
52 73  7 45 94
70 78 24 16 40
48 57  9 13 64

17 80 28 51 94
52 56 24 65 82
38 96 21 70 23
60 50 40 32 91
45 77 37 44 89

18  3 42 68 66
22 35 95 29 65
 8 99 72 19  5
44 80 11 60 76
59 90 64 57 94

66 97 62 49 89
 4 41  5  2 23
54 48 43 45 76
68 35 14  1 86
34 47 26 92 95

57 36 52 42 11
49 83 94 72 26
91 48 50 88 80
70 23 81 33 15
64 90  2 47 18

68 11 16 77 28
29 56 81 21 63
 2 88 54 82 40
69 93 92 55 70
57 51 25 80  3

10 73  8 27 61
74 66 47 54  1
52 17 76  5 20
70 44 92 59 34
26 16 11 81 46

10 31 95 17 44
76 67 19 69 33
36 70 25 71 99
56 42 53 46 40
90 85 81  6 26

17 32 74 57 64
37 82 92 54 59
56 87 41 68 73
44 98 58 95 53
47 29 71 52 31

19 58 84 14 91
75 89 18 67  3
11  5  2 24 37
62 35 48 56 81
54 77 16 70 45

 7 20 41 87 74
17 47 45 96 49
 4 33 89 31 77
79 42 52 29 85
88 27 63 11 75

61 87 90 15 17
22 82 28 21 93
65 98 12 23 24
73 70 42  1 94
83 79  5 18 55

78 67 22 88 18
 2 43 14 56 92
61 32 87 20  8
28 11  7 12 70
21 72 36 74 77

27  6 97 66  7
30 67 12 70 40
18 61 78 36 23
44 24 85 74 82
55 42 51 90 34

98  9 39 42 44
50 54 43 66 57
85 58 91 13 11
67  5 23 59 70
45 41 87 29 20

97 57 48 42 73
37 29 50 49 83
55 38 69 13 44
52 14 54 94 56
24 77 16 39 66

31 61 44 38 80
11  3  0 56  8
94 81  1 25 19
71 23 36 66 41
70 35 77 79 46

17 96 13 25 48
65 28 41 24 81
39 87 74 42  5
36 35 21 60 40
 3 83 11  1 34

50 52 84 38 57
15 20 26  3 72
48 85  4 88 63
39 34 32 42  7
86 77 71 94 23

28 60 13 25  0
22 74 20 75 30
97  5 21  2 73
 7 44 14 77 16
43 68 76 24  1

99 85  4 62 67
46 86 43 45 77
42 21 81 47 57
71 35 23 10 29
58 60 79 61 48

33 10  7 61 17
97 91 70 75 48
81 80 78 34 36
26 55 73 77 14
85 84 62  9 16

17 41  3 82 86
58  0 51 79 29
60 70 61 95 46
98 85  1 72 93
 4 42 89 88 84

95 16 26 32 29
27 37 51 23 55
36 10 50 70 57
60 79 96 40  9
 3 43 74 94 31

15 56 51 72 62
 8 63 23 90 67
93 85 28 70 82
33 65 89  4 64
19 58 37 88 75

34 71 60 84 85
64 87 92 67  8
42 58  4  9 75
49 95 26 91 12
27 56 74 90 20

13 46 27 12 97
90 25 87 73 41
50 66 34 15 94
45 99 88 86 21
56 37 62 44 29

77 31 59 94 74
19 15 11 23 68
 0 36  2 98 30
44 49 90 83  9
13 88 69 66 81

31 71 58 11 47
42 41 10 83 21
38  9 51 17 64
37 13 93 81 39
33 22 98 26 43

60 89 20 94  2
45 34 93 15 30
 4 16 49 92 28
67 75 27 61 70
25 84 55 91 88

85 22 41 43  0
21 77 12 64 34
30 39 97 36 72
56  8 65 82 84
76  3  4 17 49

16 61 63 41 47
48 46 37 70 87
57 31 36 83  1
71  3 93 24 80
51 78 91 17 86

87 72 70 97 58
54 16  1 43 46
49 28 59 38 51
24 15 10 84 94
76 86 55 83 26

93 10  5  1 92
99  6 45 79 76
74 87 47 25 24
50 43  4 21 67
81 39 49 12 86

49 35 22 27 37
90 80 68 52 59
78 53 23 65 46
30 61 75 97 31
 1 76 66 26 48

37 11 88 20 99
45 96 95 81 39
60 55 80 58 53
 6 23  8  1 46
98 89 16 73 78

 0 58 88 69 66
82  9 31 97 55
22 37 90 79 14
44 45 49 43 60
93 62 36 57 30

 1 34 89 90 46
81 26  5  6 14
75 74 62 55 37
96 58 78 93 73
35 40 13 95 45

22 57 46 99 42
65 39 38  7 81
 4  1 76 59  8
84 60 37 55 40
49 31  5 80 30

29  4 96 50 24
61 77 70 88 93
12 64 52 25 90
67 34 59 95 16
79 21 82  6 63

26 41 52 91 57
92 95 33  1 62
45 31 87 29 59
44 86 99 81  5
36 20 58 73 30

55 96 28 26 17
62 51 64 43 49
37 41 36 75 42
11 94 87 27 63
35 23 21 29  4

99 54 74 83 92
27 53 15  8 85
94 36 63 29 91
58 10 45 38 79
 9 95 23 98 33

52 14 99 30 50
29 81 41 28 15
43 51 61 56 62
68 67 93 45 13
23  6 70  8  7

73 78 47  2  7
45 16 46 65 21
60 54 43 12  1
20 23 42 56 81
89 80 52 26 32

79  5 10 11  7
87 36  2 70 16
99 44 49 43 19
46 25  1 18 78
55 76  3 73 15

18 49 71 59 90
97 37 23 68 62
48  8 14 81 26
88  4 22 76 12
60 99 64 17 46

99 25 79 42 33
 5 28 38 15 11
 8 78 51 40 65
47  0 12 48 67
14 98 53 43 86

74 46 42 86 44
83 96 61 38 70
97  7 49  9 22
65 34 66 90 51
 0 36 13 85 53

43 21 64 86 20
 8 55 85 48 15
58 49 87 29 35
74  4 37 12 99
98 69 75 39 71

58 65 63 41 87
19 49 91 34 37
95 10 55 94 82
78 71 66 60 96
27 11 29 48 72

 9 78 51 18 93
71 55  0  5 37
24 98  2 70 92
85 15 46 91 99
60 68 41 86 96`;
});
