import {
    Users,
    Store as StoreIcon,
    ShoppingCart,
    CheckCircle,
    Activity,
    TrendingUp,
    TrendingDown,
    DollarSign,
    Eye,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/shared/card";
import { cn } from "@/utils";

const Internal = ({
    users = 0,
    stores = 0,
    purchases = 0,
    usersThisWeek = 0,
    usersThisMonth = 0,
    purchasesThisMonth = 0,
    activeStoresThisWeek = 0,
    activeStores = 0,
    activatedStores = 0,
    gmvThisMonth = 0,
    gmvLastMonth = 0,
    gmvThisYear = 0,
    gmvLastYear = 0,
    gmvAllTime = 0,
    gmvThisWeek = 0,
    gmvLastWeek = 0,
    activatedStoresThisWeek = 0,
    activatedStoresLastWeek = 0,
    purchasesThisWeek = 0,
    purchasesLastWeek = 0,
    storeViewsThisWeek = 0,
    storeViewsLastWeek = 0,
    errors = null,
    success = null,
}) => {
    const formatCurrency = (value) =>
        new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "GHS",
            notation: "compact",
            maximumFractionDigits: 1,
        }).format(value || 0);

    const monthGrowth = gmvLastMonth ? ((gmvThisMonth - gmvLastMonth) / gmvLastMonth) * 100 : 0;
    const yearGrowth = gmvLastYear ? ((gmvThisYear - gmvLastYear) / gmvLastYear) * 100 : 0;
    const weekGrowth = gmvLastWeek ? ((gmvThisWeek - gmvLastWeek) / gmvLastWeek) * 100 : 0;

    const activatedGrowth = activatedStoresLastWeek ? ((activatedStoresThisWeek - activatedStoresLastWeek) / activatedStoresLastWeek) * 100 : 0;
    const purchasesGrowth = purchasesLastWeek ? ((purchasesThisWeek - purchasesLastWeek) / purchasesLastWeek) * 100 : 0;
    const viewsGrowth = storeViewsLastWeek ? ((storeViewsThisWeek - storeViewsLastWeek) / storeViewsLastWeek) * 100 : 0;

    return (
        <div className="container mx-auto px-4 py-24">
            <img src="/assets/img/inverse-square.png" className="w-32 mb-4 rounded-2xl" alt="" />
            <h1 className="mb-2 text-3xl font-semibold">Selll Metrics</h1>
            <p className="mb-12">
                KPIs & metrics for the Selll platform, providing insights into user engagement, store performance, and financial growth.
            </p>

            {errors && (
                <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-700">
                    {errors}
                </div>
            )}
            {success && (
                <div className="mb-4 rounded-md bg-green-50 p-4 text-sm text-green-700">
                    {success}
                </div>
            )}

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle>Users</CardTitle>
                        <Users className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">
                            {users.toLocaleString()}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle>Users (This Week)</CardTitle>
                        <Users className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{usersThisWeek.toLocaleString()}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle>Users (This Month)</CardTitle>
                        <Users className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{usersThisMonth.toLocaleString()}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle>Stores</CardTitle>
                        <StoreIcon className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">
                            {stores.toLocaleString()}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle>Active Stores (This Week)</CardTitle>
                        <Activity className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{activeStoresThisWeek.toLocaleString()}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle>Active Stores (30d)</CardTitle>
                        <Activity className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">
                            {activeStores.toLocaleString()}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle>Purchases</CardTitle>
                        <ShoppingCart className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">
                            {purchases.toLocaleString()}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle>Purchases (This Month)</CardTitle>
                        <ShoppingCart className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{purchasesThisMonth.toLocaleString()}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle>Activated Stores</CardTitle>
                        <CheckCircle className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">
                            {activatedStores.toLocaleString()}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle>GMV (This Month)</CardTitle>
                        <DollarSign className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">
                            {formatCurrency(gmvThisMonth)}
                        </p>
                        <p
                            className={cn(
                                "text-xs font-medium",
                                monthGrowth >= 0
                                    ? "text-emerald-600"
                                    : "text-red-600",
                            )}
                        >
                            {monthGrowth >= 0 ? (
                                <TrendingUp className="inline mr-1 h-3 w-3" />
                            ) : (
                                <TrendingDown className="inline mr-1 h-3 w-3" />
                            )}
                            {monthGrowth.toFixed(1)}%
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle>GMV (This Year)</CardTitle>
                        <DollarSign className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">
                            {formatCurrency(gmvThisYear)}
                        </p>
                        <p
                            className={cn(
                                "text-xs font-medium",
                                yearGrowth >= 0
                                    ? "text-emerald-600"
                                    : "text-red-600",
                            )}
                        >
                            {yearGrowth >= 0 ? (
                                <TrendingUp className="inline mr-1 h-3 w-3" />
                            ) : (
                                <TrendingDown className="inline mr-1 h-3 w-3" />
                            )}
                            {yearGrowth.toFixed(1)}%
                        </p>
                    </CardContent>
                </Card>

                <Card className="sm:col-span-2 lg:col-span-1 xl:col-span-1">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle>GMV (All Time)</CardTitle>
                        <DollarSign className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">
                            {formatCurrency(gmvAllTime)}
                        </p>
                    </CardContent>
                </Card>

                {/* GMV (This Week) */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle>GMV (This Week)</CardTitle>
                        <DollarSign className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{formatCurrency(gmvThisWeek)}</p>
                        <p
                            className={cn(
                                "text-xs font-medium",
                                weekGrowth >= 0 ? "text-emerald-600" : "text-red-600",
                            )}
                        >
                            {weekGrowth >= 0 ? (
                                <TrendingUp className="inline mr-1 h-3 w-3" />
                            ) : (
                                <TrendingDown className="inline mr-1 h-3 w-3" />
                            )}
                            {weekGrowth.toFixed(1)}%
                        </p>
                    </CardContent>
                </Card>

                {/* GMV (Last Week) */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle>GMV (Last Week)</CardTitle>
                        <DollarSign className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{formatCurrency(gmvLastWeek)}</p>
                    </CardContent>
                </Card>

                {/* Activated Stores (This Week) */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle>Activated Stores (This Week)</CardTitle>
                        <CheckCircle className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{activatedStoresThisWeek.toLocaleString()}</p>
                        <p
                            className={cn(
                                "text-xs font-medium",
                                activatedGrowth >= 0 ? "text-emerald-600" : "text-red-600",
                            )}
                        >
                            {activatedGrowth >= 0 ? (
                                <TrendingUp className="inline mr-1 h-3 w-3" />
                            ) : (
                                <TrendingDown className="inline mr-1 h-3 w-3" />
                            )}
                            {activatedGrowth.toFixed(1)}%
                        </p>
                    </CardContent>
                </Card>

                {/* Activated Stores (Last Week) */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle>Activated Stores (Last Week)</CardTitle>
                        <CheckCircle className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{activatedStoresLastWeek.toLocaleString()}</p>
                    </CardContent>
                </Card>

                {/* Purchases (This Week) */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle>Purchases (This Week)</CardTitle>
                        <ShoppingCart className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{purchasesThisWeek.toLocaleString()}</p>
                        <p
                            className={cn(
                                "text-xs font-medium",
                                purchasesGrowth >= 0 ? "text-emerald-600" : "text-red-600",
                            )}
                        >
                            {purchasesGrowth >= 0 ? (
                                <TrendingUp className="inline mr-1 h-3 w-3" />
                            ) : (
                                <TrendingDown className="inline mr-1 h-3 w-3" />
                            )}
                            {purchasesGrowth.toFixed(1)}%
                        </p>
                    </CardContent>
                </Card>

                {/* Purchases (Last Week) */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle>Purchases (Last Week)</CardTitle>
                        <ShoppingCart className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{purchasesLastWeek.toLocaleString()}</p>
                    </CardContent>
                </Card>

                {/* Store Views (This Week) */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle>Store Views (This Week)</CardTitle>
                        <Eye className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{storeViewsThisWeek.toLocaleString()}</p>
                        <p
                            className={cn(
                                "text-xs font-medium",
                                viewsGrowth >= 0 ? "text-emerald-600" : "text-red-600",
                            )}
                        >
                            {viewsGrowth >= 0 ? (
                                <TrendingUp className="inline mr-1 h-3 w-3" />
                            ) : (
                                <TrendingDown className="inline mr-1 h-3 w-3" />
                            )}
                            {viewsGrowth.toFixed(1)}%
                        </p>
                    </CardContent>
                </Card>

                {/* Store Views (Last Week) */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle>Store Views (Last Week)</CardTitle>
                        <Eye className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{storeViewsLastWeek.toLocaleString()}</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Internal;
