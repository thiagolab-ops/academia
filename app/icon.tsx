import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 512, height: 512 };
export const contentType = 'image/png';

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 300,
                    background: '#050505',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#00ff9d',
                    borderRadius: '20%',
                    border: '10px solid #00ff9d',
                }}
            >
                ⚡
            </div>
        ),
        { ...size }
    );
}
