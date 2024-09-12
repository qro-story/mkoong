export interface TokenPayload {
  id: number;
  // username: string; 추후에 추가될 예정
  email?: string;
  passportAuthId?: number;
  phoneNumber?: string;
}

export interface PhoneTokenPayload {
  passportAuthId: number;
  phoneNumber: string;
}
