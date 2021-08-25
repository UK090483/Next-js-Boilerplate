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

  const IP =
    (req.headers['x-real-ip'] as string) || req.socket.localAddress || 'hmmmmm';

  const sfDocRef = await db.collection('test').doc(uuid);
  const date = Date.now();

  try {
    await db.runTransaction(async (t) => {
      const doc = await t.get(sfDocRef);

      if (!doc.exists) {
        await t.set(sfDocRef, { lastX: date, IP });

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
                path: req.headers.referer,
                time: date,
                IP,
                userAgent: req.headers['user-agent'],
              },
            ]
          : [];
      t.update(sfDocRef, { actions: newActions });

      return true;
    });

    return res.json({
      headers: req.headers,
    });
  } catch (error) {
    return res.json({
      headers: req.headers,
    });
  }
}
