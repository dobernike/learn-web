import { RESULT_LIST_UPDATE } from '../constants/actionTypes';

export type Apartment = {
    id?: string;
    city?: string;
    lister_url?: string;
    price: string;
    title: string;
    img: string;
    bedroom: number;
    bathroom?: number;
    summary?: string;
};

export type ApartmentState = {
    apartmentsList: Apartment[];
};

const initialState: ApartmentState = {
    apartmentsList: [],
};

function apartmentsListReducer(state = initialState, { type, payload }: any) {
    switch (type) {
        case RESULT_LIST_UPDATE:
            return { ...state, apartmentsList: [...state.apartmentsList, ...payload] };
        default:
            return state;
    }
}

export default apartmentsListReducer;
