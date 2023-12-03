import { Poline } from 'poline'
import React, { useState } from 'react'
import styles from './BlobStack.module.scss'
import { Blob } from '@/components/ui'

const BlobStack = () => {
    const [poline, setPoline] = useState(new Poline())
    
    return (
        <div className={styles.blobs} onClick={() => setPoline(new Poline())}>
            <Blob colors={poline} blurStrength={8} points={4} viewSize={400}/>
            <Blob colors={poline} radius={110} points={8} amplitude={20} viewSize={400} />
            <Blob colors={poline} radius={60} amplitude={12} blurStrength={1} viewSize={400}/>
        </div>
    )
}

export default BlobStack