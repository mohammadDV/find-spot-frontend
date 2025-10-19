import { Suspense } from "react";
import CheckGoogleAuth from "../_components/CheckGoogleAuth";

export default async function GoogleCallbackPage() {
    return (
        <Suspense fallback={<></>}>
            <CheckGoogleAuth />
        </Suspense>
    )
}