// import { checkUserRole } from "@/actions/checkUserRole";
// import { redirect } from "next/navigation";
// import { auth0 } from "@/lib/auth0";
"use client"
import { useUser, getAccessToken } from '@auth0/nextjs-auth0';

import '../globals.css';


export default function AdminPage() {
 const { user, error, isLoading } = useUser();

 const callProtectedApi = async () => {
     const accessToken = await getAccessToken();
    console.log("Access Token:", accessToken);
    if (!accessToken) {
      console.error('No access token available');
      return;
    }
    try {
      const response = await fetch('http://localhost:3001/api/news/', { // Adjust port if different
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Protected API response:', data);
        alert('Protected API call successful: ' + JSON.stringify(data));
      } else {
        console.error('Protected API error:', response.status, response.statusText);
        alert('Protected API call failed: ' + response.status);
      }
    } catch (err) {
      console.error('Network error:', err);
      alert('Network error during API call.');
    }
  };
 
    const namespace = "https://dev-2a5gffnn5ls8goim.us.auth0.com";
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
    if (user) {
       
        // console.log("Access Token:", accessToken);
        console.log("User:", user);
        const userRoles = user[`${namespace}/roles`]||[];
        console.log("User Roles:", userRoles);

        const hasAdminRole = userRoles.includes('Admin');
        const hasEditorRole = userRoles.includes('editor');
        return (
            <div>
                <h1>Welcome, {user.name}!</h1>
                <p>Your Roles: {userRoles}</p>

                {/* Conditionally render for Admins */}
                {hasAdminRole && (
                    <div style={{ border: '1px solid red', padding: '10px', marginTop: '10px' }}>
                        <h2>Admin Dashboard Access</h2>
                        <p>This content is only visible to users with the admin&apos; role.</p>
                    </div>
                )}

                {/* Conditionally render for Editors */}
                {hasEditorRole && (
                    <div style={{ border: '1px solid blue', padding: '10px', marginTop: '10px' }}>
                        <h2>Editor Tools</h2>
                        <p>This content is only visible to users with the editor role.</p>
                    </div>
                )}

                {/* Content visible to all logged-in users */}
                {/* <p>{JSON.stringify(user)}</p> */}
                <button onClick={callProtectedApi}>Call Protected API</button>
                <p>This content is visible to all authenticated users.</p>
            </div>
        );
    }
    // const isAdmin = await checkUserRole("Admin");

    // console.log("isAdmin:", isAdmin);
    // const session = await auth0.getSession();
    // if (!isAdmin || !session) {
    //     // Redirect to home if the user is not an admin
    //     redirect("/");
    // }
    // return (
    //     <main>
    //         <h1>Welcome, {session.user.name}!</h1>
    //         <p>{session.user.sub}</p>

    //         <p>this is the admin page</p>
    //         <a href="/auth/logout">
    //             <button>Log out</button>
    //         </a>

    //     </main>
    // );
}