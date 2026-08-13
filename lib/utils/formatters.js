export function formatDate(isoDate) {
    return new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    }).format(new Date(isoDate));
}

export function formatCurrency(value) {
    const absolute = Math.abs(value);
    const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(absolute);

    return `${value >= 0 ? "+" : "-"}${formatted}`;
}

export function getAvatarSrc(avatarPath) {
    if (!avatarPath) return "/images/logo-small.svg";

    if (avatarPath.startsWith("./assets/images/avatars/")) {
        return `/avatars/${avatarPath.split("/").pop()}`;
    }

    return avatarPath;
}
