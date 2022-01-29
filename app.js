//traditonal functions 
//Makes and returns an object everytime it is called
// function makeColor(r, g, b) {
//     const color = {};
//     color.r = r;
//     color.g = g;
//     color.b = b;
//     color.rgb = function () {
//         const { r, g, b } = this;
//         return `rgb${r},#{g},${b}`;
//     };

//     color.hex = function () {
//         color.hex = function () {
//             const { r, g, b } = this;
//             return (
//                 '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
//             );
//         };
//         return color;
//     }
// }

// const firstCOlor = makeColor(35, 255, 150);
// firstCOlor.hext();//first color.hext();
// firstCOlor.rgb();//"rgb(35,255,150)"

// const black = makeColor(0, 0, 0);
// black.rgb();
// black.hex();

//Constructor Functions and prototypes
// function Color(r, g, b) {
//     this.r = r;
//     this.g = g;
//     this.b = b;
// };

// Color.prototype.rgb = function () {
//     const { r, g, b } = this;
//     return `rgb(${r},${g},${b})`;
// };

// Color.prototype.hex = function () {
//     const { r, g, b } = this;
//     return ('#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1));
// };

// Color.prototype.rgba = function (a = 1.0) {
//     const { r, g, b,} = this;
//     return `rgb(${r},${g},${b},${a})`;
// }

// const color1 = new Color(255, 255, 60);

//using classes to create constructors and methods
class Color {
    constructor(r, g, b, name = "color") {
        this.r = r;
        this.b = b;
        this.g = g;
        this.name = name;
        this.calcHSL();
    }
    innerRGB() {
        const { r, g, b } = this;
        return `${r},${g},${b}`;
    }
    rgb() {
        this.innerRGB();
        return `rgb(${this.innerRGB()})`;
    }
    hex() {
        const { r, g, b } = this;
        return ('#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1));
    }
    rgba(a = 1.0) {
        const { r, g, b } = this;
        return `rgba(${this.innerRGB()},${a})`;
    }
    hsl() {
        const { h, s, l } = this;
        return `hsl(${h},${s}%,${l}%)`;
    }
    fullSaturation(){
        const {h, l} = this;
        return `hsl(${h},100%,${l}%)`;

    }
    opposite(){
        const { h, s, l } = this;
        const newHue = (h + 180) % 360;
        return `hsl(${newHue},${s}%,${l}%)`;
    }
    calcHSL() {
        let { r, g, b } = this;
        // Make r, g, and b fractions of 1
        r /= 255;
        g /= 255;
        b /= 255;

        // Find greatest and smallest channel values
        let cmin = Math.min(r, g, b),
            cmax = Math.max(r, g, b),
            delta = cmax - cmin,
            h = 0,
            s = 0,
            l = 0;
        if (delta == 0) h = 0;
        else if (cmax == r)
            // Red is max
            h = ((g - b) / delta) % 6;
        else if (cmax == g)
            // Green is max
            h = (b - r) / delta + 2;
        else
            // Blue is max
            h = (r - g) / delta + 4;

        h = Math.round(h * 60);

        // Make negative hues positive behind 360°
        if (h < 0) h += 360;
        // Calculate lightness
        l = (cmax + cmin) / 2;

        // Calculate saturation
        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

        // Multiply l and s by 100
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);
        this.h = h;
        this.s = s;
        this.l = l;
    }

}

const red = new Color(255, 67, 89, "tomato");
const white = new Color(255, 255, 255, "white");
const orange = new Color(230, 126, 34, "carrot")