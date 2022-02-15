import { createUtilityCanvasFromImage, createUtilityCanvasFromImageBitmap, hasImageBitmap } from "../html/canvas";
import { using } from "../using";
import { Fetcher } from "./Fetcher";
export class ImageFetcher extends Fetcher {
    constructor() {
        super();
        this.__getCanvas = hasImageBitmap
            ? this._getCanvasViaImageBitmap
            : this._getCanvasViaImage;
    }
    async postObjectForImageBitmap(path, obj, contentType, headers, onProgress) {
        return await this._postObjectForImageBitmap(path, obj, contentType, headers, onProgress);
    }
    async _postObjectForImage(path, obj, contentType, headers, onProgress) {
        onProgress = this.normalizeOnProgress(headers, onProgress);
        headers = this.normalizeHeaders(headers);
        const file = await this._postObjectForFile(path, obj, contentType, headers, onProgress);
        return await this.readFileImage(file);
    }
    async postObjectForImage(path, obj, contentType, headers, onProgress) {
        return await this._postObjectForImage(path, obj, contentType, headers, onProgress);
    }
    async _getCanvasViaImageBitmap(path, headers, onProgress) {
        onProgress = this.normalizeOnProgress(headers, onProgress);
        headers = this.normalizeHeaders(headers);
        return using(await this._getImageBitmap(path, headers, onProgress), (img) => {
            return createUtilityCanvasFromImageBitmap(img);
        });
    }
    async _getCanvasViaImage(path, headers, onProgress) {
        onProgress = this.normalizeOnProgress(headers, onProgress);
        headers = this.normalizeHeaders(headers);
        const img = await this._getImage(path, headers, onProgress);
        return createUtilityCanvasFromImage(img);
    }
    async _getCanvas(path, headers, onProgress) {
        onProgress = this.normalizeOnProgress(headers, onProgress);
        headers = this.normalizeHeaders(headers);
        return await this.__getCanvas(path, headers, onProgress);
    }
    async getCanvas(path, headers, onProgress) {
        return await this._getCanvas(path, headers, onProgress);
    }
}
//# sourceMappingURL=ImageFetcher.js.map