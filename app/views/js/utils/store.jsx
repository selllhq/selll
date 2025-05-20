export const CURRENCY_SYMBOLS = {
    USD: "$",
    GHS: "GH₵",
    NGN: "₦",
    EUR: "€",
    GBP: "£",
    KES: "KSh",
    ZAR: "R",
    CAD: "C$",
};

export const CURRENCY_FORMATS = {
    USD: {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    },
    GHS: {
        style: "currency",
        currency: "GHS",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    },
    NGN: {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    },
    EUR: {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    },
};

export const CURRENCY_LIMITS = {
    NGN: { min: 50, max: 10000000 },
    KES: { min: 1, max: 150000 }, // For M-Pesa customer wallets
    GHS: { min: 1, max: 100000 },
    USD: { min: 0.5, max: 999999.99 }, // Stripe default
    EUR: { min: 0.5, max: 999999.99 }, // Stripe default
    GBP: { min: 0.5, max: 999999.99 }, // Stripe default
    ZAR: { min: 0.5, max: 999999.99 }, // Stripe default
    CAD: { min: 0.5, max: 999999.99 }, // Stripe default
};

export const formatCurrency = (amount, currency, options = {}) => {
    return new Intl.NumberFormat("en-US", {
        ...(CURRENCY_FORMATS[currency]),
        ...options,
    }).format(amount);
};

export const parseProductImages = (imageData) => {
    let parsedImages = [];

    try {
        if (typeof imageData === "string") {
            parsedImages = JSON.parse(imageData);
        } else if (Array.isArray(imageData)) {
            parsedImages = imageData;
        }
    } catch (e) {
        console.error("Error parsing product images:", e);
    }

    return parsedImages;
};
