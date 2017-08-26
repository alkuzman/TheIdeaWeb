import {Injectable} from "@angular/core";
import {getCrypto} from "pkijs/src/common";
import * as CryptoJS from "crypto-js";
/**
 * Created by Viki on 4/7/2017.
 */

var n = require('nonce');

@Injectable()
export class SimpleCryptographicOperations {

    private crypto: SubtleCrypto;
    private nonce;

    constructor() {
        this.crypto = getCrypto();
        this.nonce = n();
    }

    public encrypt(algorithm: Algorithm, key: CryptoKey, data: BufferSource): PromiseLike<ArrayBuffer> {
        return this.crypto.encrypt(algorithm, key, data);
    }

    public decrypt(algorithm: Algorithm, key: CryptoKey, data: BufferSource): PromiseLike<ArrayBuffer> {
        return this.crypto.decrypt(algorithm, key, data);
    }

    public sign(algorithm: string, key: CryptoKey, data: BufferSource): PromiseLike<ArrayBuffer> {
        return this.crypto.sign(algorithm, key, data);
    }

    public verify(algorithm: string, key: CryptoKey, signature: BufferSource, data: BufferSource): PromiseLike<boolean> {
        return this.crypto.verify(algorithm, key, signature, data);
    }

    public convertUint8ToString(array: Uint8Array): string {
        return btoa(String.fromCharCode.apply(null, array));
    }

    public convertStringToUint8(text: string): Uint8Array {
        return new Uint8Array(atob(text).split("").map((character) => character.charCodeAt(0)));
    }

    public convertStringToBuffer(text: string): Buffer {
        return Buffer.from(text);
    }

    public convertBufferToString(buffer: Buffer): string {
        return buffer.toString();
    }

    public hash(value: string): string {
        return CryptoJS.SHA256(value).toString();
    }

    public generateNonce(): string {
        return this.nonce();
    }
}