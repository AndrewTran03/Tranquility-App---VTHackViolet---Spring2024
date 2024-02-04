import { APIErrorResponse } from "./types";

export class APIRequestError extends Error {
  private additonalInfo: APIErrorResponse;
  constructor(message: string, info: APIErrorResponse) {
    super(message);
    this.additonalInfo = info;
  }

  override toString() {
    return `Error: ${this.message}: Location -- "${this.additonalInfo.errorLoc}" \
            and Detailed Message -- "${this.additonalInfo.errorMsg}"`;
  }
}
