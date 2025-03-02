"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import docs from "./docs.json";

type DocItem = {
    id: number;
    name: string;
    content: string;
    folder?: string;
};

export default function DocsViewerSearch({ setIsSearchOpen, modalRef }: { modalRef: any, setIsSearchOpen: any }) {
    const [search, setSearch] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const listRef = useRef<HTMLUListElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const filteredDocs = docs.files.filter(
        (doc: DocItem) =>
            doc.name.toLowerCase().includes(search.toLowerCase()) ||
            doc.content.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        setSelectedIndex(0);
    }, [search]);

    useEffect(() => {
        setTimeout(() => inputRef.current?.focus(), 100);
    }, []);

    useEffect(() => {
        // document.addEventListener('keydown', handleKeyDown)
        if (listRef.current && filteredDocs.length > 0) {
            const activeItem = listRef.current.children[selectedIndex] as HTMLLIElement;
            if (activeItem) {
                activeItem.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }
        }
    }, [filteredDocs.length, selectedIndex]);

    const router = useRouter();

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown") {
            setSelectedIndex((prev) => Math.min(prev + 1, filteredDocs.length - 1));
        } else if (e.key === "ArrowUp") {
            setSelectedIndex((prev) => Math.max(prev - 1, 0));
        } else if (e.key === "Enter") {
            router.push(`/${filteredDocs[selectedIndex]?.path}`)
            setIsSearchOpen(false);
        }
        else if (e.key === "Escape") {
            setIsSearchOpen(false);
        }
    };

    return (
        <div className="fixed left-0 top-0 pt-20 w-full h-full bg-black bg-opacity-50 z-50">
            <div ref={modalRef} className="max-w-md mx-auto max-h-[80vh] overflow-auto bg-white dark:bg-gray-800 rounded-md border drop-shadow-lg">
                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 px-4 pt-4 mb-2">
                    📄 Documentation
                </h2>

                {/* Search Bar */}
                <div className="sticky top-0 py-2 bg-white dark:bg-gray-800 z-50 px-4 border-b">
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search..."
                        className="input input-sm h-12 input-bordered w-full rounded-md focus"
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>

                {/* Document List */}
                <ul ref={listRef} className="mt-2 space-y-1 px-4 pb-4 overflow-y-auto">
                    {filteredDocs.map((doc, index) => {
                        const folderPath = doc.folder?.split("/");
                        return (
                            <li key={doc.id}>
                                <div
                                    className={`w-full text-left px-3 py-2 rounded-md border drop-shadow-sm flex flex-col transition-all duration-200 ${index === selectedIndex
                                        ? "bg-primary text-white"
                                        : "hover:bg-primary hover:text-white"
                                        }`}
                                    onClick={() => {
                                        router.push(`/${doc?.path}`);
                                        setIsSearchOpen(false);
                                    }}
                                >
                                    <span>{doc.name}</span>
                                    <p className="flex items-center text-xs">
                                        {folderPath?.map((r, i) => (
                                            <React.Fragment key={i}>
                                                <span>{r}</span>
                                                {i !== folderPath.length - 1 && <IoIosArrowForward />}
                                            </React.Fragment>
                                        ))}
                                    </p>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
