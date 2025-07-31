import { Link } from "@inertiajs/react";
import { MailCheckIcon } from "lucide-react";
import Button from "../form/button";

export default function SignUpMiniForm({ auth }) {
    return auth.user ? (
        <Button as={Link} href="/dashboard" className="my-10">
            Back to Dashboard
        </Button>
    ) : (
        <form
            className="my-16 rounded-full p-[6px] max-w-[508px] bg-background w-full border border-gray500 flex items-center"
            method="get"
            action="/auth/register"
        >
            <div className="flex items-center h-full flex-1 px-3 gap-3">
                <label
                    htmlFor="email"
                    className="size-4 grid place-content-center"
                >
                    <MailCheckIcon className="text-gray-400 dark:text-gray-500 size-4" />
                </label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    className="flex-1 placeholder:text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 text-black dark:text-gray-300 h-full border-none outline-none text-lg"
                    placeholder="Enter email to claim your free store"
                />
            </div>
            <Button className="p-4 font-medium rounded-full active:scale-95 transition-all duration-150 ease-in-out border-none bg-primary-red hover:bg-primary-red/80 text-white flex-shrink-0">
                Start Selling
            </Button>
        </form>
    );
}
