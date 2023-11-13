import { UserDocument } from "db/users";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test' | 'staging';
      PORT?: number;
      SESSION_DURATION: number;
      DBHOST: string;
      DOMAIN: string;
    }
  }
}

declare module 'express-session' {
  export interface Session {
    user: UserDocument | null
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export { }