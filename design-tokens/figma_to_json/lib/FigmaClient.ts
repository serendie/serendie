import { LocalVariable, LocalVariableCollection } from "@figma/rest-api-spec";
import axios, { AxiosInstance } from "axios";

export type LocalVariableRecord = Record<string, LocalVariable>;
export type LocalVariableCollectionRecord = Record<
  string,
  LocalVariableCollection
>;

export type FigmaClientResponse = {
  variables: LocalVariableRecord;
  variableCollections: LocalVariableCollectionRecord;
};

export class FigmaClient {
  private client: AxiosInstance;
  private fileKey: string;

  constructor(token: string, fileKey: string) {
    this.fileKey = fileKey;
    this.client = axios.create({
      baseURL: "https://api.figma.com/v1",
      headers: {
        "X-FIGMA-TOKEN": token,
      },
    });
  }

  async getLocalVariables() {
    const response = await this.client.get(
      `/files/${this.fileKey}/variables/local`
    );
    if (response.status !== 200) {
      throw new Error("Failed to fetch local variables");
    }
    const {
      data: { meta },
    } = response;
    return {
      variables: meta.variables,
      variableCollections: meta.variableCollections,
    } as FigmaClientResponse;
  }
}
