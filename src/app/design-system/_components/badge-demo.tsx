import { Badge } from "@/components/design-system/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/design-system/card";

export function BadgeDemo() {
    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Variants</CardTitle>
                    <CardDescription>Different badge styles for various contexts</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-3">
                        <Badge variant="default">Default</Badge>
                        <Badge variant="secondary">Secondary</Badge>
                        <Badge variant="outline">Outline</Badge>
                        <Badge variant="destructive">Destructive</Badge>
                        <Badge variant="info">Info</Badge>
                        <Badge variant="success">Success</Badge>
                        <Badge variant="warning">Warning</Badge>
                        <Badge variant="error">Error</Badge>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Sizes</CardTitle>
                    <CardDescription>Different badge sizes</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap items-center gap-3">
                        <Badge size="sm">Small</Badge>
                        <Badge size="default">Default</Badge>
                        <Badge size="lg">Large</Badge>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Usage Examples</CardTitle>
                    <CardDescription>Common badge use cases</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                        <span className="text-sm">Status:</span>
                        <Badge variant="success">Active</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm">Notifications:</span>
                        <Badge variant="destructive">5 new</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm">Tags:</span>
                        <Badge variant="outline">React</Badge>
                        <Badge variant="outline">TypeScript</Badge>
                        <Badge variant="outline">Next.js</Badge>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
