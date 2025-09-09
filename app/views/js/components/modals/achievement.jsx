import { toast } from "sonner";
import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

import Button from "../form/button";
import { Dialog, DialogContent, useDialog } from "../ui/dialog";
import { Sheet, SheetContent } from "../layout/sheet";
import { achievements } from "@/utils/data";

const AchievementModal = () => {
    const [data, setData] = useState(null);
    const dialog = useDialog("achievement");
    const achievement = usePage().props.achievement;

    useEffect(() => {
        if (achievement) {
            setData(achievements[achievement] || null);
            toast.success("New Achievement Unlocked! 🎉");
            dialog.openDialog();
        }
    }, [achievement]);

    if (!dialog.open) {
        return null;
    }

    return window.innerWidth > 580 ? (
        <Dialog open={dialog.open} onOpenChange={() => dialog.closeDialog()}>
            <DialogContent className="sm:max-w-[425px] hidden sm:block rounded-3xl p-8">
                <AchievementInfo achievement={data} />
            </DialogContent>
        </Dialog>
    ) : (
        <Sheet open={dialog.open} onOpenChange={() => dialog.closeDialog()}>
            <SheetContent
                side="bottom"
                className="w-screen sm:hidden min-h-[70vh] rounded-t-3xl"
            >
                <AchievementInfo achievement={data} />
            </SheetContent>
        </Sheet>
    );
};

const AchievementInfo = ({ achievement }) => {
    return (
        <div className="flex flex-col justify-center items-center py-10">
            <img
                src={achievement.icon}
                alt={achievement.title}
                className="w-32 h-32 mb-4"
            />
            <h2 className="text-2xl font-bold mb-2 text-center">
                {achievement.title}
            </h2>
            <p className="text-center mb-6 text-gray-700 dark:text-gray-300">
                {achievement.description}
            </p>
            <div className="bg-primary-orange/50 p-4 rounded-3xl mb-6 w-full text-center">
                <p className="text-sm text-orange-700 dark:text-orange-300 mb-1">
                    Reward:
                </p>
                <p className="text-sm font-medium">{achievement.reward}</p>
            </div>
            <p className="mb-8 text-center text-xs max-w-2/3 mx-auto">
                Collect more achievements to earn fee reductions and cash
                rewards!
            </p>
            <Button
                onClick={() => {
                    const dialog = useDialog("achievement");
                    dialog.closeDialog();
                }}
            >
                Claim Reward
            </Button>
        </div>
    );
};

export default AchievementModal;
