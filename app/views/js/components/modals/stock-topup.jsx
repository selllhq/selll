import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
    useDialog,
} from "../ui/dialog";
import Button from "../form/button";

const StockTopUpModal = () => {
    const { open, data, closeDialog } = useDialog("stockTopUp");
    const [quantity, setQuantity] = useState(data?.currentStock || 0);

    useEffect(() => {
        if (open) {
            if (data?.quantity === "unlimited") {
                setQuantity(Infinity);
            } else if (typeof data?.currentStock === "number") {
                setQuantity(data.currentStock);
            }
        }
    }, [open, data?.currentStock, data?.quantity]);

    if (!open) {
        return null;
    }

    const increment = () => setQuantity((q) => (q < Infinity ? q + 1 : 0 + 1));
    const decrement = () => setQuantity((q) => (q === Infinity ? 1 : q > 0 ? q - 1 : 0));

    const handleSave = () => {
        if (typeof data?.onSave === "function") {
            data.onSave(quantity);
        }
    };

    return (
        <Dialog open={open} onOpenChange={closeDialog}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update Stock</DialogTitle>
                    <DialogDescription>
                        Use the plus and minus buttons to update your product's
                        stock. {quantity === Infinity
                            ? "This product has unlimited stock, updating it stock will change it to a specific quantity."
                            : ""}
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center justify-center gap-6 py-6">
                    <Button
                        variant="outline"
                        className="w-10 h-10 text-xl"
                        onClick={decrement}
                        aria-label="Decrease"
                    >
                        -
                    </Button>
                    <span className="text-3xl font-bold w-12 text-center">
                        {quantity === Infinity ? "∞" : quantity}
                    </span>
                    <Button
                        variant="outline"
                        className="w-10 h-10 text-xl"
                        onClick={increment}
                        aria-label="Increase"
                    >
                        +
                    </Button>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                        onClick={handleSave}
                        className="bg-primary-orange text-white"
                    >
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default StockTopUpModal;
