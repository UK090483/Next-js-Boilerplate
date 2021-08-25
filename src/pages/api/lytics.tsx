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
  const sfDocRef = await db.collection('test').doc(req.socket.localAddress);
  const date = Date.now();

  try {
    await db.runTransaction(async (t) => {
      const doc = await t.get(sfDocRef);

      if (!doc.exists) {
        await sfDocRef.set({ lastX: date });
      }

      const data = doc.data();
      const newActions =
        data && data.actions
          ? [...data.actions, { path: req.headers.referer, time: date }]
          : [];
      t.update(sfDocRef, { actions: newActions });
    });

    return res.json({
      bam: 'bam',
      headers: req.headers,
      'req.socket.remoteAddress': req.socket.remoteAddress,
      'req.socket.localAddress': req.socket.localAddress,
    });
  } catch (error) {
    return res.json({
      bam: 'bam',
      headers: req.headers,
      'req.socket.remoteAddress': req.socket.remoteAddress,
      'req.socket.localAddress': req.socket.localAddress,
    });
  }

  // if (item.exists) {
  //   await db
  //     .collection('test')
  //     .doc(req.socket.localAddress)
  //     .set({ lastX: date });
  //   return res.json({
  //     bam: 'bam',
  //     headers: req.headers,
  //     'req.socket.remoteAddress': req.socket.remoteAddress,
  //     'req.socket.localAddress': req.socket.localAddress,
  //   });
  // }

  // await db.collection('test').doc(req.socket.localAddress).set({ lastX: date });
}
