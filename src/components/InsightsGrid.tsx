import type { AdData } from '../App';
import { InsightCard } from './InsightCard';

interface InsightsGridProps {
    ads: AdData[];
}

export function InsightsGrid({ ads }: InsightsGridProps) {
    // We want to ensure it has at least 7 items for the demo visually,
    // but we'll map whatever is passed in.
    return (
        <div>
            <h2 className="heading-2" style={{ marginBottom: '24px' }}>AI Creative Insights</h2>
            <div className="insights-grid-container">
                {ads.map((ad, index) => (
                    <InsightCard key={ad.id} ad={ad} index={index} />
                ))}
            </div>
        </div>
    );
}
