"use client";

import { Category } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";
import { deleteCategory } from "../../_actions/categories";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type DeleteCategoryProps = {
	trigger: React.ReactNode;
	category: Category;
};

const DeleteCategoryDialog = ({ trigger, category }: DeleteCategoryProps) => {
	const categoryIdentifier = `${category.name}-${category.type}`;

	const queryClient = useQueryClient();

	const deleteMutation = useMutation({
		mutationFn: deleteCategory,
		onSuccess: async () => {
			toast.success("Category deleted successfully", {
				id: categoryIdentifier,
			});

			await queryClient.invalidateQueries({
				queryKey: ["categories"],
			});
		},
		onError: () => {
			toast.success("Something went wrong", {
				id: categoryIdentifier,
			});
		},
	});

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete the
						&apos;{category.icon} {category.name}&apos; category
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={() => {
							toast.loading("Deleting category...", {
								id: categoryIdentifier,
							});
							deleteMutation.mutate({
								name: category.name,
								type: category.type as TransactionType,
							});
						}}
					>
						Continue
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default DeleteCategoryDialog;
