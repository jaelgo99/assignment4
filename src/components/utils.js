const MIN_Radius = 7.5;
const MAX_Radius = 15;
const DEPTH = 2;
const LEFT_COLOR = "DB9E00";
const RIGHT_COLOR = "00BFDB";
const NUM_POINTS = 2500;

/**
 * --- Credit ---
 * https://stackoverflow.com/questions/16360533/calculate-color-hex-having-2-colors-and-percent-position
 * 
 * https://www.youtube.com/watch?v=r9IU5eJhhGo&ab_channel=TomIsLoading
 */
const getGradientStop = (ratio) => {
    // For outer ring numbers potentially past max radius,
    // just clamp to 0
    ratio = ratio > 1 ? 1 : ratio < 0 ? 0 : ratio;

    const c0 = LEFT_COLOR.match(/.{1,2}/g).map(
    (oct) => parseInt(oct, 16) * (1 - ratio)
    );
    const c1 = RIGHT_COLOR.match(/.{1,2}/g).map(
    (oct) => parseInt(oct, 16) * ratio
    );
    const ci = [0, 1, 2].map((i) => Math.min(Math.round(c0[i] + c1[i]), 255));
    const color = ci
    .reduce((a, v) => (a << 8) + v, 0)
    .toString(16)
    .padStart(6, "0");

    return `#${color}`;
};

const calculateColor = (x) => {
    const maxDiff = MAX_Radius * 2;
    const distance = x + MAX_Radius;

    const ratio = distance / maxDiff;
    const stop = getGradientStop(ratio);
    return stop;
}

const randomFromInterval = (min, max) => {
    return Math.random() * (max - min) + min;
};

export const pointsInner = Array.from(
    { length: NUM_POINTS }, 
    (v, k) => k + 1
).map((num) => {
    const randomRadius = randomFromInterval(MIN_Radius, MAX_Radius);
    const randomAngle = Math.random() * 2 * Math.PI;

    const x = Math.cos(randomAngle) * randomRadius;
    const y = Math.sin(randomAngle) * randomRadius;
    const z = randomFromInterval(-DEPTH, DEPTH);
    const color = calculateColor(x);

    return {
        idx: num,
        position: [x, y, z],
        color,
    };
});

export const pointsOuter = Array.from(
    { length: NUM_POINTS / 4}, 
    (v, k) => k + 1
).map((num) => {
    const randomRadius = randomFromInterval(MIN_Radius / 2, MAX_Radius * 2);
    const randomAngle = Math.random() * 2 * Math.PI;

    const x = Math.cos(randomAngle) * randomRadius;
    const y = Math.sin(randomAngle) * randomRadius;
    const z = randomFromInterval(-DEPTH * 10, DEPTH * 10);
    const color = calculateColor(x);

    return {
        idx: num,
        position: [x, y, z],
        color,
    };
});