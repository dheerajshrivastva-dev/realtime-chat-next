import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs))
}

export function getEnvVars<T extends { [key: string]: string }>(envVars: T): T {
  const result: { [key: string]: string } = {};
  for (const key in envVars) {
    const value = envVars[key];
    if (!process.env[value]) {
      throw new Error(`Export environment variable "${value}"`);
    }
    result[key] = process.env[value]!; // Assert the value is not undefined
  }
  return result as T; // Use type assertion to cast back to T
}

export function chatHrefConstructor (id1: string, id2: string) {
  const sortedId = [id1, id2].sort()
  return `${sortedId[0]}--${sortedId[1]}`
}

export function isMinuteNotChanged(previousTime: number, currentTime: number): boolean {
  const previousMinute = new Date(previousTime).getMinutes();
  const currentMinute = new Date(currentTime).getMinutes();

  return previousMinute === currentMinute;
}

export function isDayChanged(previousTime: number, currentTime: number): boolean {
  const previousDate = new Date(previousTime);
  const currentDate = new Date(currentTime);

  return previousDate.getDate() !== currentDate.getDate();
}

export function toPusherKey(key:string) {
  return key.replace(/:/g, '__')
}
