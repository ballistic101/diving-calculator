import { DiveStyle } from "../constants/DiveStyleEnum";
import { DiveGroup } from "../constants/DiveGroupEnum";

export interface DiveType {
    name: string;
    number: number;
    style: DiveStyle;
    group: DiveGroup;
    difficulty: number;
}

export const DiveTypes: { [key: string]: DiveType } = {
    "101c": {
        name: "Forward Dive",
        number: 101,
        style: DiveStyle.Tuck,
        group: DiveGroup.Forward,
        difficulty: 1.2
    },
    "101b": {
        name: "Forward Dive",
        number: 101,
        style: DiveStyle.Pike,
        group: DiveGroup.Forward,
        difficulty: 1.3
    },
    "101a": {
        name: "Forward Dive",
        number: 101,
        style: DiveStyle.Straight,
        group: DiveGroup.Forward,
        difficulty: 1.4
    },
    "102c": {
        name: "Forward 1 Somersault",
        number: 102,
        style: DiveStyle.Tuck,
        group: DiveGroup.Forward,
        difficulty: 1.4
    },
    "102b": {
        name: "Forward 1 Somersault",
        number: 102,
        style: DiveStyle.Pike,
        group: DiveGroup.Forward,
        difficulty: 1.5
    },
    "102a": {
        name: "Forward 1 Somersault",
        number: 102,
        style: DiveStyle.Straight,
        group: DiveGroup.Forward,
        difficulty: 1.6
    },
    "103c": {
        name: "Forward 1-1/2 Somersaults",
        number: 103,
        style: DiveStyle.Tuck,
        group: DiveGroup.Forward,
        difficulty: 1.6
    },
    "103b": {
        name: "Forward 1-1/2 Somersaults",
        number: 103,
        style: DiveStyle.Pike,
        group: DiveGroup.Forward,
        difficulty: 1.7
    },
    "103a": {
        name: "Forward 1-1/2 Somersaults",
        number: 103,
        style: DiveStyle.Straight,
        group: DiveGroup.Forward,
        difficulty: 2.0
    },
    "104c": {
        name: "Forward 2 Somersaults",
        number: 104,
        style: DiveStyle.Tuck,
        group: DiveGroup.Forward,
        difficulty: 2.2
    },
    "104b": {
        name: "Forward 2 Somersaults",
        number: 104,
        style: DiveStyle.Pike,
        group: DiveGroup.Forward,
        difficulty: 2.3
    },
    "104a": {
        name: "Forward 2 Somersaults",
        number: 104,
        style: DiveStyle.Straight,
        group: DiveGroup.Forward,
        difficulty: 2.6
    },

    "105c": {
        name: "Forward 2-1/2 Somersaults",
        number: 105,
        style: DiveStyle.Tuck,
        group: DiveGroup.Forward,
        difficulty: 2.4
    },
    "105b": {
        name: "Forward 2-1/2 Somersaults",
        number: 105,
        style: DiveStyle.Pike,
        group: DiveGroup.Forward,
        difficulty: 2.6
    },
    "106c": {
        name: "Forward 3 Somersaults",
        number: 106,
        style: DiveStyle.Tuck,
        group: DiveGroup.Forward,
        difficulty: 2.9
    },
    "106b": {
        name: "Forward 3 Somersaults",
        number: 106,
        style: DiveStyle.Pike,
        group: DiveGroup.Forward,
        difficulty: 3.2
    },
    "107c": {
        name: "Forward 3-1/2 Somersaults",
        number: 107,
        style: DiveStyle.Tuck,
        group: DiveGroup.Forward,
        difficulty: 3.0
    },
    "107b": {
        name: "Forward 3-1/2 Somersaults",
        number: 107,
        style: DiveStyle.Pike,
        group: DiveGroup.Forward,
        difficulty: 3.3
    },
    "112c": {
        name: "Forward Flying 1 Somersault",
        number: 112,
        style: DiveStyle.Tuck,
        group: DiveGroup.Forward,
        difficulty: 1.6
    },
    "112b": {
        name: "Forward Flying 1 Somersault",
        number: 112,
        style: DiveStyle.Pike,
        group: DiveGroup.Forward,
        difficulty: 1.7
    },
    "113c": {
        name: "Forward Flying 1-1/2 Somersault",
        number: 113,
        style: DiveStyle.Tuck,
        group: DiveGroup.Forward,
        difficulty: 1.8
    },
    "113b": {
        name: "Forward Flying 1-1/2 Somersault",
        number: 113,
        style: DiveStyle.Pike,
        group: DiveGroup.Forward,
        difficulty: 1.9
    },
    "201c": {
        name: "Back Dive",
        number: 201,
        style: DiveStyle.Tuck,
        group: DiveGroup.Back,
        difficulty: 1.5
    },
    "201b": {
        name: "Back Dive",
        number: 201,
        style: DiveStyle.Pike,
        group: DiveGroup.Back,
        difficulty: 1.6
    },
    "201a": {
        name: "Back Dive",
        number: 201,
        style: DiveStyle.Straight,
        group: DiveGroup.Back,
        difficulty: 1.7
    },
    "202c": {
        name: "Back Dive 1 Somersault",
        number: 202,
        style: DiveStyle.Tuck,
        group: DiveGroup.Back,
        difficulty: 1.5
    },
    "202b": {
        name: "Back Dive 1 Somersault",
        number: 202,
        style: DiveStyle.Pike,
        group: DiveGroup.Back,
        difficulty: 1.6
    },
    "202a": {
        name: "Back Dive 1 Somersault",
        number: 202,
        style: DiveStyle.Straight,
        group: DiveGroup.Back,
        difficulty: 1.7
    },
    "203c": {
        name: "Back Dive 1-1/2 Somersaults",
        number: 203,
        style: DiveStyle.Tuck,
        group: DiveGroup.Back,
        difficulty: 2.0
    },
    "203b": {
        name: "Back Dive 1-1/2 Somersaults",
        number: 203,
        style: DiveStyle.Pike,
        group: DiveGroup.Back,
        difficulty: 2.3
    },
    "203a": {
        name: "Back Dive 1-1/2 Somersaults",
        number: 203,
        style: DiveStyle.Straight,
        group: DiveGroup.Back,
        difficulty: 2.5
    },
    "204c": {
        name: "Back Dive 2 Somersaults",
        number: 204,
        style: DiveStyle.Tuck,
        group: DiveGroup.Back,
        difficulty: 2.0
    },
    "204b": {
        name: "Back Dive 2 Somersaults",
        number: 204,
        style: DiveStyle.Pike,
        group: DiveGroup.Back,
        difficulty: 2.3
    },
    "205c": {
        name: "Back Dive 2-1/2 Somersaults",
        number: 205,
        style: DiveStyle.Tuck,
        group: DiveGroup.Back,
        difficulty: 3.0
    },
    "205b": {
        name: "Back Dive 2-1/2 Somersaults",
        number: 205,
        style: DiveStyle.Pike,
        group: DiveGroup.Back,
        difficulty: 3.2
    },
    "301c": {
        name: "Reverse Dive",
        number: 301,
        style: DiveStyle.Tuck,
        group: DiveGroup.Reverse,
        difficulty: 1.6
    },
    "301b": {
        name: "Reverse Dive",
        number: 301,
        style: DiveStyle.Pike,
        group: DiveGroup.Reverse,
        difficulty: 1.7
    },
    "301a": {
        name: "Reverse Dive",
        number: 301,
        style: DiveStyle.Straight,
        group: DiveGroup.Reverse,
        difficulty: 1.8
    },
    "302c": {
        name: "Reverse Dive 1 Somersault",
        number: 302,
        style: DiveStyle.Tuck,
        group: DiveGroup.Reverse,
        difficulty: 1.6
    },
    "302b": {
        name: "Reverse Dive 1 Somersault",
        number: 302,
        style: DiveStyle.Pike,
        group: DiveGroup.Reverse,
        difficulty: 1.7
    },
    "302a": {
        name: "Reverse Dive 1 Somersault",
        number: 302,
        style: DiveStyle.Straight,
        group: DiveGroup.Reverse,
        difficulty: 1.8
    },
    "303c": {
        name: "Reverse Dive 1-1/2 Somersaults",
        number: 303,
        style: DiveStyle.Tuck,
        group: DiveGroup.Reverse,
        difficulty: 2.1
    },
    "303b": {
        name: "Reverse Dive 1-1/2 Somersaults",
        number: 303,
        style: DiveStyle.Pike,
        group: DiveGroup.Reverse,
        difficulty: 2.4
    },
    "303a": {
        name: "Reverse Dive 1-1/2 Somersaults",
        number: 303,
        style: DiveStyle.Straight,
        group: DiveGroup.Reverse,
        difficulty: 2.7
    },
    "304c": {
        name: "Reverse Dive 2 Somersaults",
        number: 304,
        style: DiveStyle.Tuck,
        group: DiveGroup.Reverse,
        difficulty: 2.1
    },
    "304b": {
        name: "Reverse Dive 2 Somersaults",
        number: 304,
        style: DiveStyle.Pike,
        group: DiveGroup.Reverse,
        difficulty: 2.4
    },
    "304a": {
        name: "Reverse Dive 2 Somersaults",
        number: 304,
        style: DiveStyle.Straight,
        group: DiveGroup.Reverse,
        difficulty: 2.9
    },
    "305c": {
        name: "Reverse Dive 2-1/2 Somersaults",
        number: 305,
        style: DiveStyle.Tuck,
        group: DiveGroup.Reverse,
        difficulty: 3.0
    },
    "305b": {
        name: "Reverse Dive 2-1/2 Somersaults",
        number: 305,
        style: DiveStyle.Pike,
        group: DiveGroup.Reverse,
        difficulty: 3.2
    },
    "401c": {
        name: "Inward Dive",
        number: 401,
        style: DiveStyle.Tuck,
        group: DiveGroup.Inward,
        difficulty: 1.4
    },
    "401b": {
        name: "Inward Dive",
        number: 401,
        style: DiveStyle.Pike,
        group: DiveGroup.Inward,
        difficulty: 1.5
    },
    "401a": {
        name: "Inward Dive",
        number: 401,
        style: DiveStyle.Straight,
        group: DiveGroup.Inward,
        difficulty: 1.8
    },
    "402c": {
        name: "Inward Dive - 1 Somersault",
        number: 402,
        style: DiveStyle.Tuck,
        group: DiveGroup.Inward,
        difficulty: 1.6
    },
    "402b": {
        name: "Inward Dive - 1 Somersault",
        number: 402,
        style: DiveStyle.Pike,
        group: DiveGroup.Inward,
        difficulty: 1.7
    },
    "402a": {
        name: "Inward Dive - 1 Somersault",
        number: 402,
        style: DiveStyle.Straight,
        group: DiveGroup.Inward,
        difficulty: 2.0
    },
    "403c": {
        name: "Inward Dive - 1-1/2 Somersaults",
        number: 403,
        style: DiveStyle.Tuck,
        group: DiveGroup.Inward,
        difficulty: 2.2
    },
    "403b": {
        name: "Inward Dive - 1-1/2 Somersaults",
        number: 403,
        style: DiveStyle.Pike,
        group: DiveGroup.Inward,
        difficulty: 2.4
    },
    "404c": {
        name: "Inward Dive - 2 Somersaults",
        number: 404,
        style: DiveStyle.Tuck,
        group: DiveGroup.Inward,
        difficulty: 2.8
    },
    "404b": {
        name: "Inward Dive - 2 Somersaults",
        number: 404,
        style: DiveStyle.Pike,
        group: DiveGroup.Inward,
        difficulty: 3.0
    },
    "405c": {
        name: "Inward Dive - 2-1/2 Somersaults",
        number: 405,
        style: DiveStyle.Tuck,
        group: DiveGroup.Inward,
        difficulty: 3.1
    },
    "405b": {
        name: "Inward Dive - 2-1/2 Somersaults",
        number: 405,
        style: DiveStyle.Pike,
        group: DiveGroup.Inward,
        difficulty: 3.4
    },
    "412b": {
        name: "Inward Flying 1 Somesault",
        number: 412,
        style: DiveStyle.Pike,
        group: DiveGroup.Inward,
        difficulty: 2.0
    },
    "412a": {
        name: "Inward Flying 1 Somersault",
        number: 412,
        style: DiveStyle.Straight,
        group: DiveGroup.Inward,
        difficulty: 2.1
    },
    "413b": {
        name: "Inward Flying 1-1/2 Somesaults",
        number: 413,
        style: DiveStyle.Pike,
        group: DiveGroup.Inward,
        difficulty: 2.7
    },
    "413a": {
        name: "Inward Flying 1-1/2 Somersaults",
        number: 413,
        style: DiveStyle.Straight,
        group: DiveGroup.Inward,
        difficulty: 2.9
    },
    "5111c": {
        name: "Forward Dive, 1/2 Twist",
        number: 5111,
        style: DiveStyle.Tuck,
        group: DiveGroup.Twist,
        difficulty: 1.6
    },
    "5111b": {
        name: "Forward Dive, 1/2 Twist",
        number: 5111,
        style: DiveStyle.Pike,
        group: DiveGroup.Twist,
        difficulty: 1.7
    },
    "5111a": {
        name: "Forward Dive, 1/2 Twist",
        number: 5111,
        style: DiveStyle.Straight,
        group: DiveGroup.Twist,
        difficulty: 1.8
    },
    "5112b": {
        name: "Forward Dive, 1 Twist",
        number: 5112,
        style: DiveStyle.Pike,
        group: DiveGroup.Twist,
        difficulty: 1.9
    },
    "5112a": {
        name: "Forward Dive, 1 Twist",
        number: 5112,
        style: DiveStyle.Straight,
        group: DiveGroup.Twist,
        difficulty: 2.0
    },
    "5121d": {
        name: "Forward 1 Somersault, 1/2 Twist",
        number: 5121,
        style: DiveStyle.Free,
        group: DiveGroup.Twist,
        difficulty: 1.7
    },
    "5122d": {
        name: "Forward 1 Somersault, 1 Twist",
        number: 5122,
        style: DiveStyle.Free,
        group: DiveGroup.Twist,
        difficulty: 1.9
    },
    "5124d": {
        name: "Forward 1 Somersault, 2 Twists",
        number: 5124,
        style: DiveStyle.Free,
        group: DiveGroup.Twist,
        difficulty: 2.3
    },
    "5126d": {
        name: "Forward 1 Somersault, 3 Twists",
        number: 5126,
        style: DiveStyle.Free,
        group: DiveGroup.Twist,
        difficulty: 2.8
    },
    "5131d": {
        name: "Forward 1-1/2 Somersaults, 1/2 Twist",
        number: 5131,
        style: DiveStyle.Free,
        group: DiveGroup.Twist,
        difficulty: 2.0
    },
    "5132d": {
        name: "Forward 1-1/2 Somersaults, 1 Twist",
        number: 5132,
        style: DiveStyle.Free,
        group: DiveGroup.Twist,
        difficulty: 2.2
    },
    "5134d": {
        name: "Forward 1-1/2 Somersaults, 2 Twists",
        number: 5134,
        style: DiveStyle.Free,
        group: DiveGroup.Twist,
        difficulty: 2.6
    },
    "5136d": {
        name: "Forward 1-1/2 Somersaults, 3 Twists",
        number: 5136,
        style: DiveStyle.Free,
        group: DiveGroup.Twist,
        difficulty: 3.1
    },
    "5142c": {
        name: "Forward 2 Somersaults, 1 Twist",
        number: 5142,
        style: DiveStyle.Tuck,
        group: DiveGroup.Twist,
        difficulty: 2.6
    },
    "5142b": {
        name: "Forward 2 Somersaults, 1 Twist",
        number: 5142,
        style: DiveStyle.Pike,
        group: DiveGroup.Twist,
        difficulty: 2.7
    },
    "5152c": {
        name: "Forward 2-1/2 Somersaults, 1 Twist",
        number: 5152,
        style: DiveStyle.Tuck,
        group: DiveGroup.Twist,
        difficulty: 3.0
    },
    "5152b": {
        name: "Forward 2-1/2 Somersaults, 1 Twist",
        number: 5152,
        style: DiveStyle.Pike,
        group: DiveGroup.Twist,
        difficulty: 3.2
    },
    "5211a": {
        name: "Back Dive, 1/2 Twist",
        number: 5211,
        style: DiveStyle.Straight,
        group: DiveGroup.Twist,
        difficulty: 1.8
    },
    "5212a": {
        name: "Back Dive, 1 Twist",
        number: 5212,
        style: DiveStyle.Straight,
        group: DiveGroup.Twist,
        difficulty: 2.0
    },
    "5221d": {
        name: "Back 1 Somersault, 1/2 Twist",
        number: 5221,
        style: DiveStyle.Free,
        group: DiveGroup.Twist,
        difficulty: 1.7
    },
    "5222d": {
        name: "Back 1 Somersault, 1 Twist",
        number: 5222,
        style: DiveStyle.Free,
        group: DiveGroup.Twist,
        difficulty: 1.9
    },
    "5223d": {
        name: "Back 1 Somersault, 1-1/2 Twists",
        number: 5223,
        style: DiveStyle.Free,
        group: DiveGroup.Twist,
        difficulty: 2.3
    },
    "5225d": {
        name: "Back 1 Somersault, 2-1/2 Twists",
        number: 5225,
        style: DiveStyle.Free,
        group: DiveGroup.Twist,
        difficulty: 2.7
    },
    "5227d": {
        name: "Back 1 Somersault, 3-1/2 Twists",
        number: 5227,
        style: DiveStyle.Free,
        group: DiveGroup.Twist,
        difficulty: 3.2
    },
    "5231d": {
        name: "Back 1-1/2 Somersaults, 1/2 Twist",
        number: 5231,
        style: DiveStyle.Free,
        group: DiveGroup.Twist,
        difficulty: 2.1
    },
    "5233d": {
        name: "Back 1-1/2 Somersaults, 1-1/2 Twists",
        number: 5233,
        style: DiveStyle.Free,
        group: DiveGroup.Twist,
        difficulty: 2.5
    },
    "5235d": {
        name: "Back 1-1/2 Somersaults, 2-1/2 Twists",
        number: 5235,
        style: DiveStyle.Free,
        group: DiveGroup.Twist,
        difficulty: 2.9
    },
    "5251c": {
        name: "Back 2-1/2 Somersaults, 1/2 Twist",
        number: 5251,
        style: DiveStyle.Tuck,
        group: DiveGroup.Twist,
        difficulty: 2.7
    },
    "5251b": {
        name: "Back 2-1/2 Somersaults, 1/2 Twist",
        number: 5251,
        style: DiveStyle.Pike,
        group: DiveGroup.Twist,
        difficulty: 2.9
    },
    "5311a": {
        name: "Reverse Dive, 1/2 Twist",
        number: 5311,
        style: DiveStyle.Straight,
        group: DiveGroup.Twist,
        difficulty: 1.9
    },
    "5312a": {
        name: "Reverse Dive, 1 Twist",
        number: 5312,
        style: DiveStyle.Straight,
        group: DiveGroup.Twist,
        difficulty: 2.1
    },
    "5321d": {
        name: "Reverse 1 Somersault, 1/2 Twist",
        number: 5321,
        style: DiveStyle.Free,
        group: DiveGroup.Twist,
        difficulty: 1.8
    },
    "5322d": {
        name: "Reverse 1 Somersault, 1 Twist",
        number: 5322,
        style: DiveStyle.Free,
        group: DiveGroup.Twist,
        difficulty: 2.0
    },
    "5323d": {
        name: "Reverse 1 Somersault, 1-1/2 Twists",
        number: 5323,
        style: DiveStyle.Free,
        group: DiveGroup.Twist,
        difficulty: 2.4
    },
    "5325d": {
        name: "Reverse 1 Somersault, 2-1/2 Twists",
        number: 5325,
        style: DiveStyle.Free,
        group: DiveGroup.Twist,
        difficulty: 2.8
    },
    "5331d": {
        name: "Reverse 1-1/2 Somersaults, 1/2 Twist",
        number: 5331,
        style: DiveStyle.Free,
        group: DiveGroup.Twist,
        difficulty: 2.2
    },
    "5333d": {
        name: "Reverse 1-1/2 Somersaults, 1-1/2 Twists",
        number: 5333,
        style: DiveStyle.Free,
        group: DiveGroup.Twist,
        difficulty: 2.6
    },
    "5335d": {
        name: "Reverse 1-1/2 Somersaults, 2-1/2 Twists",
        number: 5335,
        style: DiveStyle.Free,
        group: DiveGroup.Twist,
        difficulty: 3.0
    },
    "5351c": {
        name: "Reverse 2-1/2 Somersaults, 1/2 Twist",
        number: 5351,
        style: DiveStyle.Tuck,
        group: DiveGroup.Twist,
        difficulty: 2.7
    },
    "5351b": {
        name: "Reverse 2-1/2 Somersaults, 1/2 Twist",
        number: 5351,
        style: DiveStyle.Pike,
        group: DiveGroup.Twist,
        difficulty: 2.9
    },
    "5411b": {
        name: "Inward Dive, 1/2 Twist",
        number: 5411,
        style: DiveStyle.Pike,
        group: DiveGroup.Twist,
        difficulty: 1.7
    },
    "5411a": {
        name: "Inward Dive, 1/2 Twist",
        number: 5411,
        style: DiveStyle.Straight,
        group: DiveGroup.Twist,
        difficulty: 2.0
    },
    "5412b": {
        name: "Inward Dive, 1 Twist",
        number: 5412,
        style: DiveStyle.Pike,
        group: DiveGroup.Twist,
        difficulty: 1.9
    },
    "5412a": {
        name: "Inward Dive, 1 Twist",
        number: 5412,
        style: DiveStyle.Straight,
        group: DiveGroup.Twist,
        difficulty: 2.2
    },
    "5421d": {
        name: "Inward 1 Somersault, 1/2 Twist",
        number: 5421,
        style: DiveStyle.Free,
        group: DiveGroup.Twist,
        difficulty: 1.9
    },
    "5422d": {
        name: "Inward 1 Somersault, 1 Twist",
        number: 5422,
        style: DiveStyle.Free,
        group: DiveGroup.Twist,
        difficulty: 2.1
    },
    "5432d": {
        name: "Inward 1-1/2 Somersaults, 1 Twist",
        number: 5432,
        style: DiveStyle.Free,
        group: DiveGroup.Twist,
        difficulty: 2.7
    },
    "5434d": {
        name: "Inward 1-1/2 Somersaults, 2 Twists",
        number: 5434,
        style: DiveStyle.Free,
        group: DiveGroup.Twist,
        difficulty: 3.1
    },
}