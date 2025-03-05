import { Link, Head, useForm } from "@inertiajs/react";
import { ArrowRight, X } from "lucide-react";
import { slugify } from "@/utils";
import Button from "@/components/form/button";
import InputError from "@/components/form/input-error";
import Input from "@/components/form/input";
import Label from "@/components/form/label";

const Setup = ({ auth }) => {
    const { data, setData, post, errors, processing } = useForm({
        name: `${auth.user.name}'s Store`,
        identifier: slugify(auth.user.name),
        description: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post("/store/new");
    };

    return (
        <>
            <Head title="Create your new store" />

            <div className="flex flex-col justify-center items-center h-screen w-screen relative">
                <Button
                    as={Link}
                    href="/dashboard"
                    className="cursor-pointer absolute top-5 md:top-12 right-5 md:right-12 bg-gray-100 hover:bg-gray-200 dark:bg-gray-400 dark:hover:bg-gray-500 p-2 rounded-full"
                >
                    <X className="md:size-6 text-black" />
                </Button>

                <h2 className="text-2xl md:text-4xl mb-2">
                    Let’s Get You Selling in 2 minutes!
                </h2>
                <p>We'll take a few details to create your store.</p>

                <div className="w-full mt-12 max-w-xl min-w-0 rounded-3xl bg-default/60 p-2 shadow-xs backdrop-blur-sm bg-primary-red/10 dark:bg-white/60">
                    <form
                        onSubmit={submit}
                        className="space-y-6 w-full rounded-2xl p-10 bg-background"
                    >
                        <div className="grid gap-2">
                            <Label htmlFor="name">Store Name</Label>

                            <Input
                                id="name"
                                className="block w-full"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                                placeholder="My Super Store"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.name}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="identifier">Store URL</Label>

                            <div class="relative">
                                <Input
                                    id="identifier"
                                    className="block w-full"
                                    value={data.identifier}
                                    onChange={(e) =>
                                        setData(
                                            "identifier",
                                            slugify(e.target.value),
                                        )
                                    }
                                    required
                                    placeholder="myshopurl"
                                />
                                {/* cheating a bit hehe */}
                                <div class="absolute top-0 right-0 px-4 h-full inline-flex items-center min-w-fit rounded-e-lg border border-gray-200 bg-gray-50 dark:bg-neutral-700 dark:border-neutral-600">
                                    <span class="text-sm text-gray-500 dark:text-white">
                                        .selll.store
                                    </span>
                                </div>
                            </div>

                            <InputError
                                className="mt-2"
                                message={errors.identifier}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Tell your users a bit about what you sell</Label>

                            <Input
                                id="description"
                                as="textarea"
                                className="block w-full min-h-20"
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                required
                                placeholder="My Super Store does X, Y, and Z."
                            />

                            <InputError
                                className="mt-2"
                                message={errors.description}
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <Button
                                className="bg-primary-red hover:bg-primary-red/80 text-white"
                                disabled={processing}
                            >
                                Create store <ArrowRight size={16} />
                            </Button>

                            {/* <Transition
                                            show={recentlySuccessful}
                                            enter="transition ease-in-out"
                                            enterFrom="opacity-0"
                                            leave="transition ease-in-out"
                                            leaveTo="opacity-0"
                                        >
                                            <p className="text-sm text-neutral-600">Saved</p>
                                        </Transition> */}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Setup;
