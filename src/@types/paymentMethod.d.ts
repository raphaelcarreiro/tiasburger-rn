export interface PaymnentMethod {
  id: number;
  method: string;
  kind: string;
  mode: 'online' | 'offline';
  activated: boolean;
}
