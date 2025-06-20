// src/pages/api/geocode.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { lat, lng } = req.query;
  if (!lat || !lng) {
    return res.status(400).json({ error: 'Faltan lat/lng' });
  }
  const key = process.env.GOOGLE_API_KEY;
  if (!key) {
    return res.status(500).json({ error: 'No hay GOOGLE_API_KEY' });
  }

  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}&language=es`;
  const r = await fetch(url);
  const data = await r.json();
  const address = data.results?.[0]?.formatted_address;
  return res.status(200).json({ address });
}
