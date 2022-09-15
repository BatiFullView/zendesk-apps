import { CustomerIdentity } from "@fullview/types";

export class IdBuilder {
  static from(customerId: string): CustomerIdentity {
    const [deviceId, identityId, externalId] = customerId
      .split("_")
      .map((x) => x.trim())
      .filter(Boolean);

    return {
      deviceId,
      identityId,
      externalId,
    };
  }

  static to(customerIdentity: CustomerIdentity): string {
    const id = [
      customerIdentity.deviceId,
      customerIdentity.identityId,
      customerIdentity.externalId,
    ]
      .filter(Boolean)
      .join("_");

    return id;
  }
}
