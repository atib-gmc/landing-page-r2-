import React, { useState, KeyboardEvent, ChangeEvent, Dispatch } from 'react';

const TagsInput = ({ id, setTags, tags }: { id: string, setTags: Dispatch<any>, tags: string[] }) => {
    const [inputValue, setInputValue] = useState("");

    console.log(tags)
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Jika karakter terakhir yang diketik adalah koma
        if (value.endsWith(',')) {
            // Ambil teks sebelum koma dan bersihkan spasi
            const newTag = value.slice(0, -1).trim();

            // Tambahkan ke array jika tidak kosong dan belum ada (mencegah duplikat)
            if (newTag && !tags.includes(newTag)) {
                setTags([...tags, newTag]);
            }

            // Reset input teks
            setInputValue("");
        } else {
            setInputValue(value);
        }
    };


    const removeTag = (indexToRemove: number) => {
        setTags(tags.filter((_, index) => index !== indexToRemove));
    };

    // Opsional: Tekan "Enter" juga menambah tag
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const newTag = inputValue.trim();
            if (newTag && !tags.includes(newTag)) {
                setTags([...tags, newTag]);
                setInputValue("");
            }
        }
        if (e.key === "Backspace") {
            let newTag = [...tags]
            newTag.pop()
            setTags(newTag)
        }
    };

    return (
        <div className="flex flex-col gap-3 w-full max-w-md">
            <label className="text-sm font-medium text-gray-700">Project Tags</label>

            <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-gray-500 bg-white">
                {/* Render daftar tag yang sudah ada */}
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className="flex items-center gap-1 bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-sm border border-gray-200"
                    >
                        #{tag}
                        <button
                            onClick={() => removeTag(index)}
                            className="hover:text-red-500 font-bold ml-1"
                        >
                            ×
                        </button>
                    </span>
                ))}

                {/* Input teks */}
                <input
                    id={id}
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Type tag and press comma..."
                    className="flex-1 outline-none text-sm min-w-[120px] text-black"
                />
            </div>

            <p className="text-xs text-gray-400 italic">Tip: Type a comma (,) or press Enter to add a tag.</p>
        </div>
    );
};

export default TagsInput;