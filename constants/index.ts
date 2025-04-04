import { ArrowRightLeft, Settings, Layout } from "lucide-react";

export const NavItems = [
	{ label: "Dashboard", icon: Layout, link: "/" },
	{ label: "Transactions", icon: ArrowRightLeft, link: "/transactions" },
	{ label: "Manage", icon: Settings, link: "/manage" },
];

export const Currencies = [
	{ label: "$ Dollar", value: "USD", locale: "en-US" },
	{ label: "₦ Naira", value: "NGN", locale: "en-NG" },
	{ label: "€ Euro", value: "EUR", locale: "de-DE" },
	{ label: "£ Pound", value: "GBP", locale: "en-GB" },
	{ label: "¥ Yen", value: "JPY", locale: "ja-JP" },
	{ label: "₩ Won", value: "KRW", locale: "ko-KR" },
	{ label: "₹ Rupee", value: "INR", locale: "hi-IN" },
];

export const MAX_DATE_RANGE_DAYS = 90;
