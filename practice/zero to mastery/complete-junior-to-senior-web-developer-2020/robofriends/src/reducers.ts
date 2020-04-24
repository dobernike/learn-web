import {
  CHANGE_SEARCH_FIELD,
  REQUEST_ROBOTS_FAILED,
  REQUEST_ROBOTS_PENDING,
  REQUEST_ROBOTS_SUCCESS,
} from './constants';

interface ActionSearchRobots {
  type: string;
  payload?: string;
}

const initialState = {
  searchField: '',
};

export const searchRobots = (
  state = initialState,
  action: ActionSearchRobots
) => {
  switch (action.type) {
    case CHANGE_SEARCH_FIELD:
      return { ...state, searchField: action.payload };
    default:
      return state;
  }
};

export interface IRobot {
  id: string;
  name: string;
  email: string;
}

interface ActionRequestRobots {
  type: string;
  payload?: Array<IRobot> | string;
}

interface InitialRobots {
  isPending: boolean;
  error: string;
  robots: Array<IRobot>;
}

const initialRobots: InitialRobots = {
  isPending: false,
  robots: [],
  error: '',
};

export const requestRobots = (
  state = initialRobots,
  action: ActionRequestRobots
) => {
  switch (action.type) {
    case REQUEST_ROBOTS_PENDING:
      return { ...state, isPending: true };
    case REQUEST_ROBOTS_SUCCESS:
      return { ...state, robots: action.payload, isPending: false };
    case REQUEST_ROBOTS_FAILED:
      return { ...state, error: action.payload, isPending: false };
    default:
      return state;
  }
};
