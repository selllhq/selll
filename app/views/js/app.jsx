import '../css/app.css';

import dayjs from 'dayjs';
import { createStore } from '@hanabira/store';
import relativeTime from 'dayjs/plugin/relativeTime';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from '@leafphp/vite-plugin/inertia-helpers';

import { initializeTheme } from './utils/app-mode';
import { Toaster } from './components/ui/sonner';
import { TooltipProvider } from "./components/ui/tooltip";
import ConfirmActionModal from './components/modals/confirm';

const appName = import.meta.env.VITE_APP_NAME || 'Selll';

dayjs.extend(relativeTime);

createStore({
    compareState: true,
    state: {
        "confirmActionOpen": false,
    }
});

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.jsx`,
            import.meta.glob("./pages/**/*.jsx"),
        ),
    setup({ el, App, props }) {
        createRoot(el).render(
            <TooltipProvider>
                <App {...props} />
                <Toaster />
                <ConfirmActionModal />
            </TooltipProvider>,
        );
    },
    progress: {
        color: "#ec504b",
    },
});

// This will set light / dark mode on page load...
initializeTheme();
