'use client'

import { toast } from 'sonner';
import { useState } from 'react'
import {
    ImageCrop,
    ImageCropApply,
    ImageCropContent,
    ImageCropReset,
} from '@/components/ui/shadcn-io/image-crop'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { XIcon, Loader2 } from 'lucide-react'
import Image from 'next/image'

/**
 * Helper function to convert a Base64 Data URI string to a Blob object.
 * @param {string} dataURI The Base64 string (e.g., "data:image/png;base64,...")
 * @returns {Blob} The resulting Blob object.
 */
function dataURItoBlob(dataURI) {
    // Split the Base64 string in data and metadata
    const splitDataURI = dataURI.split(',');
    const mimeString = splitDataURI[0].match(/:(.*?);/)[1];
    const base64 = splitDataURI[1];

    // Decode Base64 string
    const byteString = atob(base64);

    // Create a Blob
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
}

/**
 * Renders a circular image crop component that uploads the result to a backend API.
 * @param {{ value: string, onChange: (url: string | null) => void }} props
 */
export function CircularImageCrop({ value, onChange }) {
    const [selectedFile, setSelectedFile] = useState(null)
    // The cropped result might be a Base64 string or a Blob/File, depending on the environment.
    const [croppedImageOutput, setCroppedImageOutput] = useState(null)
    const [uploadedUrl, setUploadedUrl] = useState(value || null)
    const [isUploading, setIsUploading] = useState(false)

    // Determine the display URL: final uploaded URL, or temporary URL for the newly cropped data
    const displayUrl = uploadedUrl
        ? uploadedUrl
        : (croppedImageOutput && typeof croppedImageOutput === 'string'
            ? croppedImageOutput // Base64 string can be used directly as src
            : (croppedImageOutput instanceof Blob || croppedImageOutput instanceof File
                ? URL.createObjectURL(croppedImageOutput) // Blob needs temporary URL
                : null
            )
        )

    const handleFileChange = (event) => {
        const file = event.target.files?.[0]
        if (file) {
            setSelectedFile(file)
            setCroppedImageOutput(null)
            setUploadedUrl(null)
            onChange(null) // Clear parent state when new file is selected
        }
    }

    const handleReset = () => {
        setSelectedFile(null)
        setCroppedImageOutput(null)
        setUploadedUrl(null)
        onChange(null) // Clear parent state
    }

    /**
     * Uploads the cropped image (Base64 string, Blob, or File) to the server API route.
     * @param {string | File | Blob} output The cropped image data
     */
    async function uploadImage(output) {
        if (!output) return null;

        let fileToUpload = output;

        // 1. Convert Base64 string to Blob if necessary
        if (typeof output === 'string' && output.startsWith('data:')) {
            try {
                fileToUpload = dataURItoBlob(output);
            } catch (e) {
                console.error('Base64 to Blob conversion failed:', e);
                toast.error('Crop error: Failed to process image data.');
                return null;
            }
        }

        // Final safety check to ensure we have a valid Blob/File
        if (!(fileToUpload instanceof Blob) && !(fileToUpload instanceof File)) {
            console.error('Upload Failed: Final data is not a valid Blob or File object.', fileToUpload);
            toast.error('Crop error: Cannot upload invalid image data.');
            return null;
        }

        try {
            setIsUploading(true);

            // 2. Prepare FormData with the correct Blob/File object
            const formData = new FormData();
            // Use the determined MIME type from the Blob for the file extension (optional but good practice)
            const extension = fileToUpload.type.split('/')[1] || 'png';
            formData.append('file', fileToUpload, `profile_image.${extension}`);

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({ message: 'Unknown server error.' }));
                throw new Error(errorData.message || 'Server upload failed.');
            }

            const data = await res.json();
            const url = data.url;

            setUploadedUrl(url);
            onChange(url); // Notify parent component of the new URL
            toast.success('Image uploaded to Cloudinary!');

        } catch (err) {
            console.error('Upload failed:', err);
            toast.error(err.message || 'Could not upload image.');
            setUploadedUrl(null);
            onChange(null); // Clear URL on failure

        } finally {
            setIsUploading(false);
        }
    }

    const handleCrop = async (cropped) => {
        // 'cropped' is the output from the shadcn-io/image-crop component (often a Base64 string in some envs)
        setCroppedImageOutput(cropped)
        await uploadImage(cropped)
    }

    // --- RENDER LOGIC ---

    // 1. Initial State: Show file input
    if (!selectedFile && !uploadedUrl) {
        return (
            <Input
                accept="image/*"
                className="w-fit"
                onChange={handleFileChange}
                type="file"
            />
        )
    }

    // 2. Cropped/Uploaded State: Show image and reset button
    if (uploadedUrl || croppedImageOutput) {
        // We only use revokeObjectURL if we created one (i.e., if croppedImageOutput was a Blob/File)
        const revokeTempUrl = croppedImageOutput instanceof Blob || croppedImageOutput instanceof File;

        return (
            <div className="flex flex-col items-center gap-4">
                {isUploading && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Loader2 className="size-4 animate-spin" />
                        <span>Uploading...</span>
                    </div>
                )}
                <Image
                    alt="Cropped profile picture"
                    className="overflow-hidden rounded-full border-2 border-indigo-500 shadow-lg"
                    height={100}
                    width={100}
                    src={displayUrl}
                    unoptimized
                    onLoad={() => {
                        // Clean up temporary blob URL after image loads if it was a Blob
                        if (revokeTempUrl) {
                            URL.revokeObjectURL(displayUrl);
                        }
                    }}
                />
                <Button
                    onClick={handleReset}
                    size="sm"
                    type="button"
                    variant="destructive"
                    className="flex items-center gap-1"
                >
                    <XIcon className="size-4" />
                    Reset Image
                </Button>
            </div>
        )
    }

    // 3. Cropping State: Show the cropper UI
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium">Crop Your Image</h3>
            <ImageCrop
                aspect={1}
                circularCrop
                file={selectedFile}
                maxImageSize={1024 * 1024 * 5} // 5MB limit
                onCrop={handleCrop}
            >
                <ImageCropContent className="max-w-md bg-gray-50 border rounded-lg" />
                <div className="flex items-center gap-2 mt-4">
                    <ImageCropApply type="button" className="bg-indigo-600 hover:bg-indigo-700 text-white" />
                    <ImageCropReset type="button" variant="outline" />
                    <Button
                        onClick={handleReset}
                        size="icon"
                        type="button"
                        variant="ghost"
                        className="ml-auto"
                    >
                        <XIcon className="size-4" />
                    </Button>
                </div>
            </ImageCrop>
        </div>
    )
}
