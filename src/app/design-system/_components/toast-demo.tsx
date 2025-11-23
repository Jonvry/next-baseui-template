"use client";

import { Button } from "@/components/design-system/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/design-system/card";
import { toastManager } from "@/components/design-system/toast";

export function ToastDemo() {
    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Toast Types</CardTitle>
                    <CardDescription>Different toast types for various scenarios</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        <Button
                            variant="outline"
                            onClick={() =>
                                toastManager.add({
                                    title: "Information",
                                    description: "This is an informational message.",
                                    type: "info",
                                })
                            }
                        >
                            Info Toast
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() =>
                                toastManager.add({
                                    title: "Success!",
                                    description: "Your action was completed successfully.",
                                    type: "success",
                                })
                            }
                        >
                            Success Toast
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() =>
                                toastManager.add({
                                    title: "Warning",
                                    description: "Please review before proceeding.",
                                    type: "warning",
                                })
                            }
                        >
                            Warning Toast
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() =>
                                toastManager.add({
                                    title: "Error",
                                    description: "Something went wrong. Please try again.",
                                    type: "error",
                                })
                            }
                        >
                            Error Toast
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Loading Toast</CardTitle>
                    <CardDescription>
                        Show a loading state that updates on completion
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button
                        onClick={() => {
                            const id = toastManager.add({
                                title: "Saving...",
                                description: "Please wait while we save your changes.",
                                type: "loading",
                            });

                            setTimeout(() => {
                                toastManager.update(id, {
                                    title: "Saved!",
                                    description: "Your changes have been saved.",
                                    type: "success",
                                });
                            }, 2000);
                        }}
                    >
                        Save with Loading
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Toast with Action</CardTitle>
                    <CardDescription>Toasts can include action buttons</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button
                        variant="secondary"
                        onClick={() =>
                            toastManager.add({
                                title: "Item deleted",
                                description: "The item has been moved to trash.",
                                type: "info",
                                actionProps: {
                                    children: "Undo",
                                    onClick: () => {
                                        toastManager.add({
                                            title: "Restored",
                                            description: "Item has been restored.",
                                            type: "success",
                                        });
                                    },
                                },
                            })
                        }
                    >
                        Delete with Undo
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Simple Toast</CardTitle>
                    <CardDescription>Toast with just a title</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button
                        variant="ghost"
                        onClick={() =>
                            toastManager.add({
                                title: "Copied to clipboard!",
                                type: "success",
                            })
                        }
                    >
                        Copy to Clipboard
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
