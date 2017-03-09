/**
 * Created by Viki on 2/19/2017.
 */


export enum ProtocolTransactionMessageNumber {
  MONE,
  MTWO,
  MTHREE,
  MFOUR,
  MFIVE,
  MSIX,
  MSEVEN,
  MEIGHT
}

export namespace ProtocolTransactionMessageNumber {
  export function next(protocolTransactionMessageNumber: ProtocolTransactionMessageNumber): ProtocolTransactionMessageNumber {
    let num: number = +protocolTransactionMessageNumber;
    switch ((num + 1) % 8) {
      case 0: return ProtocolTransactionMessageNumber.MONE;
      case 1: return ProtocolTransactionMessageNumber.MTWO;
      case 2: return ProtocolTransactionMessageNumber.MTHREE;
      case 3: return ProtocolTransactionMessageNumber.MFOUR;
      case 4: return ProtocolTransactionMessageNumber.MFIVE;
      case 5: return ProtocolTransactionMessageNumber.MSIX;
      case 6: return ProtocolTransactionMessageNumber.MSEVEN;
      case 7: return ProtocolTransactionMessageNumber.MEIGHT;
    }
  }

  export function getNumber(protocolTransactionMessageNumber: ProtocolTransactionMessageNumber): ProtocolTransactionMessageNumber {
    return ProtocolTransactionMessageNumber[protocolTransactionMessageNumber.toString()];
  }
}
