import path from "path";
import fs from "fs";

const targetDir = path.join(import.meta.dirname, "../public/docs/release-notes");
const outputFile = path.join(import.meta.dirname, "../public/docs/release-notes/release-notes.json");

function getFiles(dirPath) {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    let fileList = [];

    for (const entry of entries) {
        if (entry.isFile() && path.extname(entry.name) === ".md" && !entry.name.startsWith(".")) {
            fileList.push(entry.name);
        }
    }

    return fileList
        .filter((file) => /^v\d+\.\d+\.\d+\.md$/.test(file))
        .sort((a, b) => {
            return b.localeCompare(a, undefined, { numeric: true, sensitivity: "base" });
        })
        .map((fileName) => {
            const version = fileName.replace(".md", "");
            return {
                version,
                fileName,
                path: `/release-notes/${fileName}`
            };
        });
}

try {
    const files = getFiles(targetDir);
    fs.writeFileSync(outputFile, JSON.stringify(files, null, 2), "utf-8");
    console.log(`[Success] Generated ${files.length} files to ${outputFile}`);
} catch (error) {
    console.error("[Error] Failed to generate file list:", error);
}