import { Link, Head } from '@inertiajs/react';

const Terms = ({ auth }) => {
    return (
        <>
            <Head title="Terms" />
            <div>
                <h1>Terms - React</h1>
                <p>Current user: {auth?.user?.name ?? 'No auth is active'}</p>
                <Link href="/auth/login">Go to Login</Link>
            </div>
        </>
    );
};

export default Terms;
