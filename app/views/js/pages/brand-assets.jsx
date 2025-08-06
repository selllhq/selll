import { Head } from "@inertiajs/react";
import { Download, Copy, CheckCircle2 } from "lucide-react";
import Layout from "@/layouts/app-layout";
import Button from "@/components/form/button";
import { useState } from "react";
import { Card } from "@/components/shared/card";
import { slugify } from "@/utils";

const BrandAssets = ({ currentStore }) => {
    const [copied, setCopied] = useState(null);

    const handleCopy = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };

    const handleDownload = async (svg, filename) => {
        const qrUrlMatch = svg.match(/<image[^>]+href="([^"]+)"/);
        const qrUrl = qrUrlMatch?.[1];

        let updatedSvg = svg;

        if (qrUrl) {
            try {
                const response = await fetch(qrUrl);
                const blob = await response.blob();

                const base64 = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.onerror = reject;
                    reader.readAsDataURL(blob);
                });

                // Replace the image href in the SVG with the base64-encoded image
                updatedSvg = svg.replace(qrUrl, base64);
            } catch (err) {
                console.error("Failed to inline QR code image", err);
                // You can decide to return early here if it's critical
            }
        } else {
            console.warn("No QR code image URL found in SVG.");
        }

        // Now proceed with your original logic using `updatedSvg`
        const svgBlob = new Blob([updatedSvg], { type: "image/svg+xml" });
        const url = URL.createObjectURL(svgBlob);

        const img = new Image();

        img.onload = () => {
            console.log("Image loaded from SVG");
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            canvas.toBlob((blob) => {
                const pngUrl = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = pngUrl;
                link.download = `${filename}.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(pngUrl);
                URL.revokeObjectURL(url);
            }, "image/png");
        };

        img.onerror = (e) => {
            console.error("Image failed to load", e);
            console.log("SVG content:", updatedSvg);
            console.log("Blob URL:", url);
        };

        img.src = url;
    };

    const storeName = currentStore?.name || "Your Store";
    const storeUrl = `https://${currentStore?.slug}.selll.store`;

    const brandAssets = [
        // {
        //     id: "instagram-story",
        //     title: "Instagram Story",
        //     description:
        //         "Perfect for your Instagram stories to let customers know you're on Selll",
        //     svg: `
        //         <svg width="360" height="640" viewBox="0 0 360 640" fill="none" xmlns="http://www.w3.org/2000/svg">
        //             <rect width="360" height="640" class="fill-primary-orange" />
        //             <rect x="30" y="30" width="300" height="580" rx="16" fill="white" stroke="#E2E8F0" stroke-width="2"/>
        //             <rect x="60" y="60" width="240" height="360" rx="12" fill="#000"/>
        //             <text x="50%" y="460" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" font-weight="600" fill="#0F172A">${storeName}</text>
        //             <text x="50%" y="500" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#64748B">Shop now on Selll</text>
        //             <text x="50%" y="540" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#3B82F6" font-weight="500">${storeUrl}</text>
        //         </svg>
        //     `,
        // },
        // {
        //     id: "twitter-header",
        //     title: "Twitter Header",
        //     description:
        //         "Great for your Twitter header to drive traffic to your store",
        //     svg: `
        //         <svg width="800" height="200" viewBox="0 0 800 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        //             <rect width="800" height="200" class="fill-primary-orange" />
        //             <rect x="40" y="20" width="720" height="160" rx="8" fill="white" stroke="#E2E8F0" stroke-width="2"/>
        //             <rect x="80" y="40" width="640" height="80" rx="4" fill="#000"/>
        //             <text x="50%" y="140" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="600" fill="#0F172A">${storeName} is now on Selll</text>
        //             <text x="50%" y="170" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#3B82F6" font-weight="500">${storeUrl}</text>
        //         </svg>
        //     `,
        // },
        // {
        //     id: "website-banner",
        //     title: "Website Banner",
        //     description: "Add this banner to your website or blog",
        //     svg: `
        //         <svg width="800" height="120" viewBox="0 0 800 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        //             <rect width="800" height="120" class="fill-primary-orange" />
        //             <rect x="40" y="20" width="720" height="80" rx="8" fill="white" stroke="#E2E8F0" stroke-width="2"/>
        //             <rect x="60" y="40" width="60" height="40" rx="4" fill="#000"/>
        //             <text x="140" y="70" font-family="Arial, sans-serif" font-size="16" fill="#0F172A">Shop ${storeName} on </text>
        //             <text x="240" y="70" font-family="Arial, sans-serif" font-size="16" font-weight="600" fill="#3B82F6">Selll</text>
        //             <text x="280" y="70" font-family="Arial, sans-serif" font-size="16" fill="#0F172A"> - Browse our full collection at </text>
        //             <text x="600" y="70" font-family="Arial, sans-serif" font-size="16" font-weight="500" fill="#3B82F6">${storeUrl}</text>
        //         </svg>
        //     `,
        // },
        {
            id: "qr-code",
            title: "Your Store QR Code",
            description: "Scan this QR code to visit your store",
            // geneare qr code using https://api.qrserver.com/v1/create-qr-code/?size=750x750&data=https://leafphp.selll.store
            svg: `
                <svg xmlns="http://www.w3.org/2000/svg" width="750" height="750" viewBox="0 0 750 750">
                    <rect width="750" height="750" fill="#141414"/>
                    <rect x="50" y="50" width="650" height="650" fill="#fff" rx="16"/>
                    <rect x="100" y="100" width="550" height="550" fill="#000"/>
                    <text x="50%" y="400" text-anchor="middle" font-family="Arial, sans-serif" font-size="48" font-weight="600" fill="#fff">
                        ${storeName}
                    </text>
                    <text x="50%" y="460" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" fill="#fff">
                        Scan to visit
                    </text>
                    <text x="50%" y="500" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" fill="#3B82F6" font-weight="500">
                        ${storeUrl}
                    </text>
                    <image href="https://api.qrserver.com/v1/create-qr-code/?size=650x650&data=${encodeURIComponent(storeUrl)}" x="100" y="100" width="550" height="550" />
                </svg>
            `,
        },
        {
            id: `${slugify(storeName)}-announcement`,
            title: "Selll Announcement",
            description:
                "Let customers know about your store",
            svg: `
                <svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080" style="background-color: #141414; fill: #fff;" viewBox="0 0 1080 1080">
                    <style>
                        @font-face {
                            font-family: 'Bricolage';
                            font-style: normal;
                            font-weight: 400;
                            src: url(data:font/woff2;base64,{{FONT_400}}) format('woff2');
                        }

                        @font-face {
                            font-family: 'Bricolage';
                            font-style: normal;
                            font-weight: 500;
                            src: url(data:font/woff2;base64,{{FONT_500}}) format('woff2');
                        }

                        @font-face {
                            font-family: 'Bricolage';
                            font-style: normal;
                            font-weight: 700;
                            src: url(data:font/woff2;base64,{{FONT_700}}) format('woff2');
                        }

                        text, tspan {
                            font-family: 'Bricolage', sans-serif;
                        }
                    </style>

                    <text font-size="25" x="100" y="130" font-weight="400">A special announcement</text>
                    <text data-text-group="" font-size="90" y="160" font-weight="500">
                        <tspan x="100" dy="1.2em">You can order from</tspan>
                            <tspan x="100" dy="1.2em">
                            <tspan fill="#ffaa49">${storeName}</tspan>
                        </tspan>
                        <tspan x="100" dy="1.2em">directly on our</tspan>
                        <tspan x="100" dy="1.2em">website!</tspan>
                    </text>
                    <text font-size="25" y="780" font-weight="400">
                        <tspan x="100" dy="1.6em" fill="#ffaa49">${storeUrl}</tspan>
                        <tspan x="100" dy="1.6em">Pay with card, bank, mobile money, and more!</tspan>
                    </text>
                    <line x1="100" y1="900" x2="750" y2="900" style="stroke:#fff;stroke-width:0.3" />
                    <g transform="scale(0.1) translate(1000, 9500)">
                        <g>
                            <path d="M31.407,33.541c-0.947,-1.617 -1.657,-3.378 -2.103,-5.216c-2.288,-9.418 2.836,-18.869 11.35,-20.937c0.004,-0.001 0.009,-0.002 0.014,-0.003l28.712,-6.974c6.674,-1.628 13.795,1.681 17.6,8.178l92.914,159.236c0.947,1.617 1.657,3.378 2.103,5.216c2.288,9.418 -2.836,18.869 -11.35,20.937c-0.004,0.001 -0.009,0.002 -0.014,0.004l-28.712,6.973c-6.674,1.628 -13.795,-1.681 -17.6,-8.178l-92.914,-159.236Zm-28.758,116.067c-0.947,-1.617 -1.657,-3.378 -2.104,-5.216c-2.287,-9.418 2.837,-18.869 11.351,-20.937c0.004,-0.001 0.009,-0.002 0.014,-0.003l28.712,-6.974c6.674,-1.628 13.795,1.681 17.6,8.178l92.914,159.236c0.947,1.617 1.657,3.378 2.103,5.216c2.288,9.418 -2.836,18.869 -11.35,20.937c-0.005,0.001 -0.009,0.002 -0.014,0.003l-28.712,6.974c-6.674,1.628 -13.795,-1.681 -17.6,-8.178l-92.914,-159.236Z" style="fill:url(#_Radial1);" />
                            <text x="242.582px" y="311.993px" style="font-weight:700;font-size:428.545px;fill:#fff;">Selll</text>
                        </g>
                        <defs>
                            <radialGradient id="_Radial1" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(2.97119,181.081,89.2085,2.76958,46.0487,187.881)">
                                <stop offset="0" stop-color="#ec504b"/>
                                <stop offset="0.53" stop-color="#f0654b"/>
                                <stop offset="1" stop-color="#ffaa49"/>
                            </radialGradient>
                        </defs>
                    </g>
                </svg>
            `,
        },
    ];

    return (
        <Layout breadcrumbs={[]} variant="header">
            <Head title={`Brand Assets - ${currentStore?.name}`} />

            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Brand Assets</h1>
                    <p className="text-muted-foreground max-w-lg">
                        Download and share these assets to let your customers
                        know you're on Selll. Customize them with your store
                        name and link.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    {brandAssets.map((asset) => (
                        <Card key={asset.id} className="overflow-hidden rounded-3xl p-0">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="w-2/3">
                                        <h3 className="text-lg font-semibold">
                                            {asset.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {asset.description}
                                        </p>
                                    </div>

                                    <Button
                                        variant="default"
                                        size="sm"
                                        onClick={() =>
                                            handleDownload(
                                                asset.svg,
                                                `selll-${asset.id}`,
                                            )
                                        }
                                        className="flex items-center gap-1"
                                    >
                                        <Download className="w-4 h-4" />
                                        Download
                                    </Button>
                                </div>
                                <div
                                    className="border rounded-lg p-4 bg-gray-50 flex justify-center items-center max-h-[350px] overflow-hidden"
                                    dangerouslySetInnerHTML={{
                                        __html: asset.svg,
                                    }}
                                />
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="mt-8 p-6 rounded-lg">
                    <h3 className="font-medium text-lg mb-2">
                        How to use these assets
                    </h3>
                    <ol className="list-decimal list-inside space-y-2 text-muted-foreground text-sm">
                        <li>Download the asset that fits your needs</li>
                        <li>Share it on your social media profiles</li>
                        <li>Add it to your website or email signature</li>
                        <li>
                            Let your customers know they can shop directly from
                            your Selll store
                        </li>
                    </ol>
                </div>
            </div>
        </Layout>
    );
};

export default BrandAssets;
