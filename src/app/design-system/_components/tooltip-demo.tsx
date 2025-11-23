"use client";

import { Info } from "lucide-react";
import { Button } from "@/components/design-system/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/design-system/card";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/design-system/tooltip";

export function TooltipDemo() {
    return (
        <TooltipProvider>
            <div className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Basic Tooltip</CardTitle>
                        <CardDescription>Simple tooltip on hover</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tooltip>
                            <TooltipTrigger render={<Button variant="outline" />}>
                                Hover me
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>This is a tooltip</p>
                            </TooltipContent>
                        </Tooltip>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Tooltip Positions</CardTitle>
                        <CardDescription>Tooltips can appear on different sides</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-4">
                            <Tooltip>
                                <TooltipTrigger render={<Button variant="outline" />}>
                                    Top
                                </TooltipTrigger>
                                <TooltipContent side="top">
                                    <p>Tooltip on top</p>
                                </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger render={<Button variant="outline" />}>
                                    Right
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    <p>Tooltip on right</p>
                                </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger render={<Button variant="outline" />}>
                                    Bottom
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                    <p>Tooltip on bottom</p>
                                </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger render={<Button variant="outline" />}>
                                    Left
                                </TooltipTrigger>
                                <TooltipContent side="left">
                                    <p>Tooltip on left</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Icon with Tooltip</CardTitle>
                        <CardDescription>Tooltip on icon buttons</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tooltip>
                            <TooltipTrigger render={<Button variant="ghost" size="icon" />}>
                                <Info />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Additional information about this feature</p>
                            </TooltipContent>
                        </Tooltip>
                    </CardContent>
                </Card>
            </div>
        </TooltipProvider>
    );
}
