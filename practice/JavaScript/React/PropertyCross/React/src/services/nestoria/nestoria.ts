export const API_URL = 'http://api.nestoria.co.uk/api';

function checkJsonResponse(response: any) {
    const responseCode = Number(response.application_response_code);

    if (responseCode === 200 || responseCode === 202) {
        throw new Error(response.application_response_text);
    }

    if (response.page > response.total_pages) {
        throw new Error('Undefined url: searching page is over total pages');
    }

    return true;
}

export async function getApartmentsData(response: { json: any }) {
    const json = await response.json();

    checkJsonResponse(json.response);

    return json.response;
}
