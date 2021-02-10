export interface CustomResponse<T> {
    ok: boolean;
    status: number;
    data: T | null;
}

export async function get<T>(url: string): Promise<CustomResponse<T>> {
    const response = await fetch(url);
    const data: T = await response.json();

    return {
        ok: response.ok,
        status: response.status,
        data,
    };
}
