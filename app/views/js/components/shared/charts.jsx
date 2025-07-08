import {
    Line,
    LineChart as RechartsLineChart,
    ResponsiveContainer,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Bar,
    BarChart as RechartsBarChart,
} from "recharts";

export function LineChart({ data, currentStore }) {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <RechartsLineChart data={data}>
                <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-gray-600/10"
                />
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) =>
                        new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: currentStore?.currency,
                        }).format(value)
                    }
                />
                <Tooltip
                    content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                            return (
                                <div className="rounded-lg border bg-background p-2 shadow-sm">
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="flex flex-col">
                                            <span className="text-[0.70rem] uppercase text-gray-500">
                                                {payload[0].payload.name}
                                            </span>
                                            <span className="font-bold text-gray-900 dark:text-white">
                                                {payload[0].value.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        }

                        return null;
                    }}
                />
                <Line
                    type="monotone"
                    dataKey="total"
                    stroke="#f97316"
                    strokeWidth={2}
                    activeDot={{
                        r: 6,
                        style: { fill: "#f97316", opacity: 0.25 },
                    }}
                />
            </RechartsLineChart>
        </ResponsiveContainer>
    );
}

export function BarChart({ data, currentStore }) {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <RechartsBarChart data={data}>
                <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-gray-600/10"
                />
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) =>
                        // new Intl.NumberFormat("en-US", {
                        //     style: "currency",
                        //     currency: currentStore?.currency,
                        // }).format(value)
                        value.toLocaleString()
                    }
                />
                <Tooltip
                    content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                            return (
                                <div className="rounded-lg border bg-background p-2 shadow-sm">
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="flex flex-col">
                                            <span className="text-[0.70rem] uppercase text-gray-500">
                                                {payload[0].payload.name}
                                            </span>
                                            <span className="font-bold text-gray-900 dark:text-white">
                                                {payload[0].value.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        }

                        return null;
                    }}
                />
                <Bar dataKey="total" fill="#f97316" radius={[4, 4, 0, 0]} />
            </RechartsBarChart>
        </ResponsiveContainer>
    );
}
