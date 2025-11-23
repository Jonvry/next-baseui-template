import { Avatar, AvatarFallback, AvatarImage } from "@/components/design-system/avatar";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/design-system/card";

export function AvatarDemo() {
    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Basic Avatar</CardTitle>
                    <CardDescription>Avatar with image and fallback</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-4">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <Avatar>
                            <AvatarFallback>AB</AvatarFallback>
                        </Avatar>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Sizes</CardTitle>
                    <CardDescription>Different avatar sizes using className</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4">
                        <Avatar className="size-6">
                            <AvatarFallback className="text-xs">XS</AvatarFallback>
                        </Avatar>
                        <Avatar className="size-8">
                            <AvatarFallback className="text-xs">SM</AvatarFallback>
                        </Avatar>
                        <Avatar className="size-10">
                            <AvatarFallback>MD</AvatarFallback>
                        </Avatar>
                        <Avatar className="size-12">
                            <AvatarFallback>LG</AvatarFallback>
                        </Avatar>
                        <Avatar className="size-16">
                            <AvatarFallback className="text-lg">XL</AvatarFallback>
                        </Avatar>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Usage Example</CardTitle>
                    <CardDescription>Avatar in a user profile context</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4">
                        <Avatar className="size-12">
                            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-sm font-medium">John Doe</p>
                            <p className="text-muted-foreground text-sm">john@example.com</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
