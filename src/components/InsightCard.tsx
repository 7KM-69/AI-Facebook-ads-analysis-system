import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import type { AdData } from '../App';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface InsightCardProps {
    ad: AdData;
    index: number;
}

export function InsightCard({ ad, index }: InsightCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const chartData = [
        { name: 'CTR', value: ad.ctr },
        { name: 'CPC', value: ad.cpc }
    ];

    const getVerdictColor = (verdict: string) => {
        switch (verdict) {
            case 'SCALE': return 'var(--text-primary)';
            case 'OPTIMIZE': return 'var(--text-secondary)';
            case 'STOP': return '#666666'; // Darker gray for stop
            default: return 'var(--text-primary)';
        }
    };

    return (
        <motion.div
            className="premium-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
            <div className="flex-between">
                <h3 className="heading-3" style={{ wordBreak: 'break-all' }}>{ad.name}</h3>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    border: '1px solid var(--border-color)',
                    padding: '4px 8px',
                    borderRadius: '4px'
                }}>
                    <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: ad.status === 'ACTIVE' ? 'var(--text-primary)' : 'var(--text-secondary)'
                    }} />
                    {ad.status}
                </div>
            </div>

            <div style={{ height: '140px', marginTop: '10px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)' }} />
                        <Tooltip
                            cursor={{ fill: 'transparent' }}
                            contentStyle={{ backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                        />
                        <Bar dataKey="value" fill="var(--text-primary)" radius={[0, 4, 4, 0]} barSize={20} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div style={{
                padding: '12px',
                border: '1px dashed var(--border-color)',
                borderRadius: '6px',
                backgroundColor: 'rgba(255,255,255,0.02)',
                marginTop: '8px'
            }}>
                <div className="flex-between" style={{ marginBottom: '8px' }}>
                    <span className="text-small" style={{ fontWeight: 600 }}>AI VERDICT</span>
                    <span style={{
                        fontWeight: 700,
                        letterSpacing: '1px',
                        color: getVerdictColor(ad.aiVerdict),
                        backgroundColor: 'var(--bg-color)',
                        padding: '4px 12px',
                        borderRadius: '4px',
                        border: '1px solid var(--border-color)'
                    }}>
                        {ad.aiVerdict}
                    </span>
                </div>

                <div style={{ overflow: 'hidden' }}>
                    <p className="text-small" style={{
                        lineHeight: 1.6,
                        display: isExpanded ? 'block' : '-webkit-box',
                        WebkitLineClamp: isExpanded ? 'unset' : 2,
                        WebkitBoxOrient: 'vertical',
                    }}>
                        {ad.aiReasoning}
                    </p>
                </div>

                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-primary)',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        marginTop: '12px',
                        padding: 0
                    }}
                >
                    {isExpanded ? 'Read Less' : 'Read More'}
                    {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
            </div>

            <div className="flex-between" style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Spend</span>
                    <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>${ad.spend.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Purchases</span>
                    <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{ad.purchases}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>ROAS</span>
                    <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{ad.roas}x</span>
                </div>
            </div>
        </motion.div>
    );
}
