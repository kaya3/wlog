'use strict';
function* mjr_mazes_and_lakes(width, height, rng) {
    // compiled by mjrc-0.1 (unstable) on 2022-12-10, 22:50:50 GMT
    if(width <= 0 || height <= 0) {
        throw new Error("Grid dimensions must be positive");
    } else if(width > 14654 || height > 14654) {
        throw new Error("Grid dimensions cannot exceed 14654");
    }
    width = width | 0;
    height = height | 0;
    
    if(typeof MJr !== "object" || typeof MJr.VERSION !== "number") throw new Error("MJr runtime library not found");
    if(MJr.VERSION !== 0) throw new Error("Requires MJr runtime library version 0");
    rng ??= MJr.DEFAULT_PRNG;
    const int_ctz = MJr.OPS.int_ctz;
    const int_floordiv = MJr.OPS.int_floordiv;
    
    const grid0_n = width * height,
        grid0_data = new Uint8Array(grid0_n),
        grid0_obj = new MJr.Grid(width, height, grid0_data, "BWREI");
    const grid0_sampler0 = new MJr.Sampler(grid0_n);
    const grid0_sampler1 = new MJr.Sampler(grid0_n << 2);
    const grid0_sampler2 = new MJr.Sampler(grid0_n << 2);
    const grid0_sampler3 = new MJr.Sampler(grid0_n << 2);
    const grid0_sampler4 = new MJr.Sampler(grid0_n);
    const grid0_sampler5 = new MJr.Sampler(grid0_n << 1);
    const grid0_sampler6 = new MJr.Sampler(grid0_n << 1);
    const grid0_sampler7 = new MJr.Sampler(5 * grid0_n);
    const grid0_sampler8 = new MJr.Sampler(grid0_n);
    
    const grid0_matcher0_rowDFA = MJr.HEX.u8(
            "01020304050602030407080903040a0b0c03040a080203040a0d0203040e0f10111213" +
            "1415161718191a1b1c1d08091e040a14151617181f1a1b1c1d082003040a191a1b1c21" +
            "14151617180f10111213220903040a0b0c03040a080203040a1415161718191a1b1c21" +
            "080903040a0b0c03040a080203040a14151617180f10111213080903040a0b0c03040a" +
            "080203040a14151617180b0c03040a0f1011121308091e040a1415161718231a1b1c1d" +
            "0f10111213"
        ),
        grid0_matcher0_rowAcceptSetIDs = MJr.HEX.u4("01020314103105610704502061020489a41b"),
        grid0_matcher0_rowAcceptSets = MJr.HEX.u12("0000010804004020056000900c0009020101"),
        grid0_matcher0_rowsToCols = MJr.HEX.u8(
            "00010203000401040102040102010405060708090a0b0c0d0e0f10111213030f" +
            "0214010f"
        ),
        grid0_matcher0_colDFA = MJr.HEX.u8(
            "00178964311d2302035b1463716f3e4f0c6c5e6767004689644844230203527463716f8d3b0c6c5e3434" +
            "000e0464316a6002035b3d1b716f3e4e6b6c5e676700178964317b2302035b1463716f3e4f0c6c5e6767" +
            "00176864311d7702035b1461716f3e4f226c5e676700794b756236884d860608358a6f427333184a0101" +
            "00468964482b230203527463716f8d3b0c6c5e343400794b75621550590b0908358a6f42782043381f1f" +
            "00794b75623c7625031608358a6f421949855e587e00468964482b230203527463716f8d3b0c6c5e3434" +
            "00794b75621550590b0908358a6f42782043381f1f00178964317b2302035b1463716f3e4f0c6c5e6767" +
            "00177f6431115d02035b1429716f3e4f2d6c5e676700177f64317b5d02035b1429716f3e4f2d6c5e6767" +
            "006589646281230203162e63716f42410c6c5e585800794b756236884d860608358a6f427333184a0101" +
            "00794b756236884d860608358a6f427333184a010100798964621c0d3745690863716f427d0c6c5e5858" +
            "000e046431136002035b3d1b716f3e4e6b6c5e6767006589646228230203162e63716f42410c6c5e5858" +
            "00798964623c230203160863716f42190c6c5e587e00794b75621550590b0908358a6f42782043381f1f" +
            "00468964482b230203527463716f8d3b0c6c5e343400798964623c230203160863716f42190c6c5e5858" +
            "000e046431546002035b3d1b716f3e4e6b6c5e676700794b75620f7625031608358a6f421949855e5858" +
            "001e8964620a8c70802a2463716f42392f6e82666600176864311d7702035b1461716f3e4f226c5e675c" +
            "00794b75621550590b0908358a6f42782043381f1f00798964622c230203160863716f42190c6c5e5858" +
            "00794b75623c7625031608358a6f421949855e5858004689644844230203527463716f8d3b0c6c5e3434" +
            "003f7f6431575d02035b6d29716f3e512d6c5e676700794b75620f7625031608358a6f421949855e5858" +
            "00177f1231115d87035b1429566f3e4f2d475e676700177f64317b5d02035b1429716f3e4f2d6c5e6767" +
            "00794b75623c7625031608358a6f421949855e587e000e0464316a6002035b3d1b716f3e4e6b6c5e6767" +
            "00798964623c230203160863716f42190c6c5e587e00794b75620f7625031608358a6f421949855e5858" +
            "00794b75621550590b0908358a6f42782043381f1f00177f12311d5d87035b1429566f3e4f2d475e675c" +
            "00468964482b230203527463716f8d3b0c6c5e34340079896462308c70802a0863716f42532f6e826666" +
            "00794b75621550590b0908358a6f42782043381f1f00177f1231115d87035b1429566f3e4f2d475e6767" +
            "00794b75623c7625031608358a6f421949855e587e00177f6431115d02035b1429716f3e4f2d6c5e6767" +
            "00794b75621550590b0908358a6f42782043381f1f00468964487a230203527463716f8d3b0c6c5e3434" +
            "00794b75621550590b0908358a6f42782043381f1f003f7f6431575d02035b6d29716f3e512d6c5e6767" +
            "004689644844230203527463716f8d3b0c6c5e3434003f7f6431835d02035b6d29716f3e512d6c5e675c" +
            "00794b75621550590b0908358a6f42782043381f1f000e0464316a6002035b3d1b716f3e4e6b6c5e6767" +
            "0017896431112302035b1463716f3e4f0c6c5e676700794b75620f7625031608358a6f421949855e5858" +
            "00178964311d2302035b1463716f3e4f0c6c5e675c00798964620f230203160863716f42190c6c5e5858" +
            "00794b75622c7625031608358a6f421949855e5858006589646281230203162e63716f42410c6c5e587e" +
            "00468964487a230203527463716f8d3b0c6c5e348b001e89646284230203162463716f424c0c6c5e5858" +
            "00468964487a230203527463716f8d3b0c6c5e348b00794b75620f7625031608358a6f421949855e5858" +
            "00468964487a230203527463716f8d3b0c6c5e348b000e046431546002035b3d1b716f3e4e6b6c5e6767" +
            "00798964621c0d3745690863716f427d0c6c5e585800178964317b2302035b1463716f3e4f0c6c5e6767" +
            "00798964623c230203160863716f42190c6c5e5858000e046431546002035b3d1b716f3e4e6b6c5e6767" +
            "00468964487a230203527463716f8d3b0c6c5e3434003f7f6431575d02035b6d29716f3e512d6c5e6767" +
            "0017896431112302035b1463716f3e4f0c6c5e6767003f7f6431835d02035b6d29716f3e512d6c5e6767" +
            "00794b75620f7625031608358a6f421949855e5858000e0464316a6002035b3d1b716f3e4e6b6c5e6767" +
            "006589646205230203162e63716f42410c6c5e585800798964620f230203160863716f42190c6c5e5858" +
            "003f7f64311a5d02035b6d29716f3e512d6c5e6767001e89646210230203162463716f424c0c6c5e5858" +
            "00468964482b230203527463716f8d3b0c6c5e343400794b75620f7625031608358a6f421949855e5858" +
            "00658964625f0d3745692e63716f42210c6c5e585800177f64311d5d02035b1429716f3e4f2d6c5e675c" +
            "000e046431136002035b3d1b716f3e4e6b6c5e675c001e896462320d3745692463716f42270c6c5e5858" +
            "004689644844230203527463716f8d3b0c6c5e3434000e0464316a6002035b3d1b716f3e4e6b6c5e6767" +
            "00794b75621550590b0908358a6f42782043381f1f00468964482b230203527463716f8d3b0c6c5e3434" +
            "004689644844230203522655723a403b0c6c5e343400177f12317b5d87035b1429566f3e4f2d475e6767" +
            "0017896431112302035b1463716f3e4f0c6c5e676700794b75621550590b0908358a6f42782043381f1f" +
            "00176864317b7702035b1461716f3e4f226c5e676700177f12311d5d87035b1429566f3e4f2d475e675c" +
            "00468964487a230203527463716f8d3b0c6c5e343400177f64311d5d02035b1429716f3e4f2d6c5e675c" +
            "000e046431136002035b3d1b716f3e4e6b6c5e676700794b75623c7625031608358a6f421949855e5858" +
            "004689644844230203527463716f8d3b0c6c5e3434004689644844230203527463716f8d3b0c6c5e3434" +
            "00177f12311d5d87035b1429566f3e4f2d475e676700468964482b230203527463716f8d3b0c6c5e3434" +
            "0065896462078c70802a2e63716f427c2f6e8266660017686431117702035b1461716f3e4f226c5e6767" +
            "000e046431546002035b3d1b716f3e4e6b6c5e6767001e89646284230203162463716f424c0c6c5e587e" +
            "000e046431546002035b3d1b716f3e4e6b6c5e676700178964311d2302035b1463716f3e4f0c6c5e675c" +
            "000e0464316a6002035b3d1b716f3e4e6b6c5e6767000e046431136002035b3d1b716f3e4e6b6c5e675c" +
            "000e046431136002035b3d1b716f3e4e6b6c5e675c00794b75620f7625031608358a6f421949855e5858" +
            "00798964623c230203160863716f42190c6c5e587e000e046431136002035b3d1b716f3e4e6b6c5e6767" +
            "003f7f64311a5d02035b6d29716f3e512d6c5e676700177f12317b5d87035b1429566f3e4f2d475e6767" +
            "00794b75620f7625031608358a6f421949855e585800794b75623c7625031608358a6f421949855e5858" +
            "00798964622c230203160863716f42190c6c5e58580079896462308c70802a0863716f42532f6e826666" +
            "00794b75620f7625031608358a6f421949855e585800794b75620f7625031608358a6f421949855e5858" +
            "004689644844230203522655723a403b0c6c5e343400177f12311d5d87035b1429566f3e4f2d475e6767" +
            "00178964317b2302035b1463716f3e4f0c6c5e676700794b75622c7625031608358a6f421949855e5858" +
            "0017896431112302035b1463716f3e4f0c6c5e6767001e8964625a230203162463716f424c0c6c5e5858" +
            "00794b75622c7625031608358a6f421949855e5858000e046431546002035b3d1b716f3e4e6b6c5e6767" +
            "00178964317b2302035b1463716f3e4f0c6c5e6767000e0464316a6002035b3d1b716f3e4e6b6c5e6767" +
            "003f7f64311a5d02035b6d29716f3e512d6c5e676700177f64311d5d02035b1429716f3e4f2d6c5e6767" +
            "000e046431136002035b3d1b716f3e4e6b6c5e675c004689644844230203522655723a403b0c6c5e3434" +
            "00177f64317b5d02035b1429716f3e4f2d6c5e676700468964487a230203527463716f8d3b0c6c5e348b"
        ),
        grid0_matcher0_colAcceptSetIDs = MJr.HEX.u8(
            "0001000000020304000506070008000009000a00000b0c000d0000000e00090f" +
            "1011120009131415020016170000021819001a1b1c001d08101e1f1700000000" +
            "20020c211708170a1c001b000922000007001c23001f0a000c24090000000025" +
            "00120c0000022600122700000000180028001f29171300122a0017002b2c0c00" +
            "2802180009132d0a2d00131c281c"
        ),
        grid0_matcher0_colAcceptSets = MJr.HEX.u16(
            "0000080100040c0115041c0115401c000400004000201d000001080805001801" +
            "18000104001000080202014014010002100015000540080000800d0011400200" +
            "028018080c0811001c08050410010401140009001900110401000c00"
        ),
        grid0_matcher0_rowStates = new Uint8Array(grid0_n),
        grid0_matcher0_colStates = new Uint8Array(grid0_n);
    function grid0_matcher0_update(startX, startY, w, h) {
        const endX = startX + w,
            endY = startY + h;
        
        // recompute row states
        for(let atY = startY; atY < endY; ++atY) {
            let s = endX < width ? grid0_matcher0_rowStates[endX + atY * width] : 0;
            for(let atX = endX - 1; atX >= 0; --atX) {
                const at = atX + atY * width;
                const oldS = grid0_matcher0_rowStates[at];
                s = grid0_matcher0_rowDFA[5 * s + grid0_data[at]];
                if(s === oldS) {
                    if(atX < startX) {
                        break;
                    } else {
                        continue;
                    }
                }
                grid0_matcher0_rowStates[at] = s;
                if(atX < startX) {
                    startX = atX;
                }
                const t = grid0_matcher0_rowAcceptSetIDs[s],
                    oldT = grid0_matcher0_rowAcceptSetIDs[oldS];
                if(t === oldT) {
                    continue;
                }
                let u;
                u = grid0_matcher0_rowAcceptSets[oldT] & ~grid0_matcher0_rowAcceptSets[t];
                while(u !== 0) {
                    const i = int_ctz(u);
                    switch(i) {
                        case 0: {
                            grid0_sampler0.del(at);
                            break;
                        }
                        case 1:
                        case 2: {
                            grid0_sampler1.del(at << 2 ^ i + 1);
                            break;
                        }
                        case 3:
                        case 4: {
                            grid0_sampler2.del(at << 2 ^ i - 1);
                            break;
                        }
                        case 5:
                        case 6: {
                            grid0_sampler3.del(at << 2 ^ i - 3);
                            break;
                        }
                        case 7: {
                            grid0_sampler4.del(at);
                            break;
                        }
                        case 8: {
                            grid0_sampler5.del(at << 1 ^ 1);
                            break;
                        }
                        case 9: {
                            grid0_sampler6.del(at << 1 ^ 1);
                            break;
                        }
                        case 10: {
                            grid0_sampler8.del(at);
                            break;
                        }
                    }
                    u &= u - 1;
                }
                u = grid0_matcher0_rowAcceptSets[t] & ~grid0_matcher0_rowAcceptSets[oldT];
                while(u !== 0) {
                    const i = int_ctz(u);
                    switch(i) {
                        case 0: {
                            grid0_sampler0.add(at);
                            break;
                        }
                        case 1:
                        case 2: {
                            grid0_sampler1.add(at << 2 ^ i + 1);
                            break;
                        }
                        case 3:
                        case 4: {
                            grid0_sampler2.add(at << 2 ^ i - 1);
                            break;
                        }
                        case 5:
                        case 6: {
                            grid0_sampler3.add(at << 2 ^ i - 3);
                            break;
                        }
                        case 7: {
                            grid0_sampler4.add(at);
                            break;
                        }
                        case 8: {
                            grid0_sampler5.add(at << 1 ^ 1);
                            break;
                        }
                        case 9: {
                            grid0_sampler6.add(at << 1 ^ 1);
                            break;
                        }
                        case 10: {
                            grid0_sampler8.add(at);
                            break;
                        }
                    }
                    u &= u - 1;
                }
            }
        }
        
        // recompute col states
        for(let atX = startX; atX < endX; ++atX) {
            let s = endY < height ? grid0_matcher0_colStates[atX + endY * width] : 0;
            for(let atY = endY - 1; atY >= 0; --atY) {
                const at = atX + atY * width;
                const oldS = grid0_matcher0_colStates[at];
                s = grid0_matcher0_colDFA[21 * s + grid0_matcher0_rowsToCols[grid0_matcher0_rowStates[at]]];
                if(s === oldS) {
                    if(atY < startY) {
                        break;
                    } else {
                        continue;
                    }
                }
                grid0_matcher0_colStates[at] = s;
                const t = grid0_matcher0_colAcceptSetIDs[s],
                    oldT = grid0_matcher0_colAcceptSetIDs[oldS];
                if(t === oldT) {
                    continue;
                }
                let u;
                u = grid0_matcher0_colAcceptSets[oldT] & ~grid0_matcher0_colAcceptSets[t];
                while(u !== 0) {
                    const i = int_ctz(u);
                    switch(i) {
                        case 0:
                        case 1: {
                            grid0_sampler1.del(at << 2 ^ i);
                            break;
                        }
                        case 2:
                        case 3: {
                            grid0_sampler2.del(at << 2 ^ i - 2);
                            break;
                        }
                        case 4:
                        case 5: {
                            grid0_sampler3.del(at << 2 ^ i - 4);
                            break;
                        }
                        case 6: {
                            grid0_sampler5.del(at << 1);
                            break;
                        }
                        case 7: {
                            grid0_sampler6.del(at << 1);
                            break;
                        }
                        case 8:
                        case 9:
                        case 10:
                        case 11:
                        case 12: {
                            grid0_sampler7.del(5 * at + i - 8);
                            break;
                        }
                    }
                    u &= u - 1;
                }
                u = grid0_matcher0_colAcceptSets[t] & ~grid0_matcher0_colAcceptSets[oldT];
                while(u !== 0) {
                    const i = int_ctz(u);
                    switch(i) {
                        case 0:
                        case 1: {
                            grid0_sampler1.add(at << 2 ^ i);
                            break;
                        }
                        case 2:
                        case 3: {
                            grid0_sampler2.add(at << 2 ^ i - 2);
                            break;
                        }
                        case 4:
                        case 5: {
                            grid0_sampler3.add(at << 2 ^ i - 4);
                            break;
                        }
                        case 6: {
                            grid0_sampler5.add(at << 1);
                            break;
                        }
                        case 7: {
                            grid0_sampler6.add(at << 1);
                            break;
                        }
                        case 8:
                        case 9:
                        case 10:
                        case 11:
                        case 12: {
                            grid0_sampler7.add(5 * at + i - 8);
                            break;
                        }
                    }
                    u &= u - 1;
                }
            }
        }
    }
    grid0_matcher0_update(0, 0, width, height);
    
    const _LAKE_SIZE = int_floordiv(Math.imul(width, height), 4);
    let limit0 = 4,
        limit1 = (_LAKE_SIZE - 4) | 0,
        limit2 = 32,
        limit3 = int_floordiv(_LAKE_SIZE, 2);
    let state = 0;
    while(state >= 0) switch(state) {
        case 0: {
            // stmt.use at line 3, col 0
            yield new MJr.RewriteInfo(grid0_obj, 0, 0, width, height);
            state = limit0 > 0 ? 1 : limit1 > 0 ? 2 : limit2 > 0 ? 3 : 4;
            break;
        }
        case 1: {
            // stmt.rules.basic.one at line 12, col 0
            if(grid0_sampler0.count > 0) {
                const m = grid0_sampler0.arr[rng.nextInt(grid0_sampler0.count)];
                const at = m,
                    atX = at % width,
                    atY = (at / width) | 0;
                grid0_data[at] = 4;
                grid0_matcher0_update(atX, atY, 1, 1);
                yield new MJr.RewriteInfo(grid0_obj, atX, atY, 1, 1);
                --limit0;
                if(limit0 <= 0) {
                    state = limit1 > 0 ? 2 : limit2 > 0 ? 3 : 4;
                }
            } else {
                state = limit1 > 0 ? 2 : limit2 > 0 ? 3 : 4;
            }
            break;
        }
        case 2: {
            // stmt.rules.basic.one at line 15, col 0
            if(grid0_sampler1.count > 0) {
                const m = grid0_sampler1.arr[rng.nextInt(grid0_sampler1.count)];
                const at = m >> 2,
                    atX = at % width,
                    atY = (at / width) | 0;
                switch(m & 3) {
                    case 0: {
                        grid0_data[at + width] = 4;
                        grid0_matcher0_update(atX, atY + 1, 1, 1);
                        yield new MJr.RewriteInfo(grid0_obj, atX, atY + 1, 1, 1);
                        break;
                    }
                    case 1:
                    case 3: {
                        grid0_data[at] = 4;
                        grid0_matcher0_update(atX, atY, 1, 1);
                        yield new MJr.RewriteInfo(grid0_obj, atX, atY, 1, 1);
                        break;
                    }
                    case 2: {
                        grid0_data[at + 1] = 4;
                        grid0_matcher0_update(atX + 1, atY, 1, 1);
                        yield new MJr.RewriteInfo(grid0_obj, atX + 1, atY, 1, 1);
                        break;
                    }
                }
                --limit1;
                if(limit1 <= 0) {
                    state = limit2 > 0 ? 3 : 4;
                }
            } else {
                state = limit2 > 0 ? 3 : 4;
            }
            break;
        }
        case 3: {
            // stmt.rules.basic.one at line 19, col 0
            if(grid0_sampler0.count > 0) {
                const m = grid0_sampler0.arr[rng.nextInt(grid0_sampler0.count)];
                const at = m,
                    atX = at % width,
                    atY = (at / width) | 0;
                grid0_data[at] = 2;
                grid0_matcher0_update(atX, atY, 1, 1);
                yield new MJr.RewriteInfo(grid0_obj, atX, atY, 1, 1);
                --limit2;
                if(limit2 <= 0) {
                    state = 4;
                }
            } else {
                state = 4;
            }
            break;
        }
        case 4: {
            // stmt.rules.basic.one at line 22, col 4
            if(grid0_sampler2.count > 0) {
                const m = grid0_sampler2.arr[rng.nextInt(grid0_sampler2.count)];
                const at = m >> 2,
                    atX = at % width,
                    atY = (at / width) | 0;
                switch(m & 3) {
                    case 0: {
                        grid0_data[at] = 2;
                        grid0_data[at + width] = 1;
                        grid0_data[at + (width << 1)] = 1;
                        grid0_matcher0_update(atX, atY, 1, 3);
                        yield new MJr.RewriteInfo(grid0_obj, atX, atY, 1, 3);
                        break;
                    }
                    case 1: {
                        grid0_data[at] = 1;
                        grid0_data[at + width] = 1;
                        grid0_data[at + (width << 1)] = 2;
                        grid0_matcher0_update(atX, atY, 1, 3);
                        yield new MJr.RewriteInfo(grid0_obj, atX, atY, 1, 3);
                        break;
                    }
                    case 2: {
                        grid0_data[at] = 2;
                        grid0_data[at + 1] = 1;
                        grid0_data[at + 2] = 1;
                        grid0_matcher0_update(atX, atY, 3, 1);
                        yield new MJr.RewriteInfo(grid0_obj, atX, atY, 3, 1);
                        break;
                    }
                    case 3: {
                        grid0_data[at] = 1;
                        grid0_data[at + 1] = 1;
                        grid0_data[at + 2] = 2;
                        grid0_matcher0_update(atX, atY, 3, 1);
                        yield new MJr.RewriteInfo(grid0_obj, atX, atY, 3, 1);
                        break;
                    }
                }
            } else {
                state = 5;
            }
            break;
        }
        case 5: {
            // stmt.rules.basic.one at line 23, col 4
            if(grid0_sampler3.count > 0) {
                const m = grid0_sampler3.arr[rng.nextInt(grid0_sampler3.count)];
                const at = m >> 2,
                    atX = at % width,
                    atY = (at / width) | 0;
                switch(m & 3) {
                    case 0: {
                        grid0_data[at] = 2;
                        grid0_data[at + width] = 3;
                        grid0_data[at + (width << 1)] = 3;
                        grid0_matcher0_update(atX, atY, 1, 3);
                        yield new MJr.RewriteInfo(grid0_obj, atX, atY, 1, 3);
                        break;
                    }
                    case 1: {
                        grid0_data[at] = 3;
                        grid0_data[at + width] = 3;
                        grid0_data[at + (width << 1)] = 2;
                        grid0_matcher0_update(atX, atY, 1, 3);
                        yield new MJr.RewriteInfo(grid0_obj, atX, atY, 1, 3);
                        break;
                    }
                    case 2: {
                        grid0_data[at] = 2;
                        grid0_data[at + 1] = 3;
                        grid0_data[at + 2] = 3;
                        grid0_matcher0_update(atX, atY, 3, 1);
                        yield new MJr.RewriteInfo(grid0_obj, atX, atY, 3, 1);
                        break;
                    }
                    case 3: {
                        grid0_data[at] = 3;
                        grid0_data[at + 1] = 3;
                        grid0_data[at + 2] = 2;
                        grid0_matcher0_update(atX, atY, 3, 1);
                        yield new MJr.RewriteInfo(grid0_obj, atX, atY, 3, 1);
                        break;
                    }
                }
                state = 4;
            } else {
                state = 6;
            }
            break;
        }
        case 6: {
            // stmt.rules.basic.one at line 25, col 0
            if(grid0_sampler4.count > 0) {
                const m = grid0_sampler4.arr[rng.nextInt(grid0_sampler4.count)];
                const at = m,
                    atX = at % width,
                    atY = (at / width) | 0;
                grid0_data[at] = 3;
                grid0_matcher0_update(atX, atY, 1, 1);
                yield new MJr.RewriteInfo(grid0_obj, atX, atY, 1, 1);
            } else {
                state = 7;
            }
            break;
        }
        case 7: {
            // stmt.rules.basic.one at line 28, col 0
            if(grid0_sampler5.count > 0) {
                const m = grid0_sampler5.arr[rng.nextInt(grid0_sampler5.count)];
                const at = m >> 1,
                    atX = at % width,
                    atY = (at / width) | 0;
                if((m & 1) === 0) {
                    grid0_data[at + (width << 1)] = 0;
                    grid0_matcher0_update(atX, atY + 2, 1, 1);
                    yield new MJr.RewriteInfo(grid0_obj, atX, atY + 2, 1, 1);
                } else {
                    grid0_data[at + 2] = 0;
                    grid0_matcher0_update(atX + 2, atY, 1, 1);
                    yield new MJr.RewriteInfo(grid0_obj, atX + 2, atY, 1, 1);
                }
            } else {
                state = limit3 > 0 ? 8 : 9;
            }
            break;
        }
        case 8: {
            // stmt.rules.basic.one at line 32, col 0
            if(grid0_sampler6.count > 0) {
                const m = grid0_sampler6.arr[rng.nextInt(grid0_sampler6.count)];
                const at = m >> 1,
                    atX = at % width,
                    atY = (at / width) | 0;
                if((m & 1) === 0) {
                    grid0_data[at] = 0;
                    grid0_data[at + width] = 0;
                    grid0_matcher0_update(atX, atY, 1, 2);
                    yield new MJr.RewriteInfo(grid0_obj, atX, atY, 1, 2);
                } else {
                    grid0_data[at] = 0;
                    grid0_data[at + 1] = 0;
                    grid0_matcher0_update(atX, atY, 2, 1);
                    yield new MJr.RewriteInfo(grid0_obj, atX, atY, 2, 1);
                }
                --limit3;
                if(limit3 <= 0) {
                    state = 9;
                }
            } else {
                state = 9;
            }
            break;
        }
        case 9: {
            // stmt.rules.basic.one at line 36, col 4
            if(grid0_sampler7.count > 0) {
                const m = grid0_sampler7.arr[rng.nextInt(grid0_sampler7.count)];
                const at = (m / 5) | 0,
                    atX = at % width,
                    atY = (at / width) | 0;
                grid0_data[at + 1 + width] = 4;
                grid0_matcher0_update(atX + 1, atY + 1, 1, 1);
                yield new MJr.RewriteInfo(grid0_obj, atX + 1, atY + 1, 1, 1);
            } else {
                state = 10;
            }
            break;
        }
        case 10: {
            // stmt.rules.basic.one at line 41, col 4
            if(grid0_sampler8.count > 0) {
                const m = grid0_sampler8.arr[rng.nextInt(grid0_sampler8.count)];
                const at = m,
                    atX = at % width,
                    atY = (at / width) | 0;
                grid0_data[at] = 0;
                grid0_matcher0_update(atX, atY, 1, 1);
                yield new MJr.RewriteInfo(grid0_obj, atX, atY, 1, 1);
                state = 9;
            } else {
                state = -1;
            }
            break;
        }
    }
    return grid0_obj;
}