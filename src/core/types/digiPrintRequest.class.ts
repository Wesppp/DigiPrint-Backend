import { IJwtPayload } from "../../modules/auth/core/interfaces";

export class DigiPrintRequest extends Request {
  user: IJwtPayload;
}
