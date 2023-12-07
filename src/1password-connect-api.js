class OnePasswordCSApi {
    constructor(apiToken, baseUrl, vaultId) {
        this.apiToken = apiToken;
        this.baseURL = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
        this.vaultId = vaultId
    }

    makeRequest(endpoint, method = 'GET', data = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const request = new NetworkHTTPRequest();

        request.requestMethod = method;
        request.requestUrl = url;
        request.setRequestHeader('Authorization', `Bearer ${this.apiToken}`);
        request.setRequestHeader('Content-Type', 'application/json');

        if (method === 'POST') {
            request.requestBody = JSON.stringify(data);
        }

        request.send();

        if (request.responseStatusCode >= 200 && request.responseStatusCode <= 299) {
            return JSON.parse(request.responseBody);
        } else {
            throw new Error(`HTTP error! status: ${request.responseStatusCode}`);
        }

    }

    getVaultPathPart() {
        return `vaults/${this.vaultId}/`
    }

    getItemById(itemId) {
        return this.makeRequest(this.getVaultPathPart() + `items/${itemId}`)
    }

    getItemByTitle(title) {
        const filter = encodeURIComponent(`title eq "${title}"`)
        const endpoint = this.getVaultPathPart() + `items?filter=${filter}`
        const result = this.makeRequest(endpoint)
        if (result.length === 0) {
            throw new Error(`Item with title '${title}' not found`);
        }
        return this.getItemById(result[0].id)
    }

    getFieldValueForItemByTitle(itemTitle, fieldName = 'credential') {
        const item = this.getItemByTitle(itemTitle)
        const field = item.fields.find(f => f.id === fieldName)
        if (field === undefined) {
            throw new Error(`Field with name '${fieldName}' not found in item '${itemTitle}'`);
        } else {
            return field.value;
        }
    }

}

module.exports = OnePasswordCSApi;
