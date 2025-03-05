import { Link, Head } from '@inertiajs/react';

const Products = ({ auth }) => {
    return (
        <>
            <Head title="Products" />
            <div>
                <h1>Products - React</h1>
                <p>Current user: {auth?.user?.name ?? 'No auth is active'}</p>
                <Link href="/auth/login">Go to Login</Link>
            </div>
        </>
    );
};

export default Products;
