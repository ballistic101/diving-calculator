import './ErrorPage.css';
import { isRouteErrorResponse } from 'react-router-dom';
import { useRouteError } from 'react-router-dom';

function ErrorPage() {

    const error: unknown = useRouteError();
    let errorMessage: string;

    if (isRouteErrorResponse(error)) {
        // @ts-ignore
        errorMessage = error?.error?.message || error.statusText;
    }
    else if (error instanceof Error) {
        errorMessage = error.message;
    }
    else if (typeof error === 'string') {
        errorMessage = error;
    }
    else {
        errorMessage = 'Unknown error';
    }

    return (
        <div className="error-page">
            <h1>Oops</h1>
            <p>Sorry, an unexpected error has occured.</p>
            <p>
                <i>{errorMessage}</i>
            </p>
        </div>
    );
}

export default ErrorPage;