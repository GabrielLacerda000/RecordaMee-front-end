import type { UseFetchOptions } from "#app";

export function useBaseApi<T>(path: string, options: UseFetchOptions<T> = {}) {
    const config = useRuntimeConfig();
    const baseUrl = config.public.apiBaseUrl;

    let headers: any = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
};


    const token = useCookie('auth_token');

    if (token.value) {
        headers['Authorization'] = `Bearer ${token.value}`;
    }

    return useFetch(baseUrl + path, {
        watch: false,
        ...options,
        headers: {
            ...headers,
            ...options.headers
        }
    });
}

export async function useApi<T>(path: string, options: UseFetchOptions<T> = {}) {

    return useBaseApi(path, options)
}

export async function useGet<T>(path: string, options: UseFetchOptions<T> = {}) {
    return await useApi(path, { method: 'GET', ...options })
}

export async function usePost<T>(path: string, options: UseFetchOptions<T> = {}) {
    return await useApi(path, { method: 'POST', ...options })
}

export async function usePut<T>(path: string, options: UseFetchOptions<T> = {}) {
    return await useApi(path, { method: 'PUT', ...options })
}

export async function useDelete<T>(path: string, options: UseFetchOptions<T> = {}) {
    return await useApi(path, { method: 'DELETE', ...options })
}