import {useCallback} from "react";
import {useDropzone} from "react-dropzone";

interface FileUploaderProps {
    onFileSelect?: (file: File) => void;
}

const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
};

export default function FileUploader({ onFileSelect } : FileUploaderProps) {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0] || null;
        if (file) {
            onFileSelect?.(file);
        }
    }, [onFileSelect]);

    const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf']
        },
        maxSize: 20 * 1024 * 1024,
        maxFiles: 1
    });

    const file = acceptedFiles[0] || null;

    return (
        <div className="w-full gradient-border">
            <div {...getRootProps()} className={`p-8 text-center ${isDragActive ? 'bg-blue-50' : ''}`}>
                <input {...getInputProps()} />
                <div className="space-y-4 cursor-pointer">
                    <div className="mx-auto w-16 h-16 flex items-center justify-center">
                        <img src="/icons/info.svg" alt="upload" className="size-20" />
                    </div>

                    {file ? (
                        <div className="flex flex-col items-center gap-2">
                            <div className="flex items-center gap-2">
                                <img src="/icons/check.svg" alt="file" className="w-6 h-6" />
                                <span className="text-gray-700 font-medium">{file.name}</span>
                            </div>
                            <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                            <p className="text-sm text-green-600">File ready for upload</p>
                        </div>
                    ) : (
                        <div>
                            <p className="text-lg text-gray-500">
                                {isDragActive ? (
                                    <span className="font-semibold text-blue-600">Drop your PDF here</span>
                                ) : (
                                    <>
                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                    </>
                                )}
                            </p>
                            <p className="text-lg text-gray-500">PDF (max 20 MB)</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
