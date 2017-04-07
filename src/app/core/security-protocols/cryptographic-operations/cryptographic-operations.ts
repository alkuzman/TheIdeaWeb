import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {SimpleCryptographicOperations} from "./simple-cryptographic-operations";

/**
 * Created by Viki on 2/7/2017.
 */

@Injectable()
export class CryptographicOperations {

    constructor(private operations: SimpleCryptographicOperations) {
    }

    public encrypt(algorithm: Algorithm, key: CryptoKey, data: string): Observable<string> {
        return Observable.create((observer) => {
            this.operations.encrypt(algorithm, key, this.operations.convertStringToBuffer(data))
                .then((resultBuf: ArrayBuffer) => {
                    let result: string = this.operations.convertUint8ToString(new Uint8Array(resultBuf));
                    observer.next(result);
                });
        });
    }

    public decrypt(algorithm: Algorithm, key: CryptoKey, data: string): Observable<string> {
        return Observable.create((observer) => {
            this.operations.decrypt(algorithm, key, this.operations.convertStringToUint8(data).buffer)
                .then((resultBuf: ArrayBuffer) => {
                    let result: string = this.operations.convertBufferToString(Buffer.from(resultBuf));
                    observer.next(result);
                });
        });
    }

    public sign(algorithm: string, key: CryptoKey, data: string): Observable<string> {
        return Observable.create((observer) => {
            this.operations.sign(algorithm, key, this.operations.convertStringToBuffer(data))
                .then((resultBuf: ArrayBuffer) => {
                    let result: string = this.operations.convertUint8ToString(new Uint8Array(resultBuf));
                    observer.next(result);
                })
        })
    }

    public verify(algorithm: string, key: CryptoKey, signature: string, data: string): PromiseLike<boolean> {
        return this.operations.verify(algorithm, key, this.operations.convertStringToUint8(signature).buffer,
            this.operations.convertStringToBuffer(data));
    }
}
