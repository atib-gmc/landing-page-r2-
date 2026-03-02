import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface SelectOptionProps {
    items: { id: string | number; name: string }[]; // Data yang dipassing
    setSelected: (value: string) => void;           // Fungsi setter
    placeholder?: string;                           // Teks default
    showAll?: boolean;                              // Mau ada opsi "All" atau tidak?
}

export default function SelectOption({
    items,
    setSelected,
    placeholder = "Select an option",
    showAll = true
}: SelectOptionProps) {
    return (
        <Select onValueChange={(val) => setSelected(val)}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {/* Hanya tampil jika showAll true */}
                    {showAll && <SelectItem value="all">All</SelectItem>}

                    {items?.map((item) => (
                        <SelectItem key={item.id} value={item.id.toString()}>
                            {item.name}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}