// Common currency codes (ISO 4217)
export type CurrencyCode =
    | "USD" // US Dollar
    | "EUR" // Euro
    | "GBP" // British Pound
    | "JPY" // Japanese Yen
    | "PHP" // Philippine Peso
    | "CNY" // Chinese Yuan
    | "AUD" // Australian Dollar
    | "CAD" // Canadian Dollar
    | "CHF" // Swiss Franc
    | "SGD" // Singapore Dollar
    | (string & {}); // Allow other strings while keeping autocomplete

// Common locales
export type LocaleCode =
    | "en-US" // English (US)
    | "en-GB" // English (UK)
    | "en-PH" // English (Philippines)
    | "ja-JP" // Japanese
    | "zh-CN" // Chinese (Simplified)
    | "de-DE" // German
    | "fr-FR" // French
    | "es-ES" // Spanish
    | (string & {}); // Allow other strings while keeping autocomplete
