// middleware.ts
import { defineMiddleware } from 'astro:middleware';

export interface GraphQLResponse {
  data?: {
    posts?: {
      nodes?: Array<{ title?: string }>;
    };
    pages?: {
      nodes?: Array<{ title?: string }>;
    };
  };
  error?: string;
}

interface Locals {
  globalData: GraphQLResponse | { error: string };
}

let data: GraphQLResponse | undefined;

export const onRequest = defineMiddleware(async (context, next) => {
  //console lo url
  // console.log("URL:", context.url);
  try {
    const response = await fetch('https://wpadmin.athar.online/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `query GetPostAndPageNames {
          posts: posts {
            nodes {
              title
            }
          }
          pages: pages {
            nodes {
              title
            }
          }
        }`
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    data = (await response.json()) as GraphQLResponse;

    (context.locals as Locals).globalData = data; // Store data in Astro.locals
  } catch (error) {
    console.error('Error fetching data in middleware:', error);
    //@ts-expect-error
    (context.locals as Locals).globalData = undefined;
  }
  // console.log("Data stored in Astro.locals:", 
  //   JSON.stringify((context.locals as Locals).globalData, null, 2)
  // ); 
  // Log the data stored in Astro.locals
  if(context.url.pathname.includes("strategic-partnerships") && context.url.pathname.includes("en/")) {
    if(data && data.data?.pages?.nodes?.find((page) => page.title?.toLocaleLowerCase() === "strategic partnerships") === undefined) {
      return new Response(null, {
        status: 301,
        headers: {
          Location: "/en/404/"
        }
      });
    }
  }
  if(context.url.pathname.includes("achievements") && context.url.pathname.includes("en/")) {
    if(data && data.data?.pages?.nodes?.find((page) => page.title?.toLocaleLowerCase() === "achievements") === undefined) {
      return new Response(null, {
        status: 301,
        headers: {
          Location: "/en/404/"
        }
      });
    }
  }
  if(context.url.pathname.includes("strategic-partnerships") && !context.url.pathname.includes("en/")) {
    if(data && data.data?.pages?.nodes?.find((page) => page.title === "شراكات استراتيجية") === undefined) {
      return new Response(null, {
        status: 301,
        headers: {
          Location: "/ar/404/"
        }
      });
    }
  }
  if(context.url.pathname.includes("achievements") && !context.url.pathname.includes("en/")) {
    if(data && data.data?.pages?.nodes?.find((page) => page.title === "الإنجازات") === undefined) {
      return new Response(null, {
        status: 301,
        headers: {
          Location: "/ar/404/"
        }
      });
    }
  }
  return next();
});

