'use strict';
function* mjr_basic_maze(width, height, rng) {
    // compiled by mjrc-0.1 (unstable) on 2022-12-10, 21:13:11 GMT
    if(width <= 0 || height <= 0) {
        throw new Error("Grid dimensions must be positive");
    } else if(width > 16383 || height > 16383) {
        throw new Error("Grid dimensions cannot exceed 16383");
    }
    width = width | 0;
    height = height | 0;
    
    if(typeof MJr !== "object" || typeof MJr.VERSION !== "number") throw new Error("MJr runtime library not found");
    if(MJr.VERSION !== 0) throw new Error("Requires MJr runtime library version 0");
    rng ??= MJr.DEFAULT_PRNG;
    const int_ctz = MJr.OPS.int_ctz;
    
    const grid0_n = width * height,
        grid0_data = new Uint8Array(grid0_n),
        grid0_obj = new MJr.Grid(width, height, grid0_data, "BAW"),
        grid0_origin = (width >> 1) + (height >> 1) * width;
    const grid0_sampler0 = new MJr.Sampler(grid0_n << 2);
    
    const grid0_matcher0_rowDFA = MJr.HEX.u4("301401506501201506401"),
        grid0_matcher0_rowAcceptSetIDs = MJr.HEX.u4("0010002"),
        grid0_matcher0_rowsToCols = MJr.HEX.u4("0122221"),
        grid0_matcher0_colDFA = MJr.HEX.u4("062031061065031064065"),
        grid0_matcher0_colAcceptSetIDs = MJr.HEX.u4("0001200"),
        grid0_matcher0_colAcceptSets = MJr.HEX.u4("021"),
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
                s = grid0_matcher0_rowDFA[3 * s + grid0_data[at]];
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
                u = oldT & ~t;
                if((u & 1) !== 0) {
                    grid0_sampler0.del(at << 2 ^ 2);
                }
                if((u & 2) !== 0) {
                    grid0_sampler0.del(at << 2 ^ 3);
                }
                u = t & ~oldT;
                if((u & 1) !== 0) {
                    grid0_sampler0.add(at << 2 ^ 2);
                }
                if((u & 2) !== 0) {
                    grid0_sampler0.add(at << 2 ^ 3);
                }
            }
        }
        
        // recompute col states
        for(let atX = startX; atX < endX; ++atX) {
            let s = endY < height ? grid0_matcher0_colStates[atX + endY * width] : 0;
            for(let atY = endY - 1; atY >= 0; --atY) {
                const at = atX + atY * width;
                const oldS = grid0_matcher0_colStates[at];
                s = grid0_matcher0_colDFA[3 * s + grid0_matcher0_rowsToCols[grid0_matcher0_rowStates[at]]];
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
                if((u & 1) !== 0) {
                    grid0_sampler0.del(at << 2);
                }
                if((u & 2) !== 0) {
                    grid0_sampler0.del(at << 2 ^ 1);
                }
                u = grid0_matcher0_colAcceptSets[t] & ~grid0_matcher0_colAcceptSets[oldT];
                if((u & 1) !== 0) {
                    grid0_sampler0.add(at << 2);
                }
                if((u & 2) !== 0) {
                    grid0_sampler0.add(at << 2 ^ 1);
                }
            }
        }
    }
    grid0_matcher0_update(0, 0, width, height);
    
    let state = 0;
    while(state >= 0) switch(state) {
        case 0: {
            // stmt.use at line 4, col 0
            yield new MJr.RewriteInfo(grid0_obj, 0, 0, width, height);
            state = 1;
            break;
        }
        case 1: {
            // stmt.put at line 5, col 0
            const at = grid0_origin,
                atX = at % width,
                atY = (at / width) | 0;
            if(grid0_data[at] !== 2) {
                grid0_data[at] = 2;
                grid0_matcher0_update(atX, atY, 1, 1);
                yield new MJr.RewriteInfo(grid0_obj, atX, atY, 1, 1);
            }
            state = 2;
            break;
        }
        case 2: {
            // stmt.rules.basic.one at line 6, col 0
            if(grid0_sampler0.count > 0) {
                const m = grid0_sampler0.arr[rng.nextInt(grid0_sampler0.count)];
                const at = m >> 2,
                    atX = at % width,
                    atY = (at / width) | 0;
                switch(m & 3) {
                    case 0: {
                        grid0_data[at] = 2;
                        grid0_data[at + width] = 1;
                        grid0_matcher0_update(atX, atY, 1, 2);
                        yield new MJr.RewriteInfo(grid0_obj, atX, atY, 1, 2);
                        break;
                    }
                    case 1: {
                        grid0_data[at + width] = 1;
                        grid0_data[at + (width << 1)] = 2;
                        grid0_matcher0_update(atX, atY + 1, 1, 2);
                        yield new MJr.RewriteInfo(grid0_obj, atX, atY + 1, 1, 2);
                        break;
                    }
                    case 2: {
                        grid0_data[at] = 2;
                        grid0_data[at + 1] = 1;
                        grid0_matcher0_update(atX, atY, 2, 1);
                        yield new MJr.RewriteInfo(grid0_obj, atX, atY, 2, 1);
                        break;
                    }
                    case 3: {
                        grid0_data[at + 1] = 1;
                        grid0_data[at + 2] = 2;
                        grid0_matcher0_update(atX + 1, atY, 2, 1);
                        yield new MJr.RewriteInfo(grid0_obj, atX + 1, atY, 2, 1);
                        break;
                    }
                }
            } else {
                state = -1;
            }
            break;
        }
    }
    return grid0_obj;
}