// src/types/iugu.d.ts

declare module 'iugu' {
  export interface Iugu {
    setup: () => void;
    createPaymentToken: (form: HTMLFormElement | IuguCreditCard | IuguCardData, onSuccess?: Function) => void;
    setAccountID: (accountId: string) => void;
    setTestMode: (testMode: boolean) => void;
    getSessionId: () => string | null;
    CreditCard: (number: string, month: string, year: string, firstName: string, lastName: string, verificationValue: string) => IuguCreditCard;
    utils: {
      validateAccountID: (accountId: string) => string | undefined;
      formatUUID: (uuid: string) => string;
      validateCreditCardNumber: (cardNumber: string) => boolean;
      validateCVV: (cvv: string, cardType: string) => boolean;
      validateExpiration: (month: number, year: number) => boolean;
      validateExpirationString: (expiration: string) => boolean;
      validateFirstName: (firstName: string) => boolean;
      validateLastName: (lastName: string) => boolean;
      getMonthYearByFullExpiration: (expiration: string) => [string, string] | false;
      getFirstLastNameByFullName: (fullName: string) => [string, string] | false;
      getBrandByCreditCardNumber: (cardNumber: string) => string | false;
      keyOf: (obj: any, value: any) => string | null;
      isBlockedByAdBlock: () => boolean;
    };
    readwrite: {
      db: (key: string, value: string) => void;
      local: (key: string, value: string) => void;
      session: (key: string, value: string) => void;
      global: (key: string, value: string) => void;
      cookie: (key: string, value?: string) => string | void;
      generate: () => string;
    };
    cards: {
      [key: string]: {
        cvv_pattern: RegExp;
        brand: RegExp;
      };
    };
  }

  export interface IuguCreditCard {
    errors: () => { [key: string]: string };
    valid: () => boolean;
    brand: () => string;
    toData: () => IuguCardData;
  }

  export interface IuguCardData {
    number: string;
    verification_value: string;
    first_name: string;
    last_name: string;
    month: string;
    year: string;
    brand?: string;
    fingerprint?: string;
    version?: string;
    test?: number;
  }

  export const Iugu: Iugu;
}

declare global {
  interface Window {
    Iugu: Iugu;
  }
}

export {}
