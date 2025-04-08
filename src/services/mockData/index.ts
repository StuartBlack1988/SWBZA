
// Re-export everything from the individual files
export * from './applications';
export * from './products';
export * from './users';
export * from './clients';
export * from './productPriceHistory';

// For backward compatibility
import { applications, Application } from './applications';
export type App = Application;
export const apps = applications;
