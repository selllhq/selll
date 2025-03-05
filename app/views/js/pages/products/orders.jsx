import { Link, Head } from '@inertiajs/react';

const Orders = ({ auth }) => {
    return (
        <>
            <Head title="Orders" />
            <div>
                <h1>Orders - React</h1>
                <p>Current user: {auth?.user?.name ?? 'No auth is active'}</p>
                <Link href="/auth/login">Go to Login</Link>
            </div>
        </>
    );
};

export default Orders;
