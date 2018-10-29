import { DateUtils } from 'src/app/utils/date.utils';

export const ControlPanelActions = {
    RESET_CURRENT_PROGRESS: 'ControlPanelActions.RESET_CURRENT_PROGRESS',
    INCREMENT_CURRENT_PROGRESS: 'ControlPanelActions.INCREMENT_CURRENT_PROGRESS',
    INCREMENT_AJAX: 'ControlPanelActions.INCREMENT_AJAX',

    UPDATE_ELAPSED_TIME: 'ControlPanelActions.UPDATE_ELAPSED_TIME',

    START_UPDATE: 'ControlPanelActions.START_UPDATE',
    STOP_UPDATE: 'ControlPanelActions.STOP_UPDATE',

    START_RUN: 'ControlPanelActions.START_RUN',
    STOP_RUN: 'ControlPanelActions.STOP_RUN'
};

export class ControlPanelState {
    updateInProgress: boolean;
    runInProgress: boolean;
    currentProgress: number;

    startedAt: Date;
    elapsedTime: string;

    ajax: number;
}

const defaultState: ControlPanelState = {
    updateInProgress: false,
    runInProgress: false,
    currentProgress: 0,

    startedAt: null,
    elapsedTime: calculateElapsedTime(new Date()),

    ajax: 0
};

function calculateElapsedTime(startDate: Date): string {
    const now = new Date(),
        from = startDate || new Date();
    return DateUtils.time(new Date(now.getTime() - from.getTime() + DateUtils.offset));
}

export function ControlPanelReducer(state = defaultState, action: any): ControlPanelState {
    switch (action.type) {
        case ControlPanelActions.START_UPDATE: {
            return {
                updateInProgress: true,
                runInProgress: false,
                currentProgress: 0,
                startedAt: new Date(),
                elapsedTime: calculateElapsedTime(new Date()),
                ajax: 0
            };
        }

        case ControlPanelActions.RESET_CURRENT_PROGRESS: {
            return {
                ...state,
                currentProgress: 0,
                startedAt: null,
                ajax: 0,
                elapsedTime: calculateElapsedTime(null)
            };
        }

        case ControlPanelActions.INCREMENT_CURRENT_PROGRESS: {
            return {
                ...state,
                currentProgress: state.currentProgress + 1,
                elapsedTime: calculateElapsedTime(state.startedAt)
            };
        }

        case ControlPanelActions.INCREMENT_AJAX: {
            return {
                ...state,
                ajax: state.ajax + 1
            };
        }

        case ControlPanelActions.UPDATE_ELAPSED_TIME: {
            return {
                ...state,
                elapsedTime: calculateElapsedTime(state.startedAt)
            };
        }

        case ControlPanelActions.STOP_UPDATE: {
            return {
                ...state,
                updateInProgress: false
            };
        }

        case ControlPanelActions.STOP_RUN: {
            return {
                ...state,
                runInProgress: false
            };
        }

        default:
            return state;
    }
}
