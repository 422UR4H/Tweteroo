export default function notString(v) {
    // typeof avatar !== "string"
    return typeof v !== "string" || !v;
}