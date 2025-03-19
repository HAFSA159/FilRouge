import { SmartBand } from './smart-band.model';

export interface BandScan {
  id: number;
  scanTime: string;
  matchId: number;
  matchName?: string;
  homeTeam?: string;
  awayTeam?: string;
  venue?: string;
  groupName?: string;

   smartBand?: SmartBand;

   serialNumber: string;
  userId: number;
  userName: string;
}
