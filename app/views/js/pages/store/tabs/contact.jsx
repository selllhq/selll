import Label from "@/components/form/label";
import Input from "@/components/form/input";
import InputError from "@/components/form/input-error";

const ContactTab = ({ data, setData, errors }) => {
    return (
        <div className="space-y-6">
            <div>
                <Label>Contact Information</Label>
                <div className="mt-4 space-y-4">
                    <div className="space-y-4">
                            <div>
                                <Label
                                    htmlFor="contact_email"
                                    className="text-sm font-medium mb-2"
                                >
                                    Email Address
                                </Label>
                                <Input
                                    id="contact_email"
                                    type="email"
                                    className="block w-full bg-gray-100 dark:bg-[#2C2C2C] border-0 focus:ring-primary-orange/20"
                                    value={data.contact_email}
                                    onChange={(e) =>
                                        setData("contact_email", e.target.value)
                                    }
                                    placeholder="your@email.com"
                                />
                                <InputError message={errors.contact_email} />
                            </div>

                            <div>
                                <Label
                                    htmlFor="contact_phone"
                                    className="text-sm font-medium mb-2"
                                >
                                    Phone Number
                                </Label>
                                <Input
                                    id="contact_phone"
                                    type="tel"
                                    className="block w-full bg-gray-100 dark:bg-[#2C2C2C] border-0 focus:ring-primary-orange/20"
                                    value={data.contact_phone}
                                    onChange={(e) =>
                                        setData("contact_phone", e.target.value)
                                    }
                                    placeholder="+1 (555) 123-4567"
                                />
                                <InputError message={errors.contact_phone} />
                            </div>

                            <div>
                                <Label className="text-sm font-medium mb-2">
                                    Social Media Links
                                </Label>
                                <div className="space-y-3">
                                    <div>
                                        <Label
                                            htmlFor="facebook_url"
                                            className="text-xs text-gray-500 dark:text-gray-400 mb-1"
                                        >
                                            Facebook
                                        </Label>
                                        <Input
                                            id="facebook_url"
                                            type="url"
                                            className="block w-full bg-gray-100 dark:bg-[#2C2C2C] border-0 focus:ring-primary-orange/20"
                                            value={data.facebook_url}
                                            onChange={(e) =>
                                                setData("facebook_url", e.target.value)
                                            }
                                            placeholder="https://facebook.com/yourpage"
                                        />
                                        <InputError message={errors.facebook_url} />
                                    </div>

                                    <div>
                                        <Label
                                            htmlFor="twitter_url"
                                            className="text-xs text-gray-500 dark:text-gray-400 mb-1"
                                        >
                                            Twitter
                                        </Label>
                                        <Input
                                            id="twitter_url"
                                            type="url"
                                            className="block w-full bg-gray-100 dark:bg-[#2C2C2C] border-0 focus:ring-primary-orange/20"
                                            value={data.twitter_url}
                                            onChange={(e) =>
                                                setData("twitter_url", e.target.value)
                                            }
                                            placeholder="https://twitter.com/yourusername"
                                        />
                                        <InputError message={errors.twitter_url} />
                                    </div>

                                    <div>
                                        <Label
                                            htmlFor="instagram_url"
                                            className="text-xs text-gray-500 dark:text-gray-400 mb-1"
                                        >
                                            Instagram
                                        </Label>
                                        <Input
                                            id="instagram_url"
                                            type="url"
                                            className="block w-full bg-gray-100 dark:bg-[#2C2C2C] border-0 focus:ring-primary-orange/20"
                                            value={data.instagram_url}
                                            onChange={(e) =>
                                                setData("instagram_url", e.target.value)
                                            }
                                            placeholder="https://instagram.com/yourusername"
                                        />
                                        <InputError message={errors.instagram_url} />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <Label
                                    htmlFor="contact_address"
                                    className="text-sm font-medium mb-2"
                                >
                                    Address (Optional)
                                </Label>
                                <textarea
                                    id="contact_address"
                                    className="block w-full bg-gray-100 dark:bg-[#2C2C2C] border-0 focus:ring-primary-orange/20 rounded-lg"
                                    value={data.contact_address}
                                    onChange={(e) =>
                                        setData("contact_address", e.target.value)
                                    }
                                    placeholder="Your business address"
                                    rows={3}
                                />
                                <InputError message={errors.contact_address} />
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactTab;
