import { PayloadAction as Action } from '../state/PayloadAction';

export namespace RootActions {
    export const INIT = '[RootActions] Initialize';
  

    export function createInitAppAction(): Action<any> {
        return {
            type: INIT
        };
    }
}
