import { Link, Head } from '@inertiajs/react';

const Privacy = ({ auth }) => {
    return (
        <>
            <Head title="Privacy" />
            <div>
                <h1>Privacy - React</h1>
                <p>Current user: {auth?.user?.name ?? 'No auth is active'}</p>
                <Link href="/auth/login">Go to Login</Link>
            </div>
        </>
    );
};

export default Privacy;
