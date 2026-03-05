import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useState } from 'react'
import MyDropzone from './DropZone'

export default function Clients() {
    const [images, setImages] = useState<File[]>([])
    return (
        <Card>
            <CardHeader>
                <CardTitle>Clients</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                <MyDropzone setImages={setImages} />
            </CardContent>
        </Card>
    )
}

