import { type Rectangle, screen } from "electron";
import type { WindowBounds } from "./main";

/**
 * 保存された座標が現在の有効な画面内にあるか判定・補正する関数
 */
export function ensureVisibleBounds(bounds: WindowBounds): { x?: number; y?: number; width: number; height: number } {
    if (bounds.x === undefined || bounds.y === undefined) {
        return bounds;
    }

    const targetBounds: Rectangle = {
        x: bounds.x,
        y: bounds.y,
        width: bounds.width,
        height: bounds.height
    };

    const displays = screen.getAllDisplays();

    const isVisible = displays.some((display) => {
        return isIntersecting(targetBounds, display.bounds);
    });

    if (!isVisible) {
        return {
            width: bounds.width,
            height: bounds.height,
            x: undefined,
            y: undefined
        };
    }

    return bounds;
}

/**
 * 2つの矩形（Rectangle）が交差しているか判定する補助関数
 */
function isIntersecting(r1: Rectangle, r2: Rectangle): boolean {
    return !(
        r2.x >= r1.x + r1.width ||
        r2.x + r2.width <= r1.x ||
        r2.y >= r1.y + r1.height ||
        r2.y + r2.height <= r1.y
    );
}