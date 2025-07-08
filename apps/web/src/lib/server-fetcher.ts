"use server";
import { IApiResponse } from "@quibly/utils/types";
import { auth } from "./auth";
import { fetcher, FetcherOptions } from "./fetcher";

export async function serverFetcher<TResponse, TBody = unknown>(
  endpoint: string,
  options: FetcherOptions<TBody> = {}
): Promise<IApiResponse<TResponse>> {
  const session = await auth();
  return await fetcher(endpoint, { ...options, session });
}
