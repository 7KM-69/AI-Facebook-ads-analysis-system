import { motion } from 'framer-motion';

export function LoadingOverlay() {
    return (
        <div className="flex-center" style={{ minHeight: '80vh', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ position: 'relative', width: '80px', height: '80px' }}>
                <motion.div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        border: '2px solid var(--border-color)',
                        borderTopColor: 'var(--text-primary)',
                        borderRadius: '50%',
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                    style={{
                        position: 'absolute',
                        inset: '10px',
                        border: '2px solid var(--border-color)',
                        borderRightColor: 'var(--text-secondary)',
                        borderRadius: '50%',
                    }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
            </div>

            <div style={{ textAlign: 'center' }}>
                <motion.h2
                    className="heading-2"
                    style={{ marginBottom: '0.5rem' }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                    Processing Data with AI...
                </motion.h2>
                <p className="text-small">Analyzing ad copy, metrics, and finding scaling opportunities.</p>
            </div>
        </div>
    );
}
