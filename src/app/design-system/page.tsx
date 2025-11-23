"use client";

import { useState } from "react";
import { ChevronRight, Search } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/design-system/card";
import { Input } from "@/components/design-system/input";
import { ScrollArea } from "@/components/design-system/scroll-area";
import { Separator } from "@/components/design-system/separator";
import { cn } from "@/lib/utils";
// Import all component demos
import { AccordionDemo } from "./_components/accordion-demo";
import { AlertDemo } from "./_components/alert-demo";
import { AlertDialogDemo } from "./_components/alert-dialog-demo";
import { AvatarDemo } from "./_components/avatar-demo";
import { BadgeDemo } from "./_components/badge-demo";
import { ButtonDemo } from "./_components/button-demo";
import { CardDemo } from "./_components/card-demo";
import { CheckboxDemo } from "./_components/checkbox-demo";
import { DialogDemo } from "./_components/dialog-demo";
import { InputDemo } from "./_components/input-demo";
import { SeparatorDemo } from "./_components/separator-demo";
import { SkeletonDemo } from "./_components/skeleton-demo";
import { SwitchDemo } from "./_components/switch-demo";
import { ToastDemo } from "./_components/toast-demo";
import { TooltipDemo } from "./_components/tooltip-demo";

const componentGroups = [
    {
        name: "Form",
        components: [
            { id: "button", name: "Button", demo: ButtonDemo },
            { id: "checkbox", name: "Checkbox", demo: CheckboxDemo },
            { id: "input", name: "Input", demo: InputDemo },
            { id: "switch", name: "Switch", demo: SwitchDemo },
        ],
    },
    {
        name: "Layout",
        components: [
            { id: "card", name: "Card", demo: CardDemo },
            { id: "separator", name: "Separator", demo: SeparatorDemo },
            { id: "accordion", name: "Accordion", demo: AccordionDemo },
        ],
    },
    {
        name: "Feedback",
        components: [
            { id: "alert", name: "Alert", demo: AlertDemo },
            { id: "alert-dialog", name: "Alert Dialog", demo: AlertDialogDemo },
            { id: "dialog", name: "Dialog", demo: DialogDemo },
            { id: "skeleton", name: "Skeleton", demo: SkeletonDemo },
            { id: "toast", name: "Toast", demo: ToastDemo },
            { id: "tooltip", name: "Tooltip", demo: TooltipDemo },
        ],
    },
    {
        name: "Display",
        components: [
            { id: "avatar", name: "Avatar", demo: AvatarDemo },
            { id: "badge", name: "Badge", demo: BadgeDemo },
        ],
    },
];

export default function ShowcasePage() {
    const [selectedComponent, setSelectedComponent] = useState("button");
    const [searchQuery, setSearchQuery] = useState("");
    const [isSidebarOpen] = useState(true);

    // Filter components based on search
    const filteredGroups = componentGroups
        .map((group) => ({
            ...group,
            components: group.components.filter((comp) =>
                comp.name.toLowerCase().includes(searchQuery.toLowerCase())
            ),
        }))
        .filter((group) => group.components.length > 0);

    // Find the selected component demo
    const selectedDemo = componentGroups
        .flatMap((group) => group.components)
        .find((comp) => comp.id === selectedComponent);

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <aside
                className={cn(
                    "bg-background flex w-64 flex-col border-r transition-all duration-300",
                    !isSidebarOpen && "-ml-64"
                )}
            >
                <div className="flex h-14 items-center border-b px-4">
                    <h2 className="text-lg font-semibold">Components</h2>
                </div>

                <div className="p-4">
                    <div className="relative">
                        <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                        <Input
                            placeholder="Search components..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9"
                            size="sm"
                        />
                    </div>
                </div>

                <ScrollArea className="flex-1 px-3">
                    <div className="space-y-4 pb-4">
                        {filteredGroups.map((group) => (
                            <div key={group.name}>
                                <h3 className="text-muted-foreground mb-2 px-3 text-xs font-semibold tracking-wider uppercase">
                                    {group.name}
                                </h3>
                                <div className="space-y-1">
                                    {group.components.map((component) => (
                                        <button
                                            key={component.id}
                                            onClick={() => setSelectedComponent(component.id)}
                                            className={cn(
                                                "hover:bg-accent flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                                                selectedComponent === component.id &&
                                                    "bg-accent font-medium"
                                            )}
                                        >
                                            <ChevronRight
                                                className={cn(
                                                    "size-4 transition-transform",
                                                    selectedComponent === component.id &&
                                                        "rotate-90"
                                                )}
                                            />
                                            {component.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <div className="mx-auto max-w-5xl p-8">
                    <div className="mb-8">
                        <h1 className="mb-2 text-4xl font-bold">{selectedDemo?.name}</h1>
                        <p className="text-muted-foreground">
                            Examples and usage of the {selectedDemo?.name} component
                        </p>
                    </div>

                    <Separator className="my-8" />

                    <div className="space-y-8">
                        {selectedDemo?.demo ? (
                            <selectedDemo.demo />
                        ) : (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Component Demo Coming Soon</CardTitle>
                                    <CardDescription>
                                        Demo examples for this component are being prepared.
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
