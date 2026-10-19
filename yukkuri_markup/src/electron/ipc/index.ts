import { FileService } from "../services/fileService";
import { registerFileHandlers } from "./fileHandlers";

export function registerAllHandlers() {
    registerFileHandlers(new FileService());
}