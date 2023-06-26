export default function notString(v) {
    return typeof v !== "string" || !v;
}