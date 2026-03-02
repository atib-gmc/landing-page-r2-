// lib/logger.ts

type LogLevel = "info" | "warn" | "error";

function getTime(): string {
    return new Date().toTimeString().slice(0, 8);
}

function getLine(): string {
    if (process.env.NODE_ENV === "production") return "";

    const err = new Error();
    const stack = err.stack?.split("\n");

    if (!stack) return "";

    const callerLine = stack[3] || stack[2];
    const match = callerLine?.match(/:(\d+):\d+\)?$/);

    return match ? `line:${match[1]}` : "";
}

export function log(level: LogLevel, ...args: unknown[]) {
    const time = getTime();
    const line = getLine();

    const prefix = `[${time}]${line ? `[${line}]` : ""}`;

    switch (level) {
        case "info":
            console.log(prefix, ...args);
            break;
        case "warn":
            console.warn(prefix, ...args);
            break;
        case "error":
            console.error(prefix, ...args);
            break;
    }
}