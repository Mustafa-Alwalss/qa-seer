export interface UrlResponse {
    id          : string;
    originalUrl : string;
    shortCode   : string;
    createdAt   : string;
    expiresAt   : string;
    urlStatus   : "ACTIVE" | "EXPIRED";
}