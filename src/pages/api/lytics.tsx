/* eslint-disable no-underscore-dangle */
import admin from 'firebase-admin';
import { NextApiRequest, NextApiResponse } from 'next';

if (admin.apps.length < 1) {
  admin.initializeApp({
    // @ts-ignore
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_CRED)),
  });
}

const db = admin.firestore();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const uuid = req.cookies._lytics_id || 'noooId';

  const action = {
    referer: req.headers.referer,
    host: req.headers.host,
    time: Date.now(),
    IP:
      (req.headers['x-real-ip'] as string) ||
      req.socket.localAddress ||
      'hmmmmm',
    userAgent: req.headers['user-agent'],
    ...req.query,
  };

  const sfDocRef = await db.collection('test').doc(uuid);

  try {
    return await db.runTransaction(async (t) => {
      const doc = await t.get(sfDocRef);

      if (!doc.exists) {
        await t.set(sfDocRef, { actions: [action] });

        return res.json({
          headers: req.headers,
        });
      }

      const data = doc.data();
      const newActions =
        data && data.actions
          ? [
              ...data.actions,
              {
                ...action,
              },
            ]
          : [];
      t.update(sfDocRef, { actions: newActions });

      return res.json({
        headers: req.headers,
      });
    });
  } catch (error) {
    return res.json({
      headers: req.headers,
    });
  }
}
