import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

interface MetricProps {
    title: string;
    value: string;
    data: any[];
    delay?: number;
}

const Sparkline = ({ data }: { data: any[] }) => (
    <div style={{ height: '40px', width: '100px' }}>
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
                <Line
                    type="monotone"
                    dataKey="value"
                    stroke="var(--text-secondary)"
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={true}
                />
            </LineChart>
        </ResponsiveContainer>
    </div>
);

function MetricCard({ title, value, data, delay = 0 }: MetricProps) {
    return (
        <motion.div
            className="premium-card flex-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
        >
            <div>
                <h3 className="text-small" style={{ marginBottom: '8px' }}>{title}</h3>
                <p className="heading-1">{value}</p>
            </div>
            <Sparkline data={data} />
        </motion.div>
    );
}

interface MetricOverviewProps {
    totalSpend: number;
    avgRoas: number;
    totalConversions: number;
}

export function MetricOverview({ totalSpend, avgRoas, totalConversions }: MetricOverviewProps) {
    // Generate mock sparkline data
    const generateData = (trend: 'up' | 'down' | 'flat') => {
        return Array.from({ length: 10 }).map((_, i) => ({
            value: trend === 'up' ? i * (Math.random() * 2) : trend === 'down' ? 10 - i * (Math.random() * 2) : Math.random() * 10
        }));
    };

    return (
        <div className="metric-overview-container">
            <MetricCard
                title="Total Spend"
                value={`$${totalSpend.toLocaleString()}`}
                data={generateData('up')}
                delay={0.1}
            />
            <MetricCard
                title="Average ROAS"
                value={`${avgRoas}x`}
                data={generateData('down')}
                delay={0.2}
            />
            <MetricCard
                title="Total Conversions"
                value={totalConversions.toLocaleString()}
                data={generateData('up')}
                delay={0.3}
            />
        </div>
    );
}
