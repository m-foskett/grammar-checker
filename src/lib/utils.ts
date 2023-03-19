import { ClassValue, clsx } from "clsx";
import {twMerge} from "tailwind-merge"

// Classname Function to merge styling
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}