import { Horizon } from "@stellar/stellar-sdk";
import { STELLAR_HORIZON_URL } from "@/lib/utils/constants";

export const horizonServer = new Horizon.Server(STELLAR_HORIZON_URL, {
  allowHttp: STELLAR_HORIZON_URL.startsWith("http://"),
});
