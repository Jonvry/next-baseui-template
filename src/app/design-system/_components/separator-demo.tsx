import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/design-system/card";
import { Separator } from "@/components/design-system/separator";

export function SeparatorDemo() {
    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Horizontal Separator</CardTitle>
                    <CardDescription>Default horizontal separator</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-1">
                        <h4 className="text-sm font-medium">Section 1</h4>
                        <p className="text-muted-foreground text-sm">Content for section 1</p>
                    </div>
                    <Separator />
                    <div className="space-y-1">
                        <h4 className="text-sm font-medium">Section 2</h4>
                        <p className="text-muted-foreground text-sm">Content for section 2</p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Vertical Separator</CardTitle>
                    <CardDescription>Separator with vertical orientation</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex h-20 items-center">
                        <div className="flex-1 text-center">
                            <p className="text-sm font-medium">Left</p>
                        </div>
                        <Separator orientation="vertical" />
                        <div className="flex-1 text-center">
                            <p className="text-sm font-medium">Center</p>
                        </div>
                        <Separator orientation="vertical" />
                        <div className="flex-1 text-center">
                            <p className="text-sm font-medium">Right</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
