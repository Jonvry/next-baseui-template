import { AlertCircle, CheckCircle2, Info, Terminal, TriangleAlert, X } from "lucide-react";
import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/components/design-system/alert";
import { Button } from "@/components/design-system/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/design-system/card";

export function AlertDemo() {
    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Alert Variants</CardTitle>
                    <CardDescription>Different alert styles for various contexts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Alert variant="default">
                        <Terminal />
                        <AlertTitle>Default Alert</AlertTitle>
                        <AlertDescription>
                            This is a default alert with an icon and description.
                        </AlertDescription>
                    </Alert>

                    <Alert variant="info">
                        <Info />
                        <AlertTitle>Information</AlertTitle>
                        <AlertDescription>
                            This is an informational alert to draw attention to important details.
                        </AlertDescription>
                    </Alert>

                    <Alert variant="success">
                        <CheckCircle2 />
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>
                            Your changes have been saved successfully.
                        </AlertDescription>
                    </Alert>

                    <Alert variant="warning">
                        <TriangleAlert />
                        <AlertTitle>Warning</AlertTitle>
                        <AlertDescription>
                            Please review this warning before proceeding.
                        </AlertDescription>
                    </Alert>

                    <Alert variant="error">
                        <AlertCircle />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            An error occurred while processing your request.
                        </AlertDescription>
                    </Alert>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Alert with Actions</CardTitle>
                    <CardDescription>Alerts with action buttons</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Alert variant="info">
                        <Info />
                        <AlertTitle>New Update Available</AlertTitle>
                        <AlertDescription>
                            A new version of the application is available. Update now to get the
                            latest features.
                        </AlertDescription>
                        <AlertAction>
                            <Button size="sm">Update</Button>
                            <Button variant="ghost" size="icon-sm">
                                <X />
                            </Button>
                        </AlertAction>
                    </Alert>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Simple Alert</CardTitle>
                    <CardDescription>Alert without icon</CardDescription>
                </CardHeader>
                <CardContent>
                    <Alert>
                        <AlertDescription>
                            This is a simple alert without an icon or title.
                        </AlertDescription>
                    </Alert>
                </CardContent>
            </Card>
        </div>
    );
}
