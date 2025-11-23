import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/design-system/accordion";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/design-system/card";

export function AccordionDemo() {
    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Basic Accordion</CardTitle>
                    <CardDescription>Collapsible content sections</CardDescription>
                </CardHeader>
                <CardContent>
                    <Accordion>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>What is this component library?</AccordionTrigger>
                            <AccordionContent>
                                This is a comprehensive design system built with shadcn/ui
                                components and Base UI primitives. It provides a collection of
                                reusable, accessible components for building modern web
                                applications.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-2">
                            <AccordionTrigger>How do I use it?</AccordionTrigger>
                            <AccordionContent>
                                Simply import the components you need and use them in your React
                                application. All components are fully typed with TypeScript and
                                follow accessibility best practices.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-3">
                            <AccordionTrigger>Is it customizable?</AccordionTrigger>
                            <AccordionContent>
                                Yes! All components are built with Tailwind CSS and support custom
                                styling through className props. You can also customize the theme
                                using CSS variables.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>FAQ Example</CardTitle>
                    <CardDescription>Common use case for accordions</CardDescription>
                </CardHeader>
                <CardContent>
                    <Accordion>
                        <AccordionItem value="q1">
                            <AccordionTrigger>
                                Can I use this in a commercial project?
                            </AccordionTrigger>
                            <AccordionContent>
                                Yes, you can use these components in both personal and commercial
                                projects.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="q2">
                            <AccordionTrigger>
                                Do I need to install additional dependencies?
                            </AccordionTrigger>
                            <AccordionContent>
                                The components require React, Base UI components, and Tailwind CSS.
                                All other dependencies are included.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    );
}
