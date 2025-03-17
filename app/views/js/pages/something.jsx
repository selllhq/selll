import { Link, Head } from '@inertiajs/react';

const Something = ({ auth }) => {
    return (
        <>
            <Head title="Something" />
            <div>
                <h1>Something - React</h1>
                <p>Current user: {auth?.user?.name ?? 'No auth is active'}</p>
                <Link href="/auth/login">Go to Login</Link>
            </div>
        </>
    );
};

export default Something;
