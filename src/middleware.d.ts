// src/middleware.d.ts
import type { GraphQLResponse } from './middleware'; // Import the GraphQLResponse interface from your middleware.ts

declare module 'astro' {
  interface Astro {
    locals: {
      globalData: GraphQLResponse | { error: string } | undefined;
    }
  }
}

declare global {
  interface Locals {
    globalData: GraphQLResponse | { error: string } | undefined;
  }
}