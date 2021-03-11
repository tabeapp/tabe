//useful for new workouts, new exercises, new rep schemes
export const NextObjectKey = obj => {
    let code = Object.keys(obj).sort().reverse()[0] || '@';
    return String.fromCharCode(code.charCodeAt(0)+1);
};
