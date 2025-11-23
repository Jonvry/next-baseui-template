"use client";

import { Button } from "@/components/design-system/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/design-system/card";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/design-system/dialog";
import { Input } from "@/components/design-system/input";
import { Label } from "@/components/design-system/label";

export function DialogDemo() {
    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Basic Dialog</CardTitle>
                    <CardDescription>Simple dialog with header and content</CardDescription>
                </CardHeader>
                <CardContent>
                    <Dialog>
                        <DialogTrigger render={<Button />}>Open Dialog</DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Dialog Title</DialogTitle>
                                <DialogDescription>
                                    This is a basic dialog. It can contain any content you want to
                                    display to the user.
                                </DialogDescription>
                            </DialogHeader>
                            <p className="text-sm">
                                Dialogs are useful for displaying information, collecting input, or
                                confirming actions without leaving the current page.
                            </p>
                        </DialogContent>
                    </Dialog>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Dialog with Form</CardTitle>
                    <CardDescription>Dialog containing a form with inputs</CardDescription>
                </CardHeader>
                <CardContent>
                    <Dialog>
                        <DialogTrigger render={<Button variant="outline" />}>
                            Edit Profile
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Edit Profile</DialogTitle>
                                <DialogDescription>
                                    Make changes to your profile here. Click save when you&apos;re
                                    done.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Name
                                    </Label>
                                    <Input
                                        id="name"
                                        defaultValue="John Doe"
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="username" className="text-right">
                                        Username
                                    </Label>
                                    <Input
                                        id="username"
                                        defaultValue="@johndoe"
                                        className="col-span-3"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <DialogClose render={<Button variant="outline" />}>
                                    Cancel
                                </DialogClose>
                                <DialogClose render={<Button />}>Save changes</DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Dialog without Close Button</CardTitle>
                    <CardDescription>Dialog with custom footer actions only</CardDescription>
                </CardHeader>
                <CardContent>
                    <Dialog>
                        <DialogTrigger render={<Button variant="secondary" />}>
                            Terms of Service
                        </DialogTrigger>
                        <DialogContent showCloseButton={false}>
                            <DialogHeader>
                                <DialogTitle>Terms of Service</DialogTitle>
                                <DialogDescription>
                                    Please read and accept our terms of service to continue.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="max-h-64 overflow-y-auto rounded border p-4 text-sm">
                                <p className="mb-2">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                                <p className="mb-2">
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                    laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                                <p>
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse
                                    cillum dolore eu fugiat nulla pariatur.
                                </p>
                            </div>
                            <DialogFooter>
                                <DialogClose render={<Button variant="outline" />}>
                                    Decline
                                </DialogClose>
                                <DialogClose render={<Button />}>Accept</DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </CardContent>
            </Card>
        </div>
    );
}
