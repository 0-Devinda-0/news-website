import { checkUserRole } from "@/actions/checkUserRole";
import { redirect } from "next/navigation";
import { auth0 } from "@/lib/auth0";

import '../globals.css';

export default async function AdminPage() {

    const isAdmin = await checkUserRole("Admin");
    console.log("isAdmin:", isAdmin);
    const session = await auth0.getSession();
    if (!isAdmin || !session) {
        // Redirect to home if the user is not an admin
        redirect("/");
    }
    return (
        <main>
            <h1>Welcome, {session.user.name}!</h1>
            <p>{session.user.sub}</p>
            
                <p>this is the admin page</p>
                <a href="/auth/logout">
                    <button>Log out</button>
                </a>
        
        </main>
    );
}