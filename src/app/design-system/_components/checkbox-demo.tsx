"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/design-system/card";
import { Checkbox } from "@/components/design-system/checkbox";
import { Label } from "@/components/design-system/label";

export function CheckboxDemo() {
    const [checked, setChecked] = useState(false);

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Basic Checkbox</CardTitle>
                    <CardDescription>Simple checkbox with label</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Checkbox id="terms" />
                        <Label htmlFor="terms">Accept terms and conditions</Label>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Controlled Checkbox</CardTitle>
                    <CardDescription>Checkbox with controlled state</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Checkbox id="controlled" checked={checked} onCheckedChange={setChecked} />
                        <Label htmlFor="controlled">
                            Checkbox is {checked ? "checked" : "unchecked"}
                        </Label>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>States</CardTitle>
                    <CardDescription>Different checkbox states</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Checkbox id="normal" />
                        <Label htmlFor="normal">Normal</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="checked-state" defaultChecked />
                        <Label htmlFor="checked-state">Checked</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="disabled" disabled />
                        <Label htmlFor="disabled">Disabled</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="disabled-checked" disabled defaultChecked />
                        <Label htmlFor="disabled-checked">Disabled & Checked</Label>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
