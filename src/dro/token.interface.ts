export interface TokenData { 
    accessToken: string;
    refreshToken: string;
}

export interface TokenRO {
    data: TokenData
}