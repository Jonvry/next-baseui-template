import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { CurrencyCode, LocaleCode } from "@/definitions";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Format a number into a currency string
 * @param value - The number to format
 * @param currency - The ISO currency code (default: "PHP")
 * @param locale - The locale (default: "en-PH")
 * @param withCents - Whether to show cents/decimals (default: true)
 * @returns formatted price string
 */
export function formatPrice(
    value: string | number,
    currency: CurrencyCode = "PHP",
    locale: LocaleCode = "en-PH",
    withCents: boolean = true
): string {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        minimumFractionDigits: withCents ? 2 : 0,
        maximumFractionDigits: withCents ? 2 : 0,
    }).format(Number(value));
}
