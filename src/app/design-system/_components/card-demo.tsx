import { MoreVertical } from "lucide-react";
import { Button } from "@/components/design-system/button";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/design-system/card";

export function CardDemo() {
    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Basic Card</CardTitle>
                    <CardDescription>
                        A simple card with header, content, and footer
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Card Title</CardTitle>
                                <CardDescription>Card description goes here</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>This is the card content. You can put any content here.</p>
                            </CardContent>
                            <CardFooter>
                                <Button>Action</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Card with Action</CardTitle>
                    <CardDescription>Card with an action button in the header</CardDescription>
                </CardHeader>
                <CardContent>
                    <Card>
                        <CardHeader>
                            <CardTitle>Project Name</CardTitle>
                            <CardDescription>Project description and details</CardDescription>
                            <CardAction>
                                <Button variant="ghost" size="icon-sm">
                                    <MoreVertical />
                                </Button>
                            </CardAction>
                        </CardHeader>
                        <CardContent>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Multiple Cards Layout</CardTitle>
                    <CardDescription>Grid of cards for dashboard-like layouts</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Total Users</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold">1,234</p>
                                <p className="text-muted-foreground text-sm">
                                    +12% from last month
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Revenue</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold">$12,345</p>
                                <p className="text-muted-foreground text-sm">+8% from last month</p>
                            </CardContent>
                        </Card>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
