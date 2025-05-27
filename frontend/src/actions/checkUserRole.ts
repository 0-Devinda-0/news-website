"use server";
import { getUsersRoles } from "./getUserRoles";


// Check if the user has the specified role
export async function checkUserRole(roleName: string): Promise<boolean> {
    try {
        const roles = await getUsersRoles();
        return roles.some(role => role.name === roleName);
    } catch (error) {
        console.error("Error checking user role:", error);
        return false;
    }
}