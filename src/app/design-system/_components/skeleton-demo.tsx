import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/design-system/card";
import { Skeleton } from "@/components/design-system/skeleton";

export function SkeletonDemo() {
    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Basic Skeleton</CardTitle>
                    <CardDescription>Simple loading skeletons</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-3/4" />
                    <Skeleton className="h-12 w-1/2" />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Card Skeleton</CardTitle>
                    <CardDescription>Skeleton for a card layout</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-3">
                        <Skeleton className="h-32 w-full rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Profile Skeleton</CardTitle>
                    <CardDescription>Skeleton for a user profile</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4">
                        <Skeleton className="size-12 rounded-full" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-48" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
