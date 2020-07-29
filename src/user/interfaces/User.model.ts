import { Provider } from 'src/auth/auth.service';

export interface IUser {
  readonly _id?: string;
  readonly thirdPartyId: number;
  readonly provider: Provider;
  readonly givenName: string;
  readonly familyName: string;
  readonly email: string;
  readonly avatar: string;
  readonly date?: number;
  readonly group?: string;
}
