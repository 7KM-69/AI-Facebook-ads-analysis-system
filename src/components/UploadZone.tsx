import React, { useState, useRef } from 'react';
import { UploadCloud } from 'lucide-react';

interface UploadZoneProps {
    onFileUpload: (file: File) => void;
}

export function UploadZone({ onFileUpload }: UploadZoneProps) {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            onFileUpload(e.dataTransfer.files[0]);
        }
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            onFileUpload(e.target.files[0]);
        }
    };

    return (
        <div
            className="flex-center"
            style={{ minHeight: '80vh', flexDirection: 'column', gap: '2rem' }}
        >
            <div style={{ textAlign: 'center', maxWidth: '600px' }}>
                <h1 className="heading-1" style={{ marginBottom: '1rem' }}>AI Facebook Ads Analyzer</h1>
                <p className="text-small" style={{ fontSize: '1rem' }}>Upload your Facebook Ads export to receive instant AI-driven insights on performance, scaling opportunities, and optimization strategies.</p>
            </div>

            <div
                className={`premium-card flex-center ${isDragging ? 'dragging' : ''}`}
                style={{
                    width: '100%',
                    maxWidth: '600px',
                    height: '300px',
                    flexDirection: 'column',
                    borderStyle: 'dashed',
                    borderWidth: '2px',
                    borderColor: isDragging ? 'var(--text-primary)' : 'var(--border-color)',
                    boxShadow: isDragging ? 'var(--glow-shadow)' : 'none',
                    cursor: 'pointer',
                    transition: 'all var(--transition-normal)'
                }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
            >
                <div
                    style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1.5rem'
                    }}
                >
                    <UploadCloud size={32} color={isDragging ? 'var(--text-primary)' : 'var(--text-secondary)'} />
                </div>
                <h2 className="heading-2" style={{ marginBottom: '0.5rem' }}>
                    {isDragging ? 'Drop file to analyze' : 'Drag & Drop your CSV/Excel'}
                </h2>
                <p className="text-small">or click to browse from your computer</p>

                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileInput}
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                />
            </div>
        </div>
    );
}
