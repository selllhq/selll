import Button from "@/components/form/button";
import { Link } from "@inertiajs/react";
import { Plus } from "lucide-react";

const EmptyState = ({ title, description, button }) => (
    <div className="text-center">
        <div class="mx-auto flex w-full flex-col items-center justify-center text-center py-20">
            <div class="relative mb-8">
                <img
                    className="dark:hidden"
                    src="/assets/img/dashboard/empty-light.svg"
                    alt="create"
                    aria-hidden="true"
                    height="242"
                />
                <img
                    className="hidden dark:block"
                    src="/assets/img/dashboard/empty-dark.svg"
                    alt="create"
                    aria-hidden="true"
                    height="242"
                />
            </div>
            <h3 class="font-medium text-xl xl:text-4xl">{title}</h3>
            <p class="mt-2 text-default">{description}</p>
            {button && (
                <Button
                    as={Link}
                    href={button.href}
                    className="mt-8 bg-primary-red hover:bg-primary-red/80 text-white"
                >
                    <Plus size={16} />
                    <span>{button.text}</span>
                </Button>
            )}
        </div>
    </div>
);

export default EmptyState;
