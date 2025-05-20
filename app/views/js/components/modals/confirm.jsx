import Button from "../form/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, useDialog } from "../ui/dialog";

const ConfirmActionModal = () => {
    const dialog = useDialog("confirmAction");

    console.log("ConfirmActionModal", dialog.open, dialog.data);

    if (!dialog.open) {
        return null;
    }

    return (
        <Dialog
            open={dialog.open}
            onOpenChange={(open) => dialog.closeDialog()}
        >
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{dialog.data.title}</DialogTitle>
                    <DialogDescription>
                        {dialog.data.description}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    {dialog.data.cancelText && (
                        <Button
                            variant="outline"
                            onClick={() => dialog.closeDialog()}
                        >
                            {dialog.data.cancelText}
                        </Button>
                    )}
                    <Button onClick={() => dialog.data.onConfirm()}>
                        {dialog.data.confirmText || "Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ConfirmActionModal;
