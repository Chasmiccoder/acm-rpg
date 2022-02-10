const WALLS = {
    [utils.asGridCoord(12,2)]: true,
    [utils.asGridCoord(13,2)]: true,
    [utils.asGridCoord(14,2)]: true,
    [utils.asGridCoord(15,2)]: true,
    [utils.asGridCoord(16,2)]: true,
    [utils.asGridCoord(11,3)]: true,
    [utils.asGridCoord(17,3)]: true,
    [utils.asGridCoord(10,4)]: true,
    [utils.asGridCoord(18,4)]: true,
    [utils.asGridCoord(10,5)]: true,
    [utils.asGridCoord(18,5)]: true,
    [utils.asGridCoord(10,6)]: true,
    [utils.asGridCoord(18,6)]: true,
    [utils.asGridCoord(3,7)]: true,
    [utils.asGridCoord(4,7)]: true,
    [utils.asGridCoord(9,7)]: true,
    [utils.asGridCoord(19,7)]: true,
    [utils.asGridCoord(35,7)]: true,
    [utils.asGridCoord(36,7)]: true,
    [utils.asGridCoord(37,7)]: true,
    [utils.asGridCoord(38,7)]: true,
    [utils.asGridCoord(39,7)]: true,
    [utils.asGridCoord(40,7)]: true,
    [utils.asGridCoord(2,8)]: true,
    [utils.asGridCoord(5,8)]: true,
    [utils.asGridCoord(8,8)]: true,
    [utils.asGridCoord(9,8)]: true,
    [utils.asGridCoord(19,8)]: true,
    [utils.asGridCoord(30,8)]: true,
    [utils.asGridCoord(31,8)]: true,
    [utils.asGridCoord(32,8)]: true,
    [utils.asGridCoord(33,8)]: true,
    [utils.asGridCoord(34,8)]: true,
    [utils.asGridCoord(41,8)]: true,
    [utils.asGridCoord(42,8)]: true,
    [utils.asGridCoord(43,8)]: true,
    [utils.asGridCoord(0,9)]: true,
    [utils.asGridCoord(1,9)]: true,
    [utils.asGridCoord(5,9)]: true,
    [utils.asGridCoord(6,9)]: true,
    [utils.asGridCoord(7,9)]: true,
    [utils.asGridCoord(20,9)]: true,
    [utils.asGridCoord(21,9)]: true,
    [utils.asGridCoord(22,9)]: true,
    [utils.asGridCoord(23,9)]: true,
    [utils.asGridCoord(24,9)]: true,
    [utils.asGridCoord(25,9)]: true,
    [utils.asGridCoord(26,9)]: true,
    [utils.asGridCoord(27,9)]: true,
    [utils.asGridCoord(28,9)]: true,
    [utils.asGridCoord(29,9)]: true,
    [utils.asGridCoord(44,9)]: true,
    [utils.asGridCoord(-1,10)]: true,
    [utils.asGridCoord(44,10)]: true,
    [utils.asGridCoord(0,11)]: true,
    [utils.asGridCoord(44,11)]: true,
    [utils.asGridCoord(0,12)]: true,
    [utils.asGridCoord(7,12)]: true,
    [utils.asGridCoord(20,12)]: true,
    [utils.asGridCoord(21,12)]: true,
    [utils.asGridCoord(22,12)]: true,
    [utils.asGridCoord(23,12)]: true,
    [utils.asGridCoord(24,12)]: true,
    [utils.asGridCoord(25,12)]: true,
    [utils.asGridCoord(26,12)]: true,
    [utils.asGridCoord(27,12)]: true,
    [utils.asGridCoord(28,12)]: true,
    [utils.asGridCoord(29,12)]: true,
    [utils.asGridCoord(30,12)]: true,
    [utils.asGridCoord(35,12)]: true,
    [utils.asGridCoord(36,12)]: true,
    [utils.asGridCoord(41,12)]: true,
    [utils.asGridCoord(42,12)]: true,
    [utils.asGridCoord(44,12)]: true,
    [utils.asGridCoord(0,13)]: true,
    [utils.asGridCoord(6,13)]: true,
    [utils.asGridCoord(8,13)]: true,
    [utils.asGridCoord(20,13)]: true,
    [utils.asGridCoord(30,13)]: true,
    [utils.asGridCoord(31,13)]: true,
    [utils.asGridCoord(33,13)]: true,
    [utils.asGridCoord(34,13)]: true,
    [utils.asGridCoord(35,13)]: true,
    [utils.asGridCoord(36,13)]: true,
    [utils.asGridCoord(41,13)]: true,
    [utils.asGridCoord(42,13)]: true,
    [utils.asGridCoord(44,13)]: true,
    [utils.asGridCoord(1,14)]: true,
    [utils.asGridCoord(2,14)]: true,
    [utils.asGridCoord(3,14)]: true,
    [utils.asGridCoord(4,14)]: true,
    [utils.asGridCoord(5,14)]: true,
    [utils.asGridCoord(9,14)]: true,
    [utils.asGridCoord(19,14)]: true,
    [utils.asGridCoord(30,14)]: true,
    [utils.asGridCoord(31,14)]: true,
    [utils.asGridCoord(32,14)]: true,
    [utils.asGridCoord(33,14)]: true,
    [utils.asGridCoord(34,14)]: true,
    [utils.asGridCoord(36,14)]: true,
    [utils.asGridCoord(41,14)]: true,
    [utils.asGridCoord(42,14)]: true,
    [utils.asGridCoord(44,14)]: true,
    [utils.asGridCoord(9,15)]: true,
    [utils.asGridCoord(18,15)]: true,
    [utils.asGridCoord(36,15)]: true,
    [utils.asGridCoord(41,15)]: true,
    [utils.asGridCoord(42,15)]: true,
    [utils.asGridCoord(44,15)]: true,
    [utils.asGridCoord(9,16)]: true,
    [utils.asGridCoord(18,16)]: true,
    [utils.asGridCoord(36,16)]: true,
    [utils.asGridCoord(41,16)]: true,
    [utils.asGridCoord(42,16)]: true,
    [utils.asGridCoord(44,16)]: true,
    [utils.asGridCoord(9,17)]: true,
    [utils.asGridCoord(18,17)]: true,
    [utils.asGridCoord(36,17)]: true,
    [utils.asGridCoord(40,17)]: true,
    [utils.asGridCoord(42,17)]: true,
    [utils.asGridCoord(44,17)]: true,
    [utils.asGridCoord(4,18)]: true,
    [utils.asGridCoord(9,18)]: true,
    [utils.asGridCoord(19,18)]: true,
    [utils.asGridCoord(25,18)]: true,
    [utils.asGridCoord(33,18)]: true,
    [utils.asGridCoord(36,18)]: true,
    [utils.asGridCoord(40,18)]: true,
    [utils.asGridCoord(42,18)]: true,
    [utils.asGridCoord(43,18)]: true,
    [utils.asGridCoord(44,18)]: true,
    [utils.asGridCoord(2,19)]: true,
    [utils.asGridCoord(3,19)]: true,
    [utils.asGridCoord(5,19)]: true,
    [utils.asGridCoord(9,19)]: true,
    [utils.asGridCoord(19,19)]: true,
    [utils.asGridCoord(23,19)]: true,
    [utils.asGridCoord(24,19)]: true,
    [utils.asGridCoord(26,19)]: true,
    [utils.asGridCoord(27,19)]: true,
    [utils.asGridCoord(28,19)]: true,
    [utils.asGridCoord(32,19)]: true,
    [utils.asGridCoord(34,19)]: true,
    [utils.asGridCoord(36,19)]: true,
    [utils.asGridCoord(40,19)]: true,
    [utils.asGridCoord(0,20)]: true,
    [utils.asGridCoord(1,20)]: true,
    [utils.asGridCoord(6,20)]: true,
    [utils.asGridCoord(7,20)]: true,
    [utils.asGridCoord(8,20)]: true,
    [utils.asGridCoord(20,20)]: true,
    [utils.asGridCoord(21,20)]: true,
    [utils.asGridCoord(22,20)]: true,
    [utils.asGridCoord(29,20)]: true,
    [utils.asGridCoord(32,20)]: true,
    [utils.asGridCoord(34,20)]: true,
    [utils.asGridCoord(36,20)]: true,
    [utils.asGridCoord(40,20)]: true,
    [utils.asGridCoord(-1,21)]: true,
    [utils.asGridCoord(29,21)]: true,
    [utils.asGridCoord(32,21)]: true,
    [utils.asGridCoord(34,21)]: true,
    [utils.asGridCoord(36,21)]: true,
    [utils.asGridCoord(40,21)]: true,
    [utils.asGridCoord(-1,22)]: true,
    [utils.asGridCoord(29,22)]: true,
    [utils.asGridCoord(32,22)]: true,
    [utils.asGridCoord(34,22)]: true,
    [utils.asGridCoord(35,22)]: true,
    [utils.asGridCoord(36,22)]: true,
    [utils.asGridCoord(41,22)]: true,
    [utils.asGridCoord(-2,23)]: true,
    [utils.asGridCoord(7,23)]: true,
    [utils.asGridCoord(20,23)]: true,
    [utils.asGridCoord(21,23)]: true,
    [utils.asGridCoord(22,23)]: true,
    [utils.asGridCoord(23,23)]: true,
    [utils.asGridCoord(24,23)]: true,
    [utils.asGridCoord(25,23)]: true,
    [utils.asGridCoord(26,23)]: true,
    [utils.asGridCoord(27,23)]: true,
    [utils.asGridCoord(28,23)]: true,
    [utils.asGridCoord(32,23)]: true,
    [utils.asGridCoord(41,23)]: true,
    [utils.asGridCoord(-2,24)]: true,
    [utils.asGridCoord(2,24)]: true,
    [utils.asGridCoord(3,24)]: true,
    [utils.asGridCoord(4,24)]: true,
    [utils.asGridCoord(5,24)]: true,
    [utils.asGridCoord(6,24)]: true,
    [utils.asGridCoord(8,24)]: true,
    [utils.asGridCoord(9,24)]: true,
    [utils.asGridCoord(18,24)]: true,
    [utils.asGridCoord(19,24)]: true,
    [utils.asGridCoord(20,24)]: true,
    [utils.asGridCoord(21,24)]: true,
    [utils.asGridCoord(22,24)]: true,
    [utils.asGridCoord(33,24)]: true,
    [utils.asGridCoord(34,24)]: true,
    [utils.asGridCoord(35,24)]: true,
    [utils.asGridCoord(36,24)]: true,
    [utils.asGridCoord(41,24)]: true,
    [utils.asGridCoord(42,24)]: true,
    [utils.asGridCoord(43,24)]: true,
    [utils.asGridCoord(-1,25)]: true,
    [utils.asGridCoord(0,25)]: true,
    [utils.asGridCoord(1,25)]: true,
    [utils.asGridCoord(9,25)]: true,
    [utils.asGridCoord(18,25)]: true,
    [utils.asGridCoord(36,25)]: true,
    [utils.asGridCoord(43,25)]: true,
    [utils.asGridCoord(9,26)]: true,
    [utils.asGridCoord(18,26)]: true,
    [utils.asGridCoord(36,26)]: true,
    [utils.asGridCoord(43,26)]: true,
    [utils.asGridCoord(9,27)]: true,
    [utils.asGridCoord(18,27)]: true,
    [utils.asGridCoord(36,27)]: true,
    [utils.asGridCoord(39,27)]: true,
    [utils.asGridCoord(40,27)]: true,
    [utils.asGridCoord(41,27)]: true,
    [utils.asGridCoord(42,27)]: true,
    [utils.asGridCoord(43,27)]: true,
    [utils.asGridCoord(44,27)]: true,
    [utils.asGridCoord(9,28)]: true,
    [utils.asGridCoord(18,28)]: true,
    [utils.asGridCoord(36,28)]: true,
    [utils.asGridCoord(39,28)]: true,
    [utils.asGridCoord(44,28)]: true,
    [utils.asGridCoord(-3,29)]: true,
    [utils.asGridCoord(-2,29)]: true,
    [utils.asGridCoord(-1,29)]: true,
    [utils.asGridCoord(0,29)]: true,
    [utils.asGridCoord(9,29)]: true,
    [utils.asGridCoord(18,29)]: true,
    [utils.asGridCoord(27,29)]: true,
    [utils.asGridCoord(28,29)]: true,
    [utils.asGridCoord(29,29)]: true,
    [utils.asGridCoord(36,29)]: true,
    [utils.asGridCoord(44,29)]: true,
    [utils.asGridCoord(-4,30)]: true,
    [utils.asGridCoord(1,30)]: true,
    [utils.asGridCoord(2,30)]: true,
    [utils.asGridCoord(3,30)]: true,
    [utils.asGridCoord(9,30)]: true,
    [utils.asGridCoord(18,30)]: true,
    [utils.asGridCoord(26,30)]: true,
    [utils.asGridCoord(30,30)]: true,
    [utils.asGridCoord(36,30)]: true,
    [utils.asGridCoord(44,30)]: true,
    [utils.asGridCoord(-5,31)]: true,
    [utils.asGridCoord(4,31)]: true,
    [utils.asGridCoord(5,31)]: true,
    [utils.asGridCoord(6,31)]: true,
    [utils.asGridCoord(7,31)]: true,
    [utils.asGridCoord(8,31)]: true,
    [utils.asGridCoord(18,31)]: true,
    [utils.asGridCoord(26,31)]: true,
    [utils.asGridCoord(30,31)]: true,
    [utils.asGridCoord(34,31)]: true,
    [utils.asGridCoord(35,31)]: true,
    [utils.asGridCoord(36,31)]: true,
    [utils.asGridCoord(44,31)]: true,
    [utils.asGridCoord(-5,32)]: true,
    [utils.asGridCoord(18,32)]: true,
    [utils.asGridCoord(19,32)]: true,
    [utils.asGridCoord(22,32)]: true,
    [utils.asGridCoord(23,32)]: true,
    [utils.asGridCoord(24,32)]: true,
    [utils.asGridCoord(26,32)]: true,
    [utils.asGridCoord(30,32)]: true,
    [utils.asGridCoord(32,32)]: true,
    [utils.asGridCoord(33,32)]: true,
    [utils.asGridCoord(44,32)]: true,
    [utils.asGridCoord(-4,33)]: true,
    [utils.asGridCoord(-3,33)]: true,
    [utils.asGridCoord(-2,33)]: true,
    [utils.asGridCoord(-1,33)]: true,
    [utils.asGridCoord(0,33)]: true,
    [utils.asGridCoord(1,33)]: true,
    [utils.asGridCoord(2,33)]: true,
    [utils.asGridCoord(20,33)]: true,
    [utils.asGridCoord(21,33)]: true,
    [utils.asGridCoord(25,33)]: true,
    [utils.asGridCoord(26,33)]: true,
    [utils.asGridCoord(30,33)]: true,
    [utils.asGridCoord(31,33)]: true,
    [utils.asGridCoord(47,33)]: true,
    [utils.asGridCoord(2,34)]: true,
    [utils.asGridCoord(47,34)]: true,
    [utils.asGridCoord(-4,35)]: true,
    [utils.asGridCoord(-3,35)]: true,
    [utils.asGridCoord(-2,35)]: true,
    [utils.asGridCoord(-1,35)]: true,
    [utils.asGridCoord(2,35)]: true,
    [utils.asGridCoord(35,35)]: true,
    [utils.asGridCoord(47,35)]: true,
    [utils.asGridCoord(-5,36)]: true,
    [utils.asGridCoord(0,36)]: true,
    [utils.asGridCoord(1,36)]: true,
    [utils.asGridCoord(2,36)]: true,
    [utils.asGridCoord(34,36)]: true,
    [utils.asGridCoord(35,36)]: true,
    [utils.asGridCoord(47,36)]: true,
    [utils.asGridCoord(-6,37)]: true,
    [utils.asGridCoord(23,37)]: true,
    [utils.asGridCoord(24,37)]: true,
    [utils.asGridCoord(33,37)]: true,
    [utils.asGridCoord(36,37)]: true,
    [utils.asGridCoord(37,37)]: true,
    [utils.asGridCoord(38,37)]: true,
    [utils.asGridCoord(39,37)]: true,
    [utils.asGridCoord(46,37)]: true,
    [utils.asGridCoord(-5,38)]: true,
    [utils.asGridCoord(3,38)]: true,
    [utils.asGridCoord(4,38)]: true,
    [utils.asGridCoord(5,38)]: true,
    [utils.asGridCoord(20,38)]: true,
    [utils.asGridCoord(21,38)]: true,
    [utils.asGridCoord(22,38)]: true,
    [utils.asGridCoord(25,38)]: true,
    [utils.asGridCoord(31,38)]: true,
    [utils.asGridCoord(32,38)]: true,
    [utils.asGridCoord(38,38)]: true,
    [utils.asGridCoord(44,38)]: true,
    [utils.asGridCoord(45,38)]: true,
    [utils.asGridCoord(-4,39)]: true,
    [utils.asGridCoord(-3,39)]: true,
    [utils.asGridCoord(-2,39)]: true,
    [utils.asGridCoord(-1,39)]: true,
    [utils.asGridCoord(2,39)]: true,
    [utils.asGridCoord(6,39)]: true,
    [utils.asGridCoord(7,39)]: true,
    [utils.asGridCoord(11,39)]: true,
    [utils.asGridCoord(12,39)]: true,
    [utils.asGridCoord(19,39)]: true,
    [utils.asGridCoord(26,39)]: true,
    [utils.asGridCoord(31,39)]: true,
    [utils.asGridCoord(44,39)]: true,
    [utils.asGridCoord(-1,40)]: true,
    [utils.asGridCoord(2,40)]: true,
    [utils.asGridCoord(13,40)]: true,
    [utils.asGridCoord(18,40)]: true,
    [utils.asGridCoord(19,40)]: true,
    [utils.asGridCoord(26,40)]: true,
    [utils.asGridCoord(44,40)]: true,
    [utils.asGridCoord(-5,41)]: true,
    [utils.asGridCoord(-4,41)]: true,
    [utils.asGridCoord(-3,41)]: true,
    [utils.asGridCoord(-2,41)]: true,
    [utils.asGridCoord(-1,41)]: true,
    [utils.asGridCoord(2,41)]: true,
    [utils.asGridCoord(13,41)]: true,
    [utils.asGridCoord(17,41)]: true,
    [utils.asGridCoord(26,41)]: true,
    [utils.asGridCoord(44,41)]: true,
    [utils.asGridCoord(-6,42)]: true,
    [utils.asGridCoord(-1,42)]: true,
    [utils.asGridCoord(2,42)]: true,
    [utils.asGridCoord(4,42)]: true,
    [utils.asGridCoord(5,42)]: true,
    [utils.asGridCoord(6,42)]: true,
    [utils.asGridCoord(7,42)]: true,
    [utils.asGridCoord(8,42)]: true,
    [utils.asGridCoord(13,42)]: true,
    [utils.asGridCoord(17,42)]: true,
    [utils.asGridCoord(44,42)]: true,
    [utils.asGridCoord(-6,43)]: true,
    [utils.asGridCoord(3,43)]: true,
    [utils.asGridCoord(9,43)]: true,
    [utils.asGridCoord(13,43)]: true,
    [utils.asGridCoord(17,43)]: true,
    [utils.asGridCoord(18,43)]: true,
    [utils.asGridCoord(19,43)]: true,
    [utils.asGridCoord(20,43)]: true,
    [utils.asGridCoord(21,43)]: true,
    [utils.asGridCoord(24,43)]: true,
    [utils.asGridCoord(43,43)]: true,
    [utils.asGridCoord(-5,44)]: true,
    [utils.asGridCoord(2,44)]: true,
    [utils.asGridCoord(3,44)]: true,
    [utils.asGridCoord(10,44)]: true,
    [utils.asGridCoord(11,44)]: true,
    [utils.asGridCoord(12,44)]: true,
    [utils.asGridCoord(13,44)]: true,
    [utils.asGridCoord(22,44)]: true,
    [utils.asGridCoord(25,44)]: true,
    [utils.asGridCoord(31,44)]: true,
    [utils.asGridCoord(32,44)]: true,
    [utils.asGridCoord(33,44)]: true,
    [utils.asGridCoord(41,44)]: true,
    [utils.asGridCoord(42,44)]: true,
    [utils.asGridCoord(-4,45)]: true,
    [utils.asGridCoord(-3,45)]: true,
    [utils.asGridCoord(-2,45)]: true,
    [utils.asGridCoord(-1,45)]: true,
    [utils.asGridCoord(0,45)]: true,
    [utils.asGridCoord(1,45)]: true,
    [utils.asGridCoord(3,45)]: true,
    [utils.asGridCoord(22,45)]: true,
    [utils.asGridCoord(25,45)]: true,
    [utils.asGridCoord(31,45)]: true,
    [utils.asGridCoord(34,45)]: true,
    [utils.asGridCoord(35,45)]: true,
    [utils.asGridCoord(40,45)]: true,
    [utils.asGridCoord(41,45)]: true,
    [utils.asGridCoord(4,46)]: true,
    [utils.asGridCoord(5,46)]: true,
    [utils.asGridCoord(6,46)]: true,
    [utils.asGridCoord(7,46)]: true,
    [utils.asGridCoord(8,46)]: true,
    [utils.asGridCoord(14,46)]: true,
    [utils.asGridCoord(22,46)]: true,
    [utils.asGridCoord(25,46)]: true,
    [utils.asGridCoord(31,46)]: true,
    [utils.asGridCoord(36,46)]: true,
    [utils.asGridCoord(37,46)]: true,
    [utils.asGridCoord(38,46)]: true,
    [utils.asGridCoord(39,46)]: true,
    [utils.asGridCoord(9,47)]: true,
    [utils.asGridCoord(10,47)]: true,
    [utils.asGridCoord(11,47)]: true,
    [utils.asGridCoord(12,47)]: true,
    [utils.asGridCoord(13,47)]: true,
    [utils.asGridCoord(15,47)]: true,
    [utils.asGridCoord(16,47)]: true,
    [utils.asGridCoord(17,47)]: true,
    [utils.asGridCoord(18,47)]: true,
    [utils.asGridCoord(19,47)]: true,
    [utils.asGridCoord(20,47)]: true,
    [utils.asGridCoord(21,47)]: true,
    [utils.asGridCoord(22,47)]: true,
    [utils.asGridCoord(25,47)]: true,
    [utils.asGridCoord(31,47)]: true,
    [utils.asGridCoord(25,48)]: true,
    [utils.asGridCoord(32,48)]: true,
    [utils.asGridCoord(33,48)]: true,
    [utils.asGridCoord(24,49)]: true,
    [utils.asGridCoord(33,49)]: true,
    [utils.asGridCoord(34,49)]: true,
    [utils.asGridCoord(24,50)]: true,
    [utils.asGridCoord(35,50)]: true,
    [utils.asGridCoord(36,50)]: true,
    [utils.asGridCoord(37,50)]: true,
    [utils.asGridCoord(38,50)]: true,
    [utils.asGridCoord(18,51)]: true,
    [utils.asGridCoord(19,51)]: true,
    [utils.asGridCoord(20,51)]: true,
    [utils.asGridCoord(23,51)]: true,
    [utils.asGridCoord(24,51)]: true,
    [utils.asGridCoord(39,51)]: true,
    [utils.asGridCoord(17,52)]: true,
    [utils.asGridCoord(21,52)]: true,
    [utils.asGridCoord(22,52)]: true,
    [utils.asGridCoord(39,52)]: true,
    [utils.asGridCoord(17,53)]: true,
    [utils.asGridCoord(39,53)]: true,
    [utils.asGridCoord(18,54)]: true,
    [utils.asGridCoord(39,54)]: true,
    [utils.asGridCoord(19,55)]: true,
    [utils.asGridCoord(20,55)]: true,
    [utils.asGridCoord(21,55)]: true,
    [utils.asGridCoord(22,55)]: true,
    [utils.asGridCoord(30,55)]: true,
    [utils.asGridCoord(31,55)]: true,
    [utils.asGridCoord(32,55)]: true,
    [utils.asGridCoord(33,55)]: true,
    [utils.asGridCoord(34,55)]: true,
    [utils.asGridCoord(35,55)]: true,
    [utils.asGridCoord(36,55)]: true,
    [utils.asGridCoord(37,55)]: true,
    [utils.asGridCoord(38,55)]: true,
    [utils.asGridCoord(23,56)]: true,
    [utils.asGridCoord(24,56)]: true,
    [utils.asGridCoord(36,56)]: true,
    [utils.asGridCoord(24,57)]: true,
    [utils.asGridCoord(36,57)]: true,
    [utils.asGridCoord(24,58)]: true,
    [utils.asGridCoord(25,58)]: true,
    [utils.asGridCoord(26,58)]: true,
    [utils.asGridCoord(27,58)]: true,
    [utils.asGridCoord(28,58)]: true,
    [utils.asGridCoord(29,58)]: true,
    [utils.asGridCoord(30,58)]: true,
    [utils.asGridCoord(31,58)]: true,
    [utils.asGridCoord(32,58)]: true,
    [utils.asGridCoord(36,58)]: true,
    [utils.asGridCoord(32,59)]: true,
    [utils.asGridCoord(36,59)]: true,
    [utils.asGridCoord(32,60)]: true,
    [utils.asGridCoord(36,60)]: true,
    [utils.asGridCoord(32,61)]: true,
    [utils.asGridCoord(36,61)]: true,
    [utils.asGridCoord(32,62)]: true,
    [utils.asGridCoord(36,62)]: true,
    [utils.asGridCoord(32,63)]: true,
    [utils.asGridCoord(36,63)]: true,
    [utils.asGridCoord(32,64)]: true,
    [utils.asGridCoord(36,64)]: true,
    [utils.asGridCoord(26,65)]: true,
    [utils.asGridCoord(27,65)]: true,
    [utils.asGridCoord(28,65)]: true,
    [utils.asGridCoord(29,65)]: true,
    [utils.asGridCoord(30,65)]: true,
    [utils.asGridCoord(31,65)]: true,
    [utils.asGridCoord(36,65)]: true,
    [utils.asGridCoord(23,66)]: true,
    [utils.asGridCoord(24,66)]: true,
    [utils.asGridCoord(25,66)]: true,
    [utils.asGridCoord(36,66)]: true,
    [utils.asGridCoord(15,67)]: true,
    [utils.asGridCoord(16,67)]: true,
    [utils.asGridCoord(17,67)]: true,
    [utils.asGridCoord(22,67)]: true,
    [utils.asGridCoord(36,67)]: true,
    [utils.asGridCoord(15,68)]: true,
    [utils.asGridCoord(17,68)]: true,
    [utils.asGridCoord(23,68)]: true,
    [utils.asGridCoord(33,68)]: true,
    [utils.asGridCoord(34,68)]: true,
    [utils.asGridCoord(35,68)]: true,
    [utils.asGridCoord(15,69)]: true,
    [utils.asGridCoord(17,69)]: true,
    [utils.asGridCoord(24,69)]: true,
    [utils.asGridCoord(30,69)]: true,
    [utils.asGridCoord(31,69)]: true,
    [utils.asGridCoord(32,69)]: true,
    [utils.asGridCoord(15,70)]: true,
    [utils.asGridCoord(17,70)]: true,
    [utils.asGridCoord(18,70)]: true,
    [utils.asGridCoord(19,70)]: true,
    [utils.asGridCoord(20,70)]: true,
    [utils.asGridCoord(21,70)]: true,
    [utils.asGridCoord(22,70)]: true,
    [utils.asGridCoord(23,70)]: true,
    [utils.asGridCoord(24,70)]: true,
    [utils.asGridCoord(30,70)]: true,
    [utils.asGridCoord(15,71)]: true,
    [utils.asGridCoord(26,71)]: true,
    [utils.asGridCoord(27,71)]: true,
    [utils.asGridCoord(28,71)]: true,
    [utils.asGridCoord(29,71)]: true,
    [utils.asGridCoord(30,71)]: true,
    [utils.asGridCoord(15,72)]: true,
    [utils.asGridCoord(16,72)]: true,
    [utils.asGridCoord(17,72)]: true,
    [utils.asGridCoord(18,72)]: true,
    [utils.asGridCoord(19,72)]: true,
    [utils.asGridCoord(20,72)]: true,
    [utils.asGridCoord(21,72)]: true,
    [utils.asGridCoord(22,72)]: true,
    [utils.asGridCoord(23,72)]: true,
    [utils.asGridCoord(24,72)]: true,
    [utils.asGridCoord(25,72)]: true,
    [utils.asGridCoord(26,72)]: true,
};