import { promises as fs } from "fs";
import path from "path";

export type FileException = "ENOENT" | "EXISTS" | "INTERNAL";

export const FILE_ERROR_MESSAGES: Record<FileException, string> = {
    ENOENT: "指定されたファイルが存在しません。",
    EXISTS: "指定されたファイルが重複しています。",
    INTERNAL: "予期せぬエラーが発生しました。"
};

type Result<T, E = FileException> =
    | { ok: true; data: T }
    | { ok: false; code: E };

export class FileService {
    async readFile(path: string): Promise<Result<string>> {
        try {
            const data = await fs.readFile(path, "utf-8");
            return { ok: true, data };
        } catch(err) {
            const error = err as NodeJS.ErrnoException;

            if (error.code === "ENOENT") {
                return { ok: false, code: "ENOENT" };
            } else if (error.code === "EEXIST") {
                return { ok: false, code: "EXISTS" };
            } else {
                return { ok: false, code: "INTERNAL" };
            }
        }
    }

    async writeFile(path: string, data: string): Promise<Result<void>> {
        try {
            this.ensureParentDir(path);

            await fs.writeFile(path, data, "utf-8");
            return { ok: true, data: undefined };
        } catch (err) {
            const error = err as NodeJS.ErrnoException;
            if (error.code === "EEXIST") {
                return { ok: false, code: "EXISTS" };
            } else if (error.code === "ENOENT") {
                return { ok: false, code: "ENOENT" };
            }
            return { ok: false, code: "INTERNAL" };
        }
    }

    private async ensureParentDir(targetPath: string): Promise<void> {
        const dir = path.dirname(targetPath);
        await fs.mkdir(dir, { recursive: true });
    }
}