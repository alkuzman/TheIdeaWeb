import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {CertificateService} from '../../../domain/services/certificate/certificate.service';
import {ParserPemService} from '../parsers/parser-pem.service';
import Certificate from 'pkijs/src/Certificate';


/**
 * Class containing operations on certificates
 */
@Injectable()
export class CertificateOperationsService {

  constructor(private certificateService: CertificateService,
              private pemParser: ParserPemService) {
  }

  /**
   * Check if the certificate for a given email is expired
   * @param {string} email
   * @returns {Observable<boolean>}
   */
  public checkCertificateExpired(email: string): Observable<boolean> {
    // TODO: Implement certificate expired check
    return Observable.create((observer) => {
      observer.next(false);
    });
  }

  /**
   * Renew expired certificate
   */
  public renewExpiredCertificate() {
    // TODO: Implement renewing certificate
  }

  /**
   * Requests the certificate from the iDeal server and parses it from pem
   * @returns {Observable<Certificate>}
   */
  public getIDealSecureCertificate(): Observable<Certificate> {

    // Create observable for the result
    return Observable.create((observer) => {

      // Request the certificate from the iDeal server
      this.certificateService.getIdealSecureCertificate()
        .subscribe((pemCertificate: string) => {

          // Parse the returned certificate from pem format
          const certificate = this.pemParser.parseCertificateFromPem(pemCertificate);
          observer.next(certificate);
        });
    });
  }
}
