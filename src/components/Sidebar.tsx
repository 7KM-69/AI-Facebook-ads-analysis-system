import { Home, BarChart2, Settings, DownloadCloud } from 'lucide-react';

export function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <div style={{ width: 32, height: 32, backgroundColor: 'var(--text-primary)', borderRadius: '50%' }}></div>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '24px', flex: 1, marginTop: '24px' }}>
                <Home className="sidebar-icon active" size={24} />
                <BarChart2 className="sidebar-icon" size={24} />
                <DownloadCloud className="sidebar-icon" size={24} />
            </nav>

            <div style={{ marginBottom: '24px' }}>
                <Settings className="sidebar-icon" size={24} />
            </div>
        </aside>
    );
}
