import { X } from "lucide-react";

const PreviewImage = ({ image, alt, onRemove }) => {
    if (image instanceof Blob || image instanceof File) {
        image = URL.createObjectURL(image);
    }

    return (
        <div className="aspect-square rounded-3xl bg-gray-100 dark:bg-[#2C2C2C] relative overflow-hidden">
            <img src={image} alt={alt} className="w-full h-full object-cover" />
            <button
                type="button"
                onClick={onRemove}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
            >
                <X className="h-4 w-4 text-white" />
            </button>
        </div>
    );
};

export default PreviewImage;
