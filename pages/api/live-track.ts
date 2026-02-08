import type { NextApiRequest, NextApiResponse } from "next";
import { getLiveTrackUrl } from "../../lib/liveTrack";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const url = await getLiveTrackUrl();
    res.status(200).json({ url });
}

