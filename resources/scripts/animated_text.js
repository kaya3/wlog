const AnimatedText = (function() {
    const SPEED = 0.25,
        FONT_WEIGHT = 'normal',
        FONT_SIZE = '16px',
        FONT_FAMILY = 'Roboto',
        FONT = `${FONT_WEIGHT} ${FONT_SIZE} ${FONT_FAMILY}`;
    
    class TextWidget {
        constructor(text, width, preWrapped) {
            this.text = preWrapped ? wrapText(text, width) : text;
            this.width = width;
            this.preWrapped = preWrapped;
            this.isPlaying = false;
            this.frame = 0;
            this.lastDrawnFrame = 0;
        }
        
        play() {
            this.isPlaying = true;
            this.frame = 0;
        }
        
        seek(frame) {
            this.isPlaying = false;
            this.frame = frame;
        }
        
        tick(scroller) {
            if(this.isPlaying) {
                this.frame += SPEED;
                if(scroller !== undefined) {
                    scroller.value = Math.floor(this.frame);
                }
            }
        }
        
        draw(span) {
            const frame = Math.floor(this.frame);
            if(this.lastDrawnFrame !== frame) {
                const partialText = this.text.substring(0, frame);
                span.innerText = this.preWrapped ? partialText : wrapText(partialText, this.width);
                this.lastDrawnFrame = frame;
            }
        }
    }
    
    function wrapText(text, width) {
        const out = [];
        let line = '';
        for(const word of text.split(/\s+/)) {
            if(line === '') {
                line = word;
            } else {
                const longerLine = line + ' ' + word;
                if(measureText(longerLine) > width) {
                    out.push(line);
                    line = word;
                } else {
                    line = longerLine;
                }
            }
        }
        
        if(line !== '') {
            out.push(line);
        }
        return out.join('\n');
    }
    
    let measureTextCtx = undefined;
    function measureText(text) {
        measureTextCtx ??= new OffscreenCanvas(1, 1).getContext('2d');
        measureTextCtx.font = FONT;
        return measureTextCtx.measureText(text).width;
    }
    
    function init(widgetID, text, width, preWrapped) {
        const span = document.getElementById(widgetID + '_text'),
            button = document.getElementById(widgetID + '_button'),
            scroller = document.getElementById(widgetID + '_scroller'),
            widget = new TextWidget(text, width, preWrapped);
        
        span.style.fontWeight = FONT_WEIGHT;
        span.style.fontSize = FONT_SIZE;
        span.style.fontFamily = FONT_FAMILY;
        
        button.onclick = () => widget.play();
        scroller.oninput = () => widget.seek(scroller.value);
        scroller.max = widget.text.length;
        
        const f = () => {
            widget.tick(scroller);
            widget.draw(span);
            window.requestAnimationFrame(f);
        };
        window.requestAnimationFrame(f);
    }
    
    return {
        init,
    };
})();
