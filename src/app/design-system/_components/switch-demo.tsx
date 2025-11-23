"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/design-system/card";
import { Label } from "@/components/design-system/label";
import { Switch } from "@/components/design-system/switch";

export function SwitchDemo() {
    const [enabled, setEnabled] = useState(false);

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Basic Switch</CardTitle>
                    <CardDescription>Simple switch toggle</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Switch id="basic" />
                        <Label htmlFor="basic">Enable notifications</Label>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Controlled Switch</CardTitle>
                    <CardDescription>Switch with controlled state</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Switch id="controlled" checked={enabled} onCheckedChange={setEnabled} />
                        <Label htmlFor="controlled">
                            Notifications are {enabled ? "enabled" : "disabled"}
                        </Label>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>States</CardTitle>
                    <CardDescription>Different switch states</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Switch id="off" />
                        <Label htmlFor="off">Off</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Switch id="on" defaultChecked />
                        <Label htmlFor="on">On</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Switch id="disabled-off" disabled />
                        <Label htmlFor="disabled-off">Disabled (Off)</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Switch id="disabled-on" disabled defaultChecked />
                        <Label htmlFor="disabled-on">Disabled (On)</Label>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Form Example</CardTitle>
                    <CardDescription>Switches in a settings form</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="marketing">Marketing emails</Label>
                            <p className="text-muted-foreground text-sm">
                                Receive emails about new products and features
                            </p>
                        </div>
                        <Switch id="marketing" />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="security">Security emails</Label>
                            <p className="text-muted-foreground text-sm">
                                Receive emails about your account security
                            </p>
                        </div>
                        <Switch id="security" defaultChecked />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
