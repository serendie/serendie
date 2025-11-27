const FIGMA_API_BASE = "https://api.figma.com/v1";

export type VariableValue =
  | string
  | number
  | boolean
  | { type: "VARIABLE_ALIAS"; id: string }
  | { r: number; g: number; b: number; a?: number };

export interface VariableMode {
  modeId: string;
  name: string;
}

export interface VariableCollection {
  id: string;
  name: string;
  remote?: boolean;
  modes: VariableMode[];
  variableIds: Record<string, string>;
}

export interface LocalVariable {
  id: string;
  name: string;
  resolvedType: string;
  remote?: boolean;
  description?: string;
  variableCollectionId: string;
  valuesByMode: Record<string, VariableValue>;
}

export interface LocalVariablesResponse {
  meta: {
    variableCollections: Record<string, VariableCollection>;
    variables: Record<string, LocalVariable>;
  };
}

export type VariableMutation =
  | {
      action: "CREATE";
      id: string;
      name: string;
      variableCollectionId: string;
      resolvedType: "STRING";
      description?: string;
    }
  | {
      action: "UPDATE";
      id: string;
      description?: string;
    };

export interface VariableModeValueMutation {
  variableId: string;
  modeId: string;
  value: string;
}

export interface PostVariablesRequestBody {
  variableCollections?: unknown[];
  variableModes?: unknown[];
  variables?: VariableMutation[];
  variableModeValues?: VariableModeValueMutation[];
}

async function figmaRequest<T>(
  token: string,
  path: string,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(`${FIGMA_API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      "X-FIGMA-TOKEN": token,
      Accept: "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(
      `Figma API request failed (${res.status} ${res.statusText}): ${message}`
    );
  }

  return (await res.json()) as T;
}

export function resolveFigmaEnv() {
  const token =
    process.env.FIGMA_ACCESS_TOKEN ||
    process.env.PERSONAL_ACCESS_TOKEN ||
    process.env.FIGMA_PERSONAL_ACCESS_TOKEN;
  const fileKey = process.env.FIGMA_FILE_KEY || process.env.FILE_KEY;

  if (!token || !fileKey) {
    throw new Error(
      "FIGMA_ACCESS_TOKEN (or PERSONAL_ACCESS_TOKEN) and FIGMA_FILE_KEY (or FILE_KEY) are required."
    );
  }

  return { token, fileKey };
}

export async function getLocalVariables(
  token: string,
  fileKey: string
): Promise<LocalVariablesResponse> {
  return figmaRequest<LocalVariablesResponse>(
    token,
    `/files/${fileKey}/variables/local`
  );
}

export async function postVariables(
  token: string,
  fileKey: string,
  payload: PostVariablesRequestBody
) {
  const hasChanges =
    (payload.variableCollections && payload.variableCollections.length > 0) ||
    (payload.variableModes && payload.variableModes.length > 0) ||
    (payload.variables && payload.variables.length > 0) ||
    (payload.variableModeValues && payload.variableModeValues.length > 0);

  if (!hasChanges) {
    return;
  }

  return figmaRequest(token, `/files/${fileKey}/variables`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
