import { ChangeNodeAction, ChangeNodeIntentAction, NodeAction, TypeKeys } from 'actions/config';

interface NodeLoaded {
  pending: false;
  nodeId: string;
}

interface NodeChangePending {
  pending: true;
  nodeId: string;
}

export type State = NodeLoaded | NodeChangePending;

export const INITIAL_STATE: NodeLoaded = {
  nodeId: 'eth_mew',
  pending: false
};

const changeNode = (_: State, { payload }: ChangeNodeAction): State => ({
  nodeId: payload.nodeId,
  pending: false
});

const changeNodeIntent = (state: State, _: ChangeNodeIntentAction): State => ({
  ...state,
  pending: true
});

export const selectedNode = (state: State = INITIAL_STATE, action: NodeAction) => {
  switch (action.type) {
    case TypeKeys.CONFIG_NODE_CHANGE:
      return changeNode(state, action);
    case TypeKeys.CONFIG_NODE_CHANGE_INTENT:
      return changeNodeIntent(state, action);
    default:
      return state;
  }
};