import { toast } from "sonner";
import { useState } from "react";
import { Link } from "@inertiajs/react";
import { ArrowRight } from "lucide-react";

import Button from "../form/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "../layout/sheet";
import Input from "../form/input";
import { cn } from "@/utils";

const ShareStore = ({ store, onShare, linkShared }) => {
    const [show, setShow] = useState(false);

    return (
        <>
            <Button
                className={cn(
                    "mt-4",
                    linkShared
                        ? "bg-white/10 text-white"
                        : "bg-black/5 dark:bg-white/5 text-black dark:text-white hover:text-white dark:hover:!text-black",
                )}
                onClick={() => setShow(true)}
            >
                Share link <ArrowRight size={16} />
            </Button>

            {window.innerWidth > 580 ? (
                <Dialog open={show} onOpenChange={() => setShow(false)}>
                    <DialogContent className="sm:max-w-[425px] hidden sm:block rounded-3xl p-8">
                        <DialogHeader>
                            <DialogTitle>Share Your Store</DialogTitle>
                            <DialogDescription>
                                Share your store link on social media, your page
                                description and stories to connect with your
                                customers.
                            </DialogDescription>
                        </DialogHeader>
                        <ShareStoreInfo
                            onShare={() => {
                                onShare?.();
                                setShow(false);
                            }}
                            store={store}
                        />
                    </DialogContent>
                </Dialog>
            ) : (
                <Sheet open={show} onOpenChange={() => setShow(false)}>
                    <SheetContent
                        side="bottom"
                        className="w-screen sm:hidden min-h-[90vh] rounded-t-3xl"
                    >
                        <SheetHeader>
                            <SheetTitle>Share Your Store</SheetTitle>
                            <SheetDescription>
                                Let users know your store is live by sharing
                                your store link.
                            </SheetDescription>
                        </SheetHeader>
                        <ShareStoreInfo
                            onShare={() => {
                                onShare?.();
                                setShow(false);
                            }}
                            store={store}
                        />
                    </SheetContent>
                </Sheet>
            )}
        </>
    );
};

const ShareStoreInfo = ({ store, onShare }) => {
    return (
        <div>
            <div className="mt-6 space-y-4">
                <div className="bg-gray-100 dark:bg-[#1C1C1C] rounded-lg p-4">
                    <div className="flex space-x-2">
                        <Input
                            id="store-link"
                            type="text"
                            value={`https://${store.slug}.selll.store`}
                            readOnly
                            className="bg-gray-100 dark:bg-[#1C1C1C] border-0 focus:ring-0 focus:ring-offset-0"
                        />
                        <Button
                            variant="outline"
                            onClick={() => {
                                navigator.clipboard.writeText(
                                    `https://${store.slug}.selll.store`,
                                );
                                toast.success(
                                    "Store link copied to clipboard!",
                                );
                                onShare?.();
                            }}
                        >
                            Copy
                        </Button>
                    </div>
                </div>
                <Button as={Link} href="/store/brand" variant="outline">
                    Generate Brand Graphics
                </Button>

                <p className="text-xs text-gray-500">
                    Pro Tip: Add your store link to your social media bios and
                    website to drive more traffic to your store.
                </p>
            </div>
        </div>
    );
};

export default ShareStore;
