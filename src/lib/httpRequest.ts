interface HttpRequestParams {
  url: string;
  options?:
    | {
        body?: string;
        method: string;
        mode?: RequestMode;
        credentials?: RequestCredentials;
        headers?: any;
        redirect?: RequestRedirect;
        referrer?: string;
        referrerPolicy?: ReferrerPolicy;
      }
    | undefined;
}

export async function httpRequest<T>({ url, options }: HttpRequestParams) {
  let res = await fetch(url, options);

  if (!res.ok) {
    throw new Error(`There was an error with your HTTP request.`);
  }
  return await res.json();
}
