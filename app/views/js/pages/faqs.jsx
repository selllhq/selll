import { Link, Head } from '@inertiajs/react';

const Faqs = ({ auth }) => {
    return (
        <>
            <Head title="Faqs" />
            <div>
                <h1>Faqs - React</h1>
                <p>Current user: {auth?.user?.name ?? 'No auth is active'}</p>
                <Link href="/auth/login">Go to Login</Link>
            </div>
        </>
    );
};

export default Faqs;
