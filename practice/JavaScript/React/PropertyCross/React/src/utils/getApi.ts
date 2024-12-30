function getApi(uri: string, params: object) {
    return `${uri}?${Object.entries(params)
        .map((entrie) => `${entrie.join('=')}&`)
        .join('')}`;
}

export default getApi;
