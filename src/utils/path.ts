export const BASE_PATH = '/weather-todo';

export const getFullPath = (path: string) => `${BASE_PATH}${path}`;

export const getRelativePath = (fullPath: string) => {
    return fullPath.replace(BASE_PATH, '') || '/';
};
