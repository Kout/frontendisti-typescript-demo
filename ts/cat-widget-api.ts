import { get } from "./cat-widget-request.js";

export interface CatApiItem {
    url: string;
    height: number;
    width: number;
}

export interface CatApiError {
    message: string;
}

export type CatApiData = CatApiItem[];

/**
 * @return {string | null} Will return image src
 */
export async function getRandomCatImage(): Promise<string | Error> {
    const response = await get<CatApiData | CatApiError>(
        "https://api.thecatapi.com/v1/images/search?size=full"
    );

    if (!response.data) {
        return new Error("No data");
    }

    if (response.data && "message" in response.data) {
        return new Error(response.data.message);
    }

    if (!response.data[0] || !response.data[0].url) {
        return new Error("No url in data");
    }

    return response.data[0].url;
}
