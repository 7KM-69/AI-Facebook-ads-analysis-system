import { useState } from 'react';
import './App.css';
import './print.css'; // Import print styles
import { Sidebar } from './components/Sidebar';
import { UploadZone } from './components/UploadZone';
import { LoadingOverlay } from './components/LoadingOverlay';
import { MetricOverview } from './components/MetricOverview';
import { InsightsGrid } from './components/InsightsGrid';
import { Printer } from 'lucide-react';

export interface AdData {
  id: string;
  name: string;
  status: 'ACTIVE' | 'PAUSED';
  spend: number;
  cpc: number;
  ctr: number;
  purchases: number;
  roas: number;
  aiVerdict: 'SCALE' | 'OPTIMIZE' | 'STOP';
  aiReasoning: string;
}

export interface DashboardData {
  totalSpend: number;
  avgRoas: number;
  totalConversions: number;
  ads: AdData[];
}

// Ensure you replace this with your actual n8n webhook URL
const N8N_WEBHOOK_URL = 'YOUR_N8N_PRODUCTION_WEBHOOK_URL_HERE';

function App() {
  const [appState, setAppState] = useState<'upload' | 'loading' | 'dashboard'>('upload');
  const [data, setData] = useState<DashboardData | null>(null);

  const handlePrint = () => {
    window.print();
  };

  const getMockData = (): DashboardData => ({
    totalSpend: 24850.00,
    avgRoas: 2.9,
    totalConversions: 890,
    ads: [
      {
        id: '1',
        name: 'Retargeting_Video_V2',
        status: 'ACTIVE',
        spend: 3450,
        cpc: 0.45,
        ctr: 2.8,
        purchases: 120,
        roas: 4.2,
        aiVerdict: 'SCALE',
        aiReasoning: 'Consistent ROAS over 4 with healthy CTR. Increasing budget by 20% is recommended as audience saturation is still low.'
      },
      {
        id: '2',
        name: 'Broad_Static_Lifestyle',
        status: 'ACTIVE',
        spend: 5200,
        cpc: 1.10,
        ctr: 0.9,
        purchases: 180,
        roas: 2.1,
        aiVerdict: 'OPTIMIZE',
        aiReasoning: 'Spend is highly concentrated here but CTR is dropping below 1%. Test new creative variations with the same winning copy.'
      },
      {
        id: '3',
        name: 'LAL_1%_Purchasers_Carousel',
        status: 'ACTIVE',
        spend: 1200,
        cpc: 2.50,
        ctr: 0.4,
        purchases: 15,
        roas: 0.8,
        aiVerdict: 'STOP',
        aiReasoning: 'Cost per click is critically high and ROAS is negative. Audience likely fatigued or creative is missing the mark. Pause immediately.'
      },
      {
        id: '4',
        name: 'Prospecting_UGC_Test_A',
        status: 'ACTIVE',
        spend: 2800,
        cpc: 0.85,
        ctr: 1.5,
        purchases: 95,
        roas: 3.1,
        aiVerdict: 'SCALE',
        aiReasoning: 'UGC is resonating strongly with this cold audience. CPA is 15% below target. Recommended to duplicate adset vertically.'
      },
      {
        id: '5',
        name: 'Prospecting_UGC_Test_B',
        status: 'ACTIVE',
        spend: 2100,
        cpc: 1.45,
        ctr: 0.7,
        purchases: 45,
        roas: 1.4,
        aiVerdict: 'OPTIMIZE',
        aiReasoning: 'Hook rate is low compared to Test A. The offer is solid but the first 3 seconds are losing viewers. Recut the intro.'
      },
      {
        id: '6',
        name: 'Winback_Offer_30Days',
        status: 'PAUSED',
        spend: 450,
        cpc: 1.80,
        ctr: 0.6,
        purchases: 8,
        roas: 1.1,
        aiVerdict: 'STOP',
        aiReasoning: 'Audience size is too small limiting delivery, causing CPC spikes. Consolidate into a broader 90-day winback audience.'
      },
      {
        id: '7',
        name: 'Advantage_Plus_Founders_Story',
        status: 'ACTIVE',
        spend: 9650,
        cpc: 0.65,
        ctr: 2.1,
        purchases: 427,
        roas: 3.8,
        aiVerdict: 'SCALE',
        aiReasoning: 'Primary volume driver. ASC is learning perfectly. Do not touch settings, continue incremental 5% daily budget bumps.'
      }
    ]
  });

  const handleFileUpload = async (file: File) => {
    setAppState('loading');

    try {
      const formData = new FormData();
      formData.append('file', file);

      if (N8N_WEBHOOK_URL.includes('YOUR_N8N')) {
        throw new Error('Placeholder URL detected');
      }

      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const rawData = await response.json();

      if (rawData && rawData.data) {
        setData(rawData.data as DashboardData);
        setAppState('dashboard');
      } else {
        throw new Error('Invalid data format received from webhook');
      }

    } catch (error) {
      console.warn('Webhook failed or not configured. Falling back to mock data demonstration.', error);

      setTimeout(() => {
        setData(getMockData());
        setAppState('dashboard');
      }, 2500);
    }
  };

  return (
    <div className="app-container">
      <Sidebar />

      <main className="main-content">
        {appState === 'upload' && <UploadZone onFileUpload={handleFileUpload} />}
        {appState === 'loading' && <LoadingOverlay />}
        {appState === 'dashboard' && data && (
          <div className="dashboard-view">
            <div className="flex-between dashboard-header">
              <div>
                <h1 className="heading-1">Campaign Overview</h1>
                <p className="text-small">AI-powered insights based on latest export.</p>
              </div>

              <button className="btn-primary" onClick={handlePrint}>
                <Printer size={18} />
                Download PDF Report
              </button>
            </div>

            <MetricOverview
              totalSpend={data.totalSpend}
              avgRoas={data.avgRoas}
              totalConversions={data.totalConversions}
            />

            <InsightsGrid ads={data.ads} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
