"use server";

import { prisma } from "@/lib/prisma";
import { updateUserCurrencySchema } from "@/schema/user-currency";
import { revalidatePath } from "next/cache";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getUserId = async () => {
	const cookiesStore = await cookies();
	const userId = cookiesStore.get("__session_auth")?.value;
	if (!userId) {
		throw new Error("User ID not found");
	}
	return userId;
};

export const createUser = async () => {
	const userId = await getUserId();

	if (!userId) {
		redirect("/sign-in");
	}

	let user = await prisma.user.findUnique({
		where: {
			userId: userId,
		},
	});

	if (!user) {
		user = await prisma.user.create({
			data: {
				userId: userId,
				currency: "",
			},
		});
	}

	// revalidate the homepage that uses this data
	revalidatePath("/");
	return user;
};

export const updateUserCurrency = async (currency: string) => {
	const parsedBody = updateUserCurrencySchema.safeParse({ currency });
	if (!parsedBody.success) throw Error(parsedBody.error.message);

	const userId = await getUserId();

	if (!userId) redirect("/sign-in");

	const user = await prisma.user.update({
		where: {
			userId: userId,
		},
		data: {
			currency,
		},
	});

	return user;
};
