import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/design-system/card";
import { Input } from "@/components/design-system/input";
import { Label } from "@/components/design-system/label";

export function InputDemo() {
    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Basic Input</CardTitle>
                    <CardDescription>Default input field</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="Enter your email" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Sizes</CardTitle>
                    <CardDescription>Different input sizes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="small">Small</Label>
                        <Input id="small" size="sm" placeholder="Small input" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="default">Default</Label>
                        <Input id="default" placeholder="Default input" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="large">Large</Label>
                        <Input id="large" size="lg" placeholder="Large input" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Input Types</CardTitle>
                    <CardDescription>Different HTML5 input types</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="text">Text</Label>
                        <Input id="text" type="text" placeholder="Text input" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" placeholder="Password" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="number">Number</Label>
                        <Input id="number" type="number" placeholder="Enter a number" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="search">Search</Label>
                        <Input id="search" type="search" placeholder="Search..." />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="file">File</Label>
                        <Input id="file" type="file" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>States</CardTitle>
                    <CardDescription>Different input states</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="normal">Normal</Label>
                        <Input id="normal" placeholder="Normal state" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="disabled">Disabled</Label>
                        <Input id="disabled" placeholder="Disabled state" disabled />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="error">Error</Label>
                        <Input id="error" placeholder="Error state" aria-invalid />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
