import { Mail, Trash2 } from "lucide-react";
import { Button } from "@/components/design-system/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/design-system/card";

export function ButtonDemo() {
    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Variants</CardTitle>
                    <CardDescription>Different button styles for various contexts</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-4">
                        <Button variant="default">Default</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="destructive">Destructive</Button>
                        <Button variant="destructive-outline">Destructive Outline</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="link">Link</Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Sizes</CardTitle>
                    <CardDescription>Different button sizes to fit your needs</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap items-center gap-4">
                        <Button size="xs">Extra Small</Button>
                        <Button size="sm">Small</Button>
                        <Button size="default">Default</Button>
                        <Button size="lg">Large</Button>
                        <Button size="xl">Extra Large</Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>With Icons</CardTitle>
                    <CardDescription>
                        Buttons with icons for enhanced visual communication
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-4">
                        <Button>
                            <Mail />
                            Send Email
                        </Button>
                        <Button variant="destructive">
                            <Trash2 />
                            Delete
                        </Button>
                        <Button variant="outline" size="icon">
                            <Mail />
                        </Button>
                        <Button variant="outline" size="icon-sm">
                            <Mail />
                        </Button>
                        <Button variant="outline" size="icon-lg">
                            <Mail />
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>States</CardTitle>
                    <CardDescription>Different button states</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-4">
                        <Button>Active</Button>
                        <Button disabled>Disabled</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
